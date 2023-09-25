import { PlayerGatewayInterface } from "../model/player.gateway";

export class FakePlayerGateway implements PlayerGatewayInterface {
  player: { state: "started" | "stopped" | "paused"; url: string } = {
    state: "stopped",
    url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  };
  async pause({ userID }: { userID: string }): Promise<void> {
    console.log("FakePlayerGateway: pause");
    this.player.state = "paused";
  }

  async play({ userID }: { userID: string }): Promise<void> {
    console.log("FakePlayerGateway: play");
    this.player.state = "started";
  }

  async stop({ userID }: { userID: string }): Promise<void> {
    console.log("FakePlayerGateway: stop");
    this.player.state = "stopped";
  }

  async getCurrentState({ movieID }: { movieID: number }): Promise<{
    state: "started" | "stopped" | "paused";
    url: string;
  }> {
    console.log("FakePlayerGateway: getCurrentState");
    return this.player;
  }
}
