from movie_stats.domain.events.event_store import EventStore
from movie_stats.domain.events.domain_event import DomainEvent


# Class who can be used alone, but I need it to implement an event bus pattern for caching
class EventStoreDecorator(EventStore):
    def __init__(self, event_store: EventStore):
        self.event_store = event_store

    # sauvegarde
    def commit(self, aggregate_id: int, event: DomainEvent):
        self.event_store.commit(aggregate_id=aggregate_id, event=event)

    # Va recup les events d'un aggregate par son id
    def aggregateHistoryFor(self, aggregate_id: int) -> list[DomainEvent]:
        return self.event_store.aggregateHistoryFor(aggregate_id=aggregate_id)
