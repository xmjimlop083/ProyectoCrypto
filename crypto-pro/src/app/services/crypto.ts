import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

@Injectable({
  providedIn: 'root',
})
export class Crypto {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';

  constructor(private http: HttpClient) {}

  getCryptos(): Observable<CryptoCurrency[]> {
    const params = new HttpParams()
      .set('vs_currency', 'eur')
      .set('order', 'market_cap_desc')
      .set('per_page', 100)
      .set('page', 1)
      .set('sparkline', false);

    return this.http.get<CryptoCurrency[]>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        console.error('Error fetching cryptos', error);
        return throwError(() => error);
      })
    );
  }

  getCryptoDetail(id: string): Observable<any> {
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const params = new HttpParams()
      .set('localization', false)
      .set('tickers', false)
      .set('market_data', true)
      .set('community_data', false)
      .set('developer_data', false)
      .set('sparkline', true);

    return this.http.get<any>(url, { params }).pipe(
      catchError((error) => {
        console.error(`Error fetching crypto detail for ${id}`, error);
        return throwError(() => error);
      })
    );
  }
}
