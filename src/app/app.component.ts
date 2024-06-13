import { Component } from "@angular/core";
import { filter, map } from "rxjs/operators";
import { DataService } from "./data.service";
import { Column, Row } from "./types";
import { NAMES, createRow, isValidJSON } from "./utils";
import { BehaviorSubject } from "rxjs";

type RowWithTotalSales = Row & { totalSales: number };

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  public rowData$ = new BehaviorSubject(NAMES.map((name) => createRow(name)));
  public columnData: Column[] = [
    { name: "Name", selector: (row) => row.name },
    { name: "Q1", selector: (row) => row.q1 },
    { name: "Q2", selector: (row) => row.q2 },
    { name: "Q3", selector: (row) => row.q3 },
    { name: "Q4", selector: (row) => row.q4 },
  ];

  constructor(private dataService: DataService) {
    this.dataService
      .getData()
      .pipe(
        map((msg) => msg.data),
        filter(isValidJSON),
        map((data) => JSON.parse(data))
      )
      .subscribe((update) => {
        const rows = this.rowData$.getValue();

        this.rowData$.next(
          rows.map((row) =>
            row.name === update.name ? { ...row, ...update } : row
          )
        );
      });
  }

  private rowDataWithTotalSales$ = this.rowData$.pipe(
    map((rd) =>
      rd.map(
        (row): RowWithTotalSales => ({
          ...row,
          totalSales: row.q1 + row.q2 + row.q3 + row.q4,
        })
      )
    )
  );

  public allSales$ = this.rowDataWithTotalSales$.pipe(
    map((rd) =>
      rd
        .map((r) => r.totalSales)
        .reduce((acc: number, cv: number) => acc + cv, 0)
    )
  );

  public topSalesman$ = this.rowDataWithTotalSales$.pipe(
    map(
      (rd) =>
        rd.reduce((acc: RowWithTotalSales, cv: RowWithTotalSales) =>
          cv.totalSales > acc.totalSales ? cv : acc
        ).name
    )
  );
}
