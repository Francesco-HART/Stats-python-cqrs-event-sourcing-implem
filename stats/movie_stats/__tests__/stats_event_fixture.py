import unittest

from movie_stats.app.commands.on_book_mark_movie_command import OnBookMarkMovieCommand
from movie_stats.app.commands.on_pause_movie_command import OnPauseMovieCommand
from movie_stats.app.commands.on_play_movie_command import OnPlayMovieCommand
from movie_stats.app.commands.on_stop_movie_command import OnStopMovieCommand
from movie_stats.app.commands.on_un_book_mark_movie_command import OnUnBookMarkMovieCommand
from movie_stats.domain.events.event_store import EventStore
from movie_stats.domain.events.domain_event import DomainEvent
from movie_stats.domain.stats_event_repository import StatsEventRepository


class TestStatsEventFixture(unittest.TestCase):
    def __init__(self, stats_event_repo: StatsEventRepository, event_store: EventStore):
        super().__init__()
        self.throwError: Exception = None
        self._onBookMarkMovieCommand = OnBookMarkMovieCommand(stats_event_repo)
        self._onUnBookMarkMovieCommand = OnUnBookMarkMovieCommand(stats_event_repo)
        self._onPlayMovieCommand = OnPlayMovieCommand(stats_event_repo)
        self._onPauseMovieCommand = OnPauseMovieCommand(stats_event_repo)
        self._onStopMovieCommand = OnStopMovieCommand(stats_event_repo)

        self._movieRepo = 1
        self._stats_event_repo = stats_event_repo
        self._event_store = event_store

    def givenMovieExists(self, movies: list[str]):
        pass

    def whenOnBookmarkMovieCommandIsExecuted(self, movie_id: str):
        try:
            self._onBookMarkMovieCommand.handle(movie_id=movie_id)
        except Exception as e:
            self.throwError = e

    def whenOnUnBookmarkMovieCommandIsExecuted(self, movie_id: str):
        try:
            self._onUnBookMarkMovieCommand.handle(movie_id=movie_id)
        except Exception as e:
            self.throwError = e

    def whenOnPlayMovieCommandIsExecuted(self, movie_id):
        try:
            self._onPlayMovieCommand.handle(movie_id=movie_id)
        except Exception as e:
            self.throwError = e

    def whenOnPauseMovieCommandIsExecuted(self, movie_id):
        try:
            self._onPauseMovieCommand.handle(movie_id=movie_id)
        except Exception as e:
            self.throwError = e

    def whenOnStopMovieCommandIsExecuted(self, movie_id):
        try:
            self._onStopMovieCommand.handle(movie_id=movie_id)
        except Exception as e:
            self.throwError = e

    def thenEventShouldNotBeAdded(self):
        self.assertTrue(self._stats_event_repo.lastEvent == None)

    def thenEventShouldBeAdded(self, event: DomainEvent):
        last_event = self._event_store.last_event
        self.assertEqual(last_event, event)

    def thenErrorShouldBe(self, instanceType):
        self.assertIsInstance(self.throwError, instanceType)
