from movie_stats.domain.movie_stats import MovieStats
from movie_stats.domain.movie_stats_builder import MovieStatsBuilder
from movie_stats.domain.stats_event_repository import StatsEventRepository


class OnPauseMovieCommand:
    def __init__(self, stats_event_repo: StatsEventRepository):
        self.stats_event_repo = stats_event_repo

    def handle(self, movie_id: int):
        movie_stats: MovieStats = self.stats_event_repo.get(movie_id)
        if movie_stats == None:
            movie_stats = MovieStatsBuilder(movie_id).build()
        movie_stats.pause_movie()
        self.stats_event_repo.save(movie_stats)
