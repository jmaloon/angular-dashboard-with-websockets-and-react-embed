import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import * as React from "react";
import { Root, createRoot } from "react-dom/client";

import ReactDataTable from "./ReactDataTable";
import { Column, Row } from "./types";

const rootElementName = "reactDataTableRoot";

@Component({
  selector: "react-data-table",
  template: `<div #${rootElementName}></div>`,
  encapsulation: ViewEncapsulation.None,
  styleUrl: "./react.css",
})
export class ReactDataTableWrapper
  implements OnChanges, OnDestroy, AfterViewInit
{
  private root: Root;
  @ViewChild(rootElementName, { static: false }) rootRef: ElementRef;

  @Input() public columnData: Column[] = [];
  @Input() public rowData: Row[] | null = [];

  ngOnChanges(): void {
    this.render();
  }

  ngAfterViewInit() {
    this.root = createRoot(this.rootRef.nativeElement);
    this.render();
  }

  ngOnDestroy() {
    this.root.unmount();
  }

  private render() {
    if (!this.root) return;

    this.root.render(
      <ReactDataTable columns={this.columnData} rows={this.rowData} />
    );
  }
}
