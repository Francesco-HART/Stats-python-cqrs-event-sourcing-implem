import json
import threading

import redis

from movie_stats.domain.events.domain_event import DomainEvent
from movie_stats.domain.events.event_store import EventStore
from movie_stats.infra.events.event_store_decorator import EventStoreDecorator
from movie_stats.infra.events.message_bus_interface import MessageBusInterface


class RedisEventBusDispacher(EventStoreDecorator):
    def __init__(self, event_store: EventStore):
        super().__init__(event_store)
        self.redis_url = "redis://localhost:6379/0"  # Replace with your Redis URL
        self.channel_name = "event_channel"
        self.redis_client = redis.StrictRedis.from_url(self.redis_url)

    def dispatch(self, event: DomainEvent):
        try:
            # Publish the event to the Redis channel
            self.redis_client.publish(self.channel_name, event.aggregate_id)
            print("Event dispatched to Redis channel:", self.channel_name)
            print(event.eventType())
        except Exception as e:
            print("Error dispatching event:", str(e))

    def subscribe(self, action):
        print("Redis subscription start")
        pubsub = self.redis_client.pubsub()
        pubsub.subscribe(self.channel_name)

        # Handle incoming events
        for message in pubsub.listen():
            action(message)


def subscribe_redis_in_new_thread(action, redisEventBus: RedisEventBusDispacher):
    # Start the subscription in a separate thread
    subscription_thread = threading.Thread(target=redisEventBus.subscribe(action))
    subscription_thread.daemon = (
        True  # Set the thread as a daemon so it will exit when the main program exits
    )
    subscription_thread.start()


def subscribe_redis(action, redisEventBus: RedisEventBusDispacher):
    redisEventBus.subscribe(action)
