import { debounce, noop } from "lodash";
import { createContext, useContext, useMemo, useState } from "react";
import StackGridBase, { Grid, StackGridProps } from "react-stack-grid";

export function StackGrid(props: StackGridProps) {
  const [grid, setGrid] = useState<Grid | null>(null);

  const value = useMemo<StackGridContextType>(
    () => ({
      updateLayout: debounce(() => grid?.updateLayout?.(), 300),
    }),
    [grid]
  );
  return (
    <StackGridContext.Provider value={value}>
      <StackGridBase {...props} gridRef={setGrid}></StackGridBase>
    </StackGridContext.Provider>
  );
}
type StackGridContextType = {
  updateLayout: () => void;
};

const StackGridContext = createContext<StackGridContextType>({
  updateLayout: noop,
});

export function useStackGrid() {
  return useContext(StackGridContext);
}
