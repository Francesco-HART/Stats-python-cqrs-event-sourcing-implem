export interface PlayerGatewayInterface {
  pause({ movieID }: { movieID: number }): Promise<void>;
  play({ movieID }: { movieID: number }): Promise<void>;
  stop({ movieID }: { movieID: number }): Promise<void>;
  getCurrentState({ movieID }: { movieID: number }): Promise<{
    state: "started" | "stopped" | "paused";
    url: string;
  }>;
}
