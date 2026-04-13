import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuotesService {
  apiUrl = 'https://bookquotes-api.onrender.com/api/quotes';

  constructor(private http: HttpClient) { }

  getQuotes() {
    return this.http.get<any[]>(this.apiUrl);
  }

  createQuote(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateQuote(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteQuote(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
