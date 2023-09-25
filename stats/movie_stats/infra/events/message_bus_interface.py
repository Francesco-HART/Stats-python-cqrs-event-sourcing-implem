from abc import ABC, abstractmethod

from movie_stats.domain.events.domain_event import DomainEvent


class MessageBusInterface(ABC):

    @abstractmethod
    def dispatch(self, domain_event: DomainEvent):
        pass

    @abstractmethod
    def subscribe(self, other):
        pass
