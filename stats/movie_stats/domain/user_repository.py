from abc import ABC, abstractmethod

from movie_stats.domain.events.domain_event import DomainEvent


class UserRepository(ABC):

    def __int__(self):
        pass

    @abstractmethod
    def get_one_by_id(self, user_id: str):
        pass
