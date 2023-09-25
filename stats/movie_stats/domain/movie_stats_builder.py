from movie_stats.domain.movie_stats import MovieStats


class MovieStatsBuilder():

    def __init__(self, movie_id=0):
        self.movie_stats = MovieStats(movie_id, total_book_mark=0, numer_of_watch=0, number_of_pause=0,
                                      number_of_stop=0)

    def with_total_book_mark(self, total_book_mark: int):
        self.movie_stats.total_book_mark = total_book_mark
        return self

    def with_number_of_watch(self, numer_of_watch: int):
        self.movie_stats.number_of_watch = numer_of_watch
        return self

    def with_number_of_pause(self, number_of_pause: int):
        self.movie_stats.number_of_pause = number_of_pause
        return self

    def with_number_of_stop(self, param: int):
        self.movie_stats.number_of_stop = param
        return self

    def build(self) -> MovieStats:
        return self.movie_stats
