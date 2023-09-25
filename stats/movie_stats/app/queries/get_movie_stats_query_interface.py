from abc import ABC, abstractmethod

from movie_stats.domain.movie_stats import MovieStats


class GetMovieStatsQueryInterface(ABC):

    @abstractmethod
    def by_id(self, movie_id) -> MovieStats:
        pass
