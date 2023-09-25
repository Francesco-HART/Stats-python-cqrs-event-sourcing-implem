from movie_stats.app.queries.get_movie_stats_query_interface import (
    GetMovieStatsQueryInterface,
)
from movie_stats.domain.movie_stats import MovieStats
from movie_stats.domain.movie_stats_builder import MovieStatsBuilder


# Proxy Pattern
class CachedGetMovieStatsQuery(GetMovieStatsQueryInterface):
    def __init__(self, service: GetMovieStatsQueryInterface):
        self.service = service
        self.cached_movies: list[MovieStats] = []

    async def by_id(self, movie_id) -> MovieStats:
        # get cached status for this request
        movie_stat = self.find_stats_in_cach(movie_id)
        if movie_stat == None:
            stats = await self.service.by_id(movie_id)
            if stats == None:
                return MovieStatsBuilder().build()
            return stats
        return movie_stat

    def find_stats_in_cach(self, movie_id) -> MovieStats:
        for movieStat in enumerate(self.cached_movies):
            if movieStat.movie_id == movie_id:
                return movieStat

    def remove_by_id(self, movie_id: int):
        index = -1
        for i, item in enumerate(self.cached_movies):
            if item.movie_id == movie_id:
                index = i
                break
        if index == None:
            return
        if len(self.cached_movies) > 0:
            self.cached_movies.pop(index)
