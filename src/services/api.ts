import { useMutation } from "@tanstack/react-query";
import { adgrowthAPI } from ".";
import {
  StockCompareRequest,
  StockCompareResponse,
  StockGainsRequest,
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

export const getStockGains = () => {
  return useMutation<StockGainsResponse, Error, StockGainsRequest>((data) =>
    adgrowthAPI
      .get(`/stocks/${data.stockName}/gains/`, {
        params: {
          purchasedAt: data.purchasedAt,
          purchasedAmount: data.purchasedAmount,
        },
      })
      .then((response) => response.data)
  );
};

export const getStockCompared = () => {
  return useMutation<StockCompareResponse, Error, StockCompareRequest>((data) =>
    adgrowthAPI
      .get(`/stocks/${data.stockName}/compare`, {
        params: {
          stocksToCompare: data.stocksToCompare,
        },
      })
      .then((response) => response.data)
  );
};
