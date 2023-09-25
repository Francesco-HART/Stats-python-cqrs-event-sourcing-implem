import unittest

from movie_stats.__tests__.stats_event_fixture import TestStatsEventFixture
from movie_stats.domain.aggragate_repository import AggregateRepository
from movie_stats.domain.events.pause_movie_event import OnPauseMovieEvent
from movie_stats.domain.movie_stats_builder import MovieStatsBuilder
from movie_stats.infra.repositories.domain_stats_event_repository import DomainStatsEventRepository
from movie_stats.infra.repositories.in_memory_event_store import InMemoryEventStore


class TestOnPauseMovieCommand(unittest.TestCase):
    def setUp(self):
        self.event_store = InMemoryEventStore()
        self._fixture = TestStatsEventFixture(DomainStatsEventRepository(AggregateRepository(self.event_store)),
                                              self.event_store)

    def test_shift_gear_down_to_apply_methode_for_pause(self):
        movie_stats = MovieStatsBuilder(1234).with_number_of_pause(2).build()
        movie_stats.apply(OnPauseMovieEvent(movie_stats.movie_id))
        self.assertEqual(MovieStatsBuilder().with_number_of_pause(3).build(), movie_stats)

    def test_bob_have_pause_le_grand_bleu(self):
        movie_id: int = 1
        self._fixture.givenMovieExists([])
        self._fixture.whenOnPauseMovieCommandIsExecuted(movie_id)
        self._fixture.thenEventShouldBeAdded(OnPauseMovieEvent(movie_id))


if __name__ == "__main__":
    unittest.main()
