import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { map, scan, tap } from "rxjs/operators";
import { DataService } from "./data.service";

type Message = { type: string; timeStamp: number; data: string };
type Row = { name: string; q1: number; q2: number; q3: number; q4: number };

function getRandom() {
  return Math.floor(Math.random() * 89000 + 10000);
}
function createRow(name: string) {
  return {
    name,
    q1: getRandom(),
    q2: getRandom(),
    q3: getRandom(),
    q4: getRandom(),
  };
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(private dataService: DataService) {}

  public rowData: Row[] = [
    createRow("Josh Maloon"),
    createRow("Michael Scott"),
    createRow("Jim Halpert"),
  ];
  public columnData: Array<{ name: string; selector: (x: Row) => any }> = [
    { name: "Name", selector: (row) => row.name },
    { name: "Q1", selector: (row) => row.q1 },
    { name: "Q2", selector: (row) => row.q2 },
    { name: "Q3", selector: (row) => row.q3 },
    { name: "Q4", selector: (row) => row.q4 },
  ];

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

  send() {
    this.dataService.sendMessage();
  }
}
