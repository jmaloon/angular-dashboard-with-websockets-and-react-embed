import { Injectable } from "@angular/core";
import { webSocket } from "rxjs/webSocket";

const WEBSOCKET_URL = "https://echo.websocket.org/";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private socket$ = webSocket({
    url: WEBSOCKET_URL,
    deserializer: (e) => e,
  });

  getData() {
    return this.socket$.asObservable();
  }

  sendMessage() {
    this.socket$.next("sdlkfjskdl" as unknown as any);
  }
}
