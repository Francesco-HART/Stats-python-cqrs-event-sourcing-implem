import unittest

from movie_stats.__tests__.stats_event_fixture import TestStatsEventFixture
from movie_stats.domain.aggragate_repository import AggregateRepository
from movie_stats.domain.events.pause_movie_event import OnPauseMovieEvent
from movie_stats.domain.events.stop_movie_event import OnStopMovieEvent
from movie_stats.domain.movie_stats_builder import MovieStatsBuilder
from movie_stats.infra.repositories.domain_stats_event_repository import DomainStatsEventRepository
from movie_stats.infra.repositories.in_memory_event_store import InMemoryEventStore


class TestOnStopMovieCommand(unittest.TestCase):
    def setUp(self):
        self.event_store = InMemoryEventStore()
        self._fixture = TestStatsEventFixture(DomainStatsEventRepository(AggregateRepository(self.event_store)),
                                              self.event_store)

    def test_shift_gear_down_to_apply_methode_for_stop(self):
        movie_stats = MovieStatsBuilder(1234).with_number_of_stop(2).build()
        movie_stats.apply(OnStopMovieEvent(movie_stats.movie_id))
        self.assertEqual(MovieStatsBuilder().with_number_of_stop(3).build(), movie_stats)

    def test_bob_have_stop_la_vite_e_bella(self):
        movie_id: int = 2
        self._fixture.givenMovieExists([])
        self._fixture.whenOnStopMovieCommandIsExecuted(movie_id)
        self._fixture.thenEventShouldBeAdded(OnStopMovieEvent(movie_id))


if __name__ == "__main__":
    unittest.main()
