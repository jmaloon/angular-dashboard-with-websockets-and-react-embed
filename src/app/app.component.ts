import { Component } from "@angular/core";
import { map, scan, tap } from "rxjs/operators";
import { DataService } from "./data.service";
import { Column, Message, Row } from "./types";

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
  public columnData: Column[] = [
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
