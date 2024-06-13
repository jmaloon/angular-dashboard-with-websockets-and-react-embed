import { Component } from "@angular/core";
import { catchError, filter, map, scan, tap } from "rxjs/operators";
import { DataService } from "./data.service";
import { Column, Message, Row } from "./types";
import { NAMES, createRow, isValidJSON } from "./utils";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(private dataService: DataService) {
    this.dataService
      .getData()
      .pipe(
        map((msg) => msg.data),
        filter(isValidJSON),
        map((data) => JSON.parse(data))
      )
      .subscribe({
        next: (update) => {
          this.rowData = this.rowData.map((row) =>
            row.name === update.name ? { ...row, ...update } : row
          );
        },
      });
  }

  public rowData: Row[] = NAMES.map((name) => createRow(name));
  public columnData: Column[] = [
    { name: "Name", selector: (row) => row.name },
    { name: "Q1", selector: (row) => row.q1 },
    { name: "Q2", selector: (row) => row.q2 },
    { name: "Q3", selector: (row) => row.q3 },
    { name: "Q4", selector: (row) => row.q4 },
  ];
}
