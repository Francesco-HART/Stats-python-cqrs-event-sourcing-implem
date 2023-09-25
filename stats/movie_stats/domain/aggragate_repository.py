from movie_stats.domain.aggragate_root import AggregateRoot
from movie_stats.domain.events.event_store import EventStore


class AggregateRepository:
    def __init__(self, event_store: EventStore):
        self._event_store = event_store

    def save(self, aggregateRoot: AggregateRoot):
        event = aggregateRoot.recorded_events[-1]
        self._event_store.commit(
            aggregateRoot.aggregate_id(), event
        )

    # va recupérer tous le events pour un aggregate_id defini (un film) et appliquer dans
    # l'ordre les différents évènements qui sont arrivé pour reconstruire l'aggregate
    def get(self, aggregate_id: int, aggragate_root: AggregateRoot) -> AggregateRoot:
        aggregate_history = self._event_store.aggregateHistoryFor(
            aggregate_id=aggregate_id
        )
        if self.history_is_empty(aggregate_history):
            return None
        return aggragate_root.reconstitute_from(aggregate_history)

    def history_is_empty(self, aggregate_history) -> bool:
        return aggregate_history == None or len(aggregate_history) == 0
