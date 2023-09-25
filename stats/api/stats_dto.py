from pydantic import BaseModel


class OnBookmarkRequest(BaseModel):
    movie_id: int


class OnUnBookmarkRequest(BaseModel):
    movie_id: int


class OnPlayRequest(BaseModel):
    movie_id: int


class OnPauseRequest(BaseModel):
    movie_id: int


class OnStopRequest(BaseModel):
    movie_id: int
