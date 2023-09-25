from movie_stats.domain.user_repository import UserRepository


class InMemoryUserRepository(UserRepository):
    def __init__(self):
        self.users: list[str] = []

    def get_one_by_id(self, user_id: str) -> str:
        matching_user_id = next((user for user in self.users if user == user_id), None)
        return matching_user_id
