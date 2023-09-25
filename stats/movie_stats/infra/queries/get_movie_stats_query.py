# En CQRS on va casser le principe du usecase et des command pour les query, et ne pas mettre de couche d'abstraction en la l'outil de percistance et le usecase query
# le but est d'utiliser les outils (mongodb, prisma..) afin d'obtimiser au maximum la lecture
# Pour le moment je suis en inmemory donc je vais passer au constructeur la class inmemory afin de partager les même data
# A l'avenir j'utiliserais directement les schémas (mongo, sql..) ici
from movie_stats.app.queries.get_movie_stats_query_interface import GetMovieStatsQueryInterface
from movie_stats.domain.movie_stats import MovieStats
from movie_stats.domain.movie_stats_builder import MovieStatsBuilder
from movie_stats.infra.repositories.in_memory_event_store import InMemoryEventStore


class GetMovieStatsQuery(GetMovieStatsQueryInterface):
    def __init__(self, inmemorydb: InMemoryEventStore):
        super().__init__()
        self.in_memory_db: InMemoryEventStore = inmemorydb

    async def by_id(self, movie_id) -> MovieStats:
        if self.in_memory_db.is_aggragate_id_exist_on_store(movie_id):
            events = self.in_memory_db.events
            movie_stats = MovieStatsBuilder().build()
            for event in events[movie_id]:
                movie_stats.apply(event)
            return movie_stats
