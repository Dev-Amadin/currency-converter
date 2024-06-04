import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  private url = 'https://api.frankfurter.app';

  constructor(
    private http: HttpClient
  ) { }

  getCurrencies() {
    return this.http.get(`${this.url}/currencies`);
  }

  convert(conversion: any) {
    const params = new HttpParams().set('amount', conversion.amount).set('from', conversion.from).set('to', conversion.to);
    return this.http.get(`${this.url}/latest`, { params: params });
  }
}
