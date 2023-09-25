import asyncio

from fastapi import FastAPI
from starlette.testclient import TestClient

from api.main import create_router
from movie_stats.domain.events.book_mark_event import BookMarkEvent
from movie_stats.domain.events.pause_movie_event import OnPauseMovieEvent
from movie_stats.domain.events.play_movie_event import OnPlayMovieEvent
from movie_stats.domain.events.stop_movie_event import OnStopMovieEvent
from movie_stats.domain.events.unbook_mark_event import UnBookMarkEvent
from movie_stats.infra.events.log_event_bus_dispacher import LogEventBusDispacher
from movie_stats.infra.events.message_dispatcher import EventBusDispatcher
from movie_stats.infra.queries.cached_movie_stats_query import CachedGetMovieStatsQuery
from movie_stats.infra.queries.get_movie_stats_query import GetMovieStatsQuery
from movie_stats.infra.repositories.in_memory_event_store import InMemoryEventStore


def setup():
    app = FastAPI()
    event_store = InMemoryEventStore()

    router = create_router(event_store, GetMovieStatsQuery(event_store))
    app.include_router(router.router)
    client = TestClient(app)
    return client, event_store


def test_ping():
    client, eventStore = setup()
    response = client.get("/ping")
    assert response.status_code == 200
    assert response.json() == "pong"


def test_onbookmark():
    client, event_store = setup()
    response = client.post("/onbookmark", json={"movie_id": 1})
    assert response.status_code == 201
    assert event_store.last_event == BookMarkEvent(1)


def test_onunbookmark():
    client, event_store = setup()
    response = client.post("/onunbookmark", json={"movie_id": 2})
    assert response.status_code == 201
    assert event_store.last_event == UnBookMarkEvent(2)


def test_onplay():
    client, event_store = setup()
    response = client.post("/onplay", json={"movie_id": 3})
    assert response.status_code == 201
    assert event_store.last_event == OnPlayMovieEvent(3)


def test_onpause():
    client, event_store = setup()
    response = client.post("/onpause", json={"movie_id": 4})
    assert response.status_code == 201
    assert event_store.last_event == OnPauseMovieEvent(4)


def test_onstop():
    client, event_store = setup()
    response = client.post("/onstop", json={"movie_id": 5})
    assert response.status_code == 201
    assert event_store.last_event == OnStopMovieEvent(5)
