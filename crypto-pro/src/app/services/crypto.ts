import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class Crypto {
  private apiUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  getCryptos(): Observable<CryptoCurrency[]> {
    const mockData: CryptoCurrency[] = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
        current_price: 96000,
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'eth',
        current_price: 2700,
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
      },
      {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ada',
        current_price: 0.95,
        image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png'
      }
    ];
    return of(mockData);
  }
}
