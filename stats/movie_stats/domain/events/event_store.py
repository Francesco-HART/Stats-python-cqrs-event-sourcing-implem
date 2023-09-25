from abc import abstractmethod, ABC

from movie_stats.domain.events.domain_event import DomainEvent


class EventStore(ABC):
    # sauvegarde
    @abstractmethod
    def commit(self, aggregate_id: int, event: DomainEvent):
        pass

    # Va recup les events d'un aggregate par son id
    @abstractmethod
    def aggregateHistoryFor(self, aggregate_id: int) -> list[DomainEvent]:
        pass
