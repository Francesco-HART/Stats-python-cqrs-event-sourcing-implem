from movie_stats.domain.events.event_store import EventStore
from movie_stats.domain.events.domain_event import DomainEvent
from typing import Dict, List


class InMemoryEventStore(EventStore):
    def __init__(self):
        super().__init__()
        self.events: Dict[int, List[DomainEvent]] = {}
        self.last_event = None

    def commit(self, aggregate_id: int, event: DomainEvent):
        self.last_event = event
        if self.is_aggragate_id_exist_on_store(aggregate_id):
            self.events[aggregate_id].append(event)
            return
        self.events[aggregate_id] = [event]

    def is_aggragate_id_exist_on_store(self, aggregate_id: int) -> bool:
        return aggregate_id in self.events

    def aggregateHistoryFor(self, aggregate_id: int) -> list[DomainEvent]:
        if self.is_aggragate_id_exist_on_store(aggregate_id):
            return self.events[aggregate_id]
        return []
