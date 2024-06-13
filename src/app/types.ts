export type Row = {
  name: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
};

export type Column = {
  name: string;
  selector: (row: Row) => any;
};
