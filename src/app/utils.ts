export const NAMES = [
  "Dwight Schrute",
  "Jim Halpert",
  "Andrew Bernard",
  "Phyllis Lapin",
  "Stanley Hudson",
] as const;

type Name = (typeof NAMES)[number];

export function getRandomName(): Name {
  return NAMES[Math.floor(Math.random() * NAMES.length)];
}
export function getRandomQuarterlySalesFigure() {
  return Math.floor(Math.random() * 89000) + 10000;
}

export function createRow(name: Name) {
  return {
    name,
    q1: getRandomQuarterlySalesFigure(),
    q2: getRandomQuarterlySalesFigure(),
    q3: getRandomQuarterlySalesFigure(),
    q4: getRandomQuarterlySalesFigure(),
  };
}

export function isValidJSON(data: any): boolean {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    return false;
  }
}
