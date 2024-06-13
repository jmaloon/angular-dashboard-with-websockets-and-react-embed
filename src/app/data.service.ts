import { Injectable } from "@angular/core";
import { interval } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import { getRandomName, getRandomQuarterlySalesFigure } from "./utils";

const WEBSOCKET_URL = "https://echo.websocket.org/";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private socket$ = webSocket({
    url: WEBSOCKET_URL,
    deserializer: (e) => e,
  });

  constructor() {
    // Using an interval to mock real-time data changes.
    interval(1000).subscribe(() => {
      const name = getRandomName();
      const number = getRandomQuarterlySalesFigure();
      const quarter = 1 + Math.floor(Math.random() * 4);
      this.socket$.next({ name, [`q${quarter}`]: number } as unknown as any);
    });
  }

  getData() {
    return this.socket$.asObservable();
  }
}
