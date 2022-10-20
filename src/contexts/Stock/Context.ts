import React from "react";
import { StockQuoteResponse } from "../../services/types";

type Context = {
  stock: StockQuoteResponse;
  addStock: (_newStock: StockQuoteResponse) => void;
};

const StockContext = React.createContext<Context>({} as Context);

export default StockContext;
