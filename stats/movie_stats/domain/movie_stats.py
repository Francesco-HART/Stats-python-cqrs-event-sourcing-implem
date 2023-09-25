from movie_stats.domain.aggragate_root import AggregateRoot
from movie_stats.domain.events.book_mark_event import BookMarkEvent
from movie_stats.domain.events.domain_event import DomainEvent
from movie_stats.domain.events.pause_movie_event import OnPauseMovieEvent
from movie_stats.domain.events.play_movie_event import OnPlayMovieEvent
from movie_stats.domain.events.stop_movie_event import OnStopMovieEvent
from movie_stats.domain.events.unbook_mark_event import UnBookMarkEvent


class MovieStats(AggregateRoot):

    def __init__(self, movie_id: int, total_book_mark: int, numer_of_watch: int, number_of_pause: int,
                 number_of_stop: int):
        super().__init__()
        self.movie_id = movie_id
        self.total_book_mark = total_book_mark
        self.number_of_watch = numer_of_watch
        self.number_of_pause = number_of_pause
        self.number_of_stop = number_of_stop

    def aggregate_id(self):
        return self.movie_id

    def book_mark_movie(self):
        self.recordThat(BookMarkEvent(self.aggregate_id()))

    def unbook_mark_movie(self):
        self.recordThat(UnBookMarkEvent(self.aggregate_id()))

    def play_movie(self):
        self.recordThat(OnPlayMovieEvent(self.aggregate_id()))

    def pause_movie(self):
        self.recordThat(OnPauseMovieEvent(self.aggregate_id()))

    def stop_movie(self):
        self.recordThat(OnStopMovieEvent(self.aggregate_id()))

    def on_book_mark_event(self, _: DomainEvent):
        self.total_book_mark = self.total_book_mark + 1

    def on_un_book_mark_event(self, _: DomainEvent):
        # Only rule but justify by a test
        if self.total_book_mark == 0:
            return
        self.total_book_mark = self.total_book_mark - 1

    def on_play_event(self, _: DomainEvent):
        self.number_of_watch += 1

    def on_pause_event(self, _: DomainEvent):
        self.number_of_pause += 1

    def on_stop_event(self, _: DomainEvent):
        self.number_of_stop += 1

    def __eq__(self, other):
        if isinstance(other, MovieStats):
            # Compare the relevant attributes for equality
            return self.total_book_mark == other.total_book_mark and self.number_of_watch == other.number_of_watch and self.number_of_pause == other.number_of_pause and self.number_of_stop == other.number_of_stop
        return False
