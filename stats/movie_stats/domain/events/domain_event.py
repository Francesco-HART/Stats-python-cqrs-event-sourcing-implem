from abc import ABC, abstractmethod


class DomainEvent(ABC):

    def __init__(self, movie_id: int):
        self._aggregate_id = movie_id

    @abstractmethod
    def aggregate_id(self):
        return

    @abstractmethod
    def eventType(self) -> str:
        pass

    def __hash__(self):
        return hash((self._aggregate_id, self.eventType))

    def __eq__(self, other):
        if isinstance(other, DomainEvent):
            return self._aggregate_id == other._aggregate_id
        return False
