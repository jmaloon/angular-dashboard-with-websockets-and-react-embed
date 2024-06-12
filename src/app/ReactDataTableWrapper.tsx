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

import DataTable from "react-data-table-component";
import { Column, Row } from "./types";

const rootElementName = "reactDataTableRoot";

@Component({
  selector: "react-data-table",
  template: `<div #${rootElementName}></div>`,
  //   styleUrls: ["./MyReactComponent.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ReactDataTableWrapper
  implements OnChanges, OnDestroy, AfterViewInit
{
  private root: Root;
  @ViewChild(rootElementName, { static: false }) rootRef: ElementRef;

  @Input() public columnData: Column[] = [];
  @Input() public rowData: Row[] = [];

  //   ngOnChanges(changes: SimpleChanges): void {
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
      <DataTable columns={this.columnData} data={this.rowData} />
    );
  }
}
