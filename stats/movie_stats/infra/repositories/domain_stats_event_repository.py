from movie_stats.domain.aggragate_repository import AggregateRepository
from movie_stats.domain.movie_stats import MovieStats
from movie_stats.domain.movie_stats_builder import MovieStatsBuilder
from movie_stats.domain.stats_event_repository import StatsEventRepository


class DomainStatsEventRepository(StatsEventRepository):
    def __init__(self, aggregateRepository: AggregateRepository):
        self.aggregateRepository = aggregateRepository

    def save(self, stats: MovieStats):
        self.aggregateRepository.save(stats)

    def get(self, id: int) -> MovieStats:
        movie = MovieStatsBuilder().build()
        return self.aggregateRepository.get(id, movie)
