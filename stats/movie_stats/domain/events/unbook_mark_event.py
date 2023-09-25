from movie_stats.domain.events.domain_event import DomainEvent


class UnBookMarkEvent(DomainEvent):

    def __init__(self, movie_id: int):
        super().__init__(movie_id)
        self.event_type = "un_book_mark_event"
        self.aggregate_id = movie_id


    def eventType(self) -> str:
        return self.event_type

    def aggregate_id(self):
        return self.aggregate_id

    def __eq__(self, other):
        super().__eq__(other)
        if isinstance(other, UnBookMarkEvent):
            return self.event_type == other.event_type
        return False
