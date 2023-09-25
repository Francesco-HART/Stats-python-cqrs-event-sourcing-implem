import unittest

from movie_stats.__tests__.stats_event_fixture import TestStatsEventFixture
from movie_stats.domain.aggragate_repository import AggregateRepository
from movie_stats.domain.events.book_mark_event import BookMarkEvent
from movie_stats.domain.events.unbook_mark_event import UnBookMarkEvent
from movie_stats.domain.movie_stats_builder import MovieStatsBuilder
from movie_stats.infra.repositories.domain_stats_event_repository import DomainStatsEventRepository
from movie_stats.infra.repositories.in_memory_event_store import InMemoryEventStore


class TestOnUnBookMovieCommand(unittest.TestCase):
    def setUp(self):
        self.event_store = InMemoryEventStore()
        self._fixture = TestStatsEventFixture(DomainStatsEventRepository(AggregateRepository(self.event_store)),
                                              self.event_store)

    def test_bob_have_un_bookmark_RRRrrrr(self):
        movie_id: str = "1234"
        self._fixture.givenMovieExists([])
        self._fixture.whenOnUnBookmarkMovieCommandIsExecuted(movie_id)
        self._fixture.thenEventShouldBeAdded(UnBookMarkEvent(movie_id))

    def test_shift_gear_down_to_apply_methode(self):
        movie_stats = MovieStatsBuilder(1234).build()
        self.event_store.commit(movie_stats.movie_id, BookMarkEvent(movie_stats.movie_id))
        movie_stats.apply(UnBookMarkEvent(movie_stats.movie_id))
        self.assertEqual(MovieStatsBuilder().with_total_book_mark(0).build(), movie_stats)

    def test_shift_gear_down_to_apply_methode2(self):
        movie_stats = MovieStatsBuilder(1234).build()
        movie_stats.apply(UnBookMarkEvent(movie_stats.movie_id))
        self.assertEqual(MovieStatsBuilder().with_total_book_mark(0).build(), movie_stats)


if __name__ == "__main__":
    unittest.main()
