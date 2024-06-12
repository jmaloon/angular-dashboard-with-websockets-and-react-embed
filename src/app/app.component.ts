import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { map, scan, tap } from "rxjs/operators";
import { DataService } from "./data.service";

type Message = { type: string; timeStamp: number; data: string };

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  private data$ = this.dataService.getData();
  public messages$ = this.data$.pipe(
    tap((x) => console.log(x)),
    map<MessageEvent<any>, Message>(({ type, timeStamp, data }) => ({
      type,
      timeStamp,
      data,
    })),
    scan((acc: Message[], cv: Message) => [...acc, cv], []),
    tap((x) => console.log(x))
  );

  constructor(private dataService: DataService) {}

  send() {
    this.dataService.sendMessage();
  }
}
