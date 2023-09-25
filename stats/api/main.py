from threading import Thread

import uvicorn
from fastapi import FastAPI, APIRouter, HTTPException, Path
from starlette.middleware.cors import CORSMiddleware

from api.stats_dto import (
    OnBookmarkRequest,
    OnUnBookmarkRequest,
    OnPlayRequest,
    OnPauseRequest,
    OnStopRequest,
)
from movie_stats import app

from movie_stats.app.commands.on_book_mark_movie_command import OnBookMarkMovieCommand
from movie_stats.app.commands.on_pause_movie_command import OnPauseMovieCommand
from movie_stats.app.commands.on_play_movie_command import OnPlayMovieCommand
from movie_stats.app.commands.on_stop_movie_command import OnStopMovieCommand
from movie_stats.app.commands.on_un_book_mark_movie_command import (
    OnUnBookMarkMovieCommand,
)
from movie_stats.domain.aggragate_repository import AggregateRepository
from movie_stats.domain.events.event_store import EventStore
from movie_stats.domain.stats_event_repository import StatsEventRepository
from movie_stats.infra.events.log_event_bus_dispacher import LogEventBusDispacher
from movie_stats.infra.events.message_dispatcher import EventBusDispatcher
from movie_stats.infra.events.redis_event_bus_dispacher import (
    RedisEventBusDispacher,
    subscribe_redis_in_new_thread,
    subscribe_redis,
)
from movie_stats.infra.queries.cached_movie_stats_query import CachedGetMovieStatsQuery
from movie_stats.infra.queries.get_movie_stats_query import GetMovieStatsQuery
from movie_stats.infra.repositories.domain_stats_event_repository import (
    DomainStatsEventRepository,
)
from movie_stats.infra.repositories.in_memory_event_store import InMemoryEventStore


def create_router(
        event_store: EventStore, get_movie_stats: GetMovieStatsQuery
) -> APIRouter:
    event_store = event_store
    return Router(
        DomainStatsEventRepository(AggregateRepository(event_store)), get_movie_stats
    )


class Router(APIRouter):
    def __init__(
            self,
            stats_event_repo: StatsEventRepository,
            get_movie_stats: GetMovieStatsQuery,
    ):
        self.router = APIRouter()

        self.get_movie_stats = get_movie_stats

        self.on_book_mark_movie_command = OnBookMarkMovieCommand(stats_event_repo)
        self.on_un_book_mark_movie_command = OnUnBookMarkMovieCommand(stats_event_repo)
        self.on_play_movie_command = OnPlayMovieCommand(stats_event_repo)
        self.on_pause_movie_command = OnPauseMovieCommand(stats_event_repo)
        self.on_stop_movie_command = OnStopMovieCommand(stats_event_repo)

        self.router.add_api_route("/ping", self.ping, methods=["GET"])
        self.router.add_api_route("/onbookmark", self.onbookmark, methods=["POST"])
        self.router.add_api_route("/onunbookmark", self.onunbookmark, methods=["POST"])
        self.router.add_api_route("/onplay", self.onplay, methods=["POST"])
        self.router.add_api_route("/onpause", self.onpause, methods=["POST"])
        self.router.add_api_route("/onstop", self.onstop, methods=["POST"])
        self.router.add_api_route("/stats", self.moviestats, methods=["POST"])

    async def moviestats(self, request_data: OnBookmarkRequest):
        # Return the object as JSONResponse
        try:
            movie_stats_domain = await self.get_movie_stats.by_id(request_data.movie_id)
            movie_stats_serialize = {
                "movie_id": movie_stats_domain.movie_id,
                "total_book_mark": movie_stats_domain.total_book_mark,
                "number_of_watch": movie_stats_domain.number_of_watch,
                "number_of_pause": movie_stats_domain.number_of_pause,
                "number_of_stop": movie_stats_domain.number_of_stop,
            }
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail="Dose not exist stats not added"
            )
        raise HTTPException(status_code=200, detail=movie_stats_serialize)

    def onbookmark(self, request_data: OnBookmarkRequest):
        print(request_data.movie_id)
        try:
            self.on_book_mark_movie_command.handle(request_data.movie_id)
        except Exception as e:
            raise HTTPException(status_code=500, detail="Bookmark stats not added")
        raise HTTPException(status_code=201, detail="Stats added successfully")

    def onunbookmark(self, request_data: OnUnBookmarkRequest):
        print(request_data.movie_id)

        try:
            self.on_un_book_mark_movie_command.handle(request_data.movie_id)
        except Exception as e:
            raise HTTPException(status_code=500, detail="UnBookmark stats not added")
        raise HTTPException(
            status_code=201, detail="UnBookmark stats added successfully"
        )

    def onplay(self, request_data: OnPlayRequest):
        try:
            self.on_play_movie_command.handle(request_data.movie_id)
        except Exception as e:
            raise HTTPException(status_code=500, detail="Play stats not added")
        raise HTTPException(status_code=201, detail="Play stats added successfully")

    def onpause(self, request_data: OnPauseRequest):
        try:
            self.on_pause_movie_command.handle(request_data.movie_id)
        except Exception as e:
            raise HTTPException(status_code=500, detail="Play stats not added")
        raise HTTPException(status_code=201, detail="Play stats added successfully")

    def onstop(self, request_data: OnStopRequest):
        try:
            self.on_stop_movie_command.handle(request_data.movie_id)
        except Exception as e:
            raise HTTPException(status_code=500, detail="Stop stats not added")
        raise HTTPException(status_code=201, detail="Stop stats added successfully")

    def ping(self):
        return "pong"


def back_ground_thread(app, thread):
    app.state.background_thread = thread
    return {"message": "Background task started."}


def main():
    app = FastAPI()
    event_store = InMemoryEventStore()
    event_dispacher = LogEventBusDispacher(event_store)
    try:
        event_dispacher = RedisEventBusDispacher(event_store)
    except:
        print("Redis Connection faild")

    get_movie_stats = CachedGetMovieStatsQuery(GetMovieStatsQuery(event_store))

    router = create_router(
        event_dispacher, get_movie_stats
    ).router

    # router = create_router(InMemoryEventStore()).router
    app.include_router(router)
    origins = [
        "http://localhost:5173",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    uvicorn.run(app, host="0.0.0.0", port=6969)

    @app.on_event("startup")
    async def startup_event():
        t = Thread(
            back_ground_thread(
                app,
                subscribe_redis_in_new_thread(
                    get_movie_stats.remove_by_id, event_dispacher
                ),
            )
        )
        t.start()


if __name__ == "__main__":
    main()
    try:
        pass
    except:
        pass
