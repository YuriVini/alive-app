import React from "react";
import { StockProvider } from "./Stock";

type GlobalContextProps = {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
};

const GlobalContext = ({ children }: GlobalContextProps) => {
  return <StockProvider>{children}</StockProvider>;
};

export default GlobalContext;
