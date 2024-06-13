import { Column, Row } from "./types";

import React from "react";

type ReactDataTableProps = {
  columns: Column[];
  rows: Row[];
};

export default function ReactDataTable({ columns, rows }: ReactDataTableProps) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.name}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            {columns.map((column) => (
              <td key={column.name}>{column.selector(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
