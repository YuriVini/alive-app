import { adgrowthAPI } from ".";
import {
  StockGainsResponse,
  StockHistoryResponse,
  StockQuoteResponse,
} from "./types";

export const getStockQuote = (stockName: string) =>
  adgrowthAPI.get<StockQuoteResponse>(`/stock/${stockName}/quote`);

export const getStockHistory = (stockName: string, from: number, to: number) =>
  adgrowthAPI.get<StockHistoryResponse>(`/stocks/${stockName}/history`, {
    params: { from, to },
  });

export const getStockGains = (
  stockName: string,
  purchasedAt: Date,
  purchasedAmount: number
) =>
  adgrowthAPI.get<StockGainsResponse>(`/stocks/${stockName}/gains/`, {
    params: { purchasedAt, purchasedAmount },
  });
