import React from "react";
import { Column, Row } from "./types";

type ReactDataTableProps = {
  columns: Column[];
  rows: Row[] | null;
};

export default function ReactDataTable({ columns, rows }: ReactDataTableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.name}>{column.name}</th>
          ))}
        </tr>
      </thead>
      {rows && (
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              {columns.map((column) => (
                <td key={column.name}>{column.selector(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}
