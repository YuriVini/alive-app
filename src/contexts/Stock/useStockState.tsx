import * as React from "react";
import StockContext from "./Context";

const useStockState = () => React.useContext(StockContext);
export default useStockState;
