import React, { useMemo, useState, useCallback, FC, ReactNode } from "react";
import { StockQuoteResponse } from "../../services/types";

import StockContext from "./Context";

const StockProvider = ({ children }: { children?: ReactNode }) => {
  const [stock, setStock] = useState<StockQuoteResponse>(
    {} as StockQuoteResponse
  );
  console.tron.log!(stock);
  const addStock = useCallback(
    (_newStock: StockQuoteResponse) => setStock(_newStock),
    []
  );

  const value = useMemo(() => {
    return {
      stock,
      addStock,
    };
  }, [stock, addStock]);

  return (
    <StockContext.Provider value={value}>{children}</StockContext.Provider>
  );
};
export default StockProvider;
