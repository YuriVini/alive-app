export type HistoryStockPrice = {
  opening: number;
  high: number;
  closing: number;
  pricedAt: Date;
  volume: number;
};

export type StockQuoteResponse = {
  name: string;
  lastPrice: number;
  pricedAt: Date;
};

export type StockHistoryResponse = {
  name: string;
  prices: HistoryStockPrice[];
};

export type StockGainsResponse = {
  name: string;
  lastPrice: number;
  priceAtDate: number;
  purchasedAmount: number;
  purchasedAt: Date;
  capitalGains: number;
};
