import axios, { AxiosInstance } from "axios";
import { PlayerGatewayInterface } from "../model/player.gateway";

export class ApiPlayerGateway implements PlayerGatewayInterface {
  apiInstance: AxiosInstance;
  playerApiInstance: AxiosInstance;
  constructor(apiInstance: AxiosInstance) {
    const API_URL = "http://localhost:8083";

    const instance = axios.create({
      baseURL: API_URL,
      headers: { "Content-type": "application/json" },
      withCredentials: true,
    });
    this.playerApiInstance = instance;
    this.apiInstance = apiInstance;
  }

  async pause({ movieID }: { movieID: number }): Promise<void> {
    await this.apiInstance.post("/control?control=pasue&video_id=" + movieID);
  }
  async play({ movieID }: { movieID: number }): Promise<void> {
    await this.apiInstance.post("/control?control=play&video_id=" + movieID);
  }
  async stop({ movieID }: { movieID: number }): Promise<void> {
    await this.apiInstance.post("/control?control=stop&video_id=" + movieID);
  }

  async getCurrentState({ movieID }: { movieID: number }): Promise<{
    state: "started" | "stopped" | "paused";
    url: string;
  }> {
    let player = await this.apiInstance.post("/player?movie_id=" + movieID);

    console.log(player.data);
    const response = await axios.get(player.data).then((res) => {});

    throw {
      state: player.data.state,
      url: player.data.url,
    };
  }
}
