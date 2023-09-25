import unittest

from movie_stats.__tests__.stats_event_fixture import TestStatsEventFixture
from movie_stats.domain.aggragate_repository import AggregateRepository
from movie_stats.domain.events.book_mark_event import BookMarkEvent
from movie_stats.domain.movie_stats_builder import MovieStatsBuilder
from movie_stats.infra.repositories.domain_stats_event_repository import DomainStatsEventRepository
from movie_stats.infra.repositories.in_memory_event_store import InMemoryEventStore


class TestOnBookMovieCommand(unittest.TestCase):
    def setUp(self):
        self.event_store = InMemoryEventStore()
        self._fixture = TestStatsEventFixture(DomainStatsEventRepository(AggregateRepository(self.event_store)),
                                              self.event_store)

    def test_shift_gear_down_to_apply_methode(self):
        movie_state = MovieStatsBuilder().build()
        movie_state.apply(BookMarkEvent(1))
        self.assertEqual(MovieStatsBuilder().with_total_book_mark(1).build(), movie_state)

    def test_shift_gear_down_to_apply_methode_two_time_apply_methode(self):
        movie_state = MovieStatsBuilder().build()
        movie_state.apply(BookMarkEvent(2))
        movie_state.apply(BookMarkEvent(3))
        self.assertEqual(MovieStatsBuilder().with_total_book_mark(2).build(), movie_state)

    def test_shift_gear_down_to_apply_methode_two_different_event_id_apply_methode(self):
        movie_state = MovieStatsBuilder().build()
        movie_state2 = MovieStatsBuilder().build()
        movie_state.apply(BookMarkEvent(4))
        movie_state2.apply(BookMarkEvent(5))
        self.assertEqual(MovieStatsBuilder().with_total_book_mark(1).build(), movie_state)
        self.assertEqual(MovieStatsBuilder().with_total_book_mark(1).build(), movie_state2)

    def test_bob_have_bookmark_lordofthering(self):
        movie_id: int = 10
        self._fixture.givenMovieExists([])
        self._fixture.whenOnBookmarkMovieCommandIsExecuted(movie_id)
        self._fixture.thenEventShouldBeAdded(BookMarkEvent(movie_id))


if __name__ == "__main__":
    unittest.main()
