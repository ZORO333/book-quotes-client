import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiUrl = 'https://bookquotes-api.onrender.com/api/books';
  //private apiUrl = 'http://localhost:5075/api/books';

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<any[]>(this.apiUrl);
  }

  createBook(model: any) {
    return this.http.post(this.apiUrl, model);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateBook(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }


}
