export const sortcolumnsByDisplayRank = (
  a: { displayRank: number },
  b: { displayRank: number },
) => a.displayRank - b.displayRank;
