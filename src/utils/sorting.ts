interface SortListStatesByDisplayRankProps {
  a: {
    displayRank: number;
  };
  b: {
    displayRank: number;
  };
}

export const sortListStatesByDisplayRank = (
  props: SortListStatesByDisplayRankProps,
) => props.a.displayRank - props.b.displayRank;
