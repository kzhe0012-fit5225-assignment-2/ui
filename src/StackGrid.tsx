import { createContext, useContext, useState } from "react";
import StackGridBase, { Grid, StackGridProps } from "react-stack-grid";

export function StackGrid(props: StackGridProps) {
  const [grid, setGrid] = useState<Grid | null>(null);
  return (
    <StackGridContext.Provider value={grid}>
      <StackGridBase {...props} gridRef={setGrid}></StackGridBase>
    </StackGridContext.Provider>
  );
}
const StackGridContext = createContext<Grid | null>(null);
export function useStackGrid() {
  return useContext(StackGridContext);
}
