from abc import ABC, abstractmethod

from movie_stats.domain.events.domain_event import DomainEvent
from movie_stats.domain.movie_stats import MovieStats


class StatsEventRepository(ABC):

    def __int__(self):
        pass

    @abstractmethod
    def save(self, event: DomainEvent):
        pass

    def get(self, movie_id) -> MovieStats:
        pass
