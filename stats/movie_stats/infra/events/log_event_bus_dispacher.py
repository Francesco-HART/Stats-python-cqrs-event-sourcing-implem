from movie_stats.domain.events.domain_event import DomainEvent
from movie_stats.domain.events.event_store import EventStore
from movie_stats.infra.events.event_store_decorator import EventStoreDecorator
from movie_stats.infra.events.message_bus_interface import MessageBusInterface


class LogEventBusDispacher(EventStoreDecorator):

    def __init__(self, event_store: EventStore):
        super().__init__(event_store=event_store)

    def subscribe(self, other):
        print("Have subscribe")
        pass

    def dispatch(self, event: DomainEvent):
        print("Event dispach")
        print(event.eventType())
