from movie_stats.domain.events.event_store import EventStore
from movie_stats.domain.events.domain_event import DomainEvent
from movie_stats.infra.events.event_store_decorator import EventStoreDecorator
from movie_stats.infra.events.message_bus_interface import MessageBusInterface


class EventBusDispatcher(EventStoreDecorator):
    def __init__(self, event_store: EventStore, event_bus: MessageBusInterface):
        super().__init__(event_store)
        self.event_bus = event_bus

    def commit(self, aggregate_id: int, event: DomainEvent):
        self.event_store.commit(aggregate_id=aggregate_id, event=event)
        stored_events: list[DomainEvent] = self.event_store.aggregateHistoryFor(
            aggregate_id=aggregate_id
        )
        for stored_event in stored_events:
            self.event_bus.dispatch(stored_event)
