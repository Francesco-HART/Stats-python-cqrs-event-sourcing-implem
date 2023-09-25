from abc import ABC, abstractmethod
from movie_stats.domain.events.domain_event import DomainEvent


class AggregateRoot(ABC):

    def reconstitute_from(self, aggregate_history: list[DomainEvent]):
        for event in aggregate_history:
            self.apply(event)
            # instance.aggregate_version += 1  # Increment the aggregate version
        return self

    def __init__(self, aggregate_id=None):
        self._aggregate_id = aggregate_id
        self.recorded_events: list[DomainEvent] = []

    def recordThat(self, event: DomainEvent):
        self.recorded_events.append(event)
        self.apply(event)

    def aggregate_id(self):
        return self._aggregate_id

    def apply(self, event: DomainEvent):
        method_name = 'on_' + event.eventType()
        # Check if the corresponding method exists
        if hasattr(self, method_name):
            event_handler = getattr(self, method_name)
            event_handler(event)

    def __eq__(self, other):
        if isinstance(other, AggregateRoot):
            # Compare the relevant attributes for equality
            return self.aggregate_id == other.aggregate_id and self.recorded_events == other.recorded_events
        return False
