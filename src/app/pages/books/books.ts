import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html'
})
export class Books {
  books: any[] = [];
  editing = false;
  editId: number | null = null;

  form = {
    title: '',
    author: '',
    quote: ''
  };

  showError = false;

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.booksService.getBooks().subscribe((res: any[]) => {
      this.books = res;
    });
  }

  deleteBook(id: number) {
    this.booksService.deleteBook(id).subscribe(() => {
      this.loadBooks();
    });
  }

  startEdit(book: any) {
    this.editing = true;
    this.editId = book.id;

    this.form = {
      title: book.title,
      author: book.author,
      quote: book.quote
    };

    this.showError = false;
  }

  resetForm() {
    this.editing = false;
    this.editId = null;
    this.form = { title: '', author: '', quote: '' };
    this.showError = false;
  }

  saveBook() {
    if (this.editing) {
      this.updateBook();
    } else {
      this.addBook();
    }
  }

  addBook() {
    if (!this.form.title || !this.form.author || !this.form.quote) {
      this.showError = true;
      return;
    }

    this.showError = false;

    this.booksService.createBook(this.form).subscribe(() => {
      this.resetForm();
      this.loadBooks();
    });
  }

  updateBook() {
    if (!this.form.title || !this.form.author || !this.form.quote) {
      this.showError = true;
      return;
    }

    this.showError = false;

    this.booksService.updateBook(this.editId!, this.form).subscribe(() => {
      this.resetForm();
      this.loadBooks();
    });
  }
  cancelEdit() {
    this.editing = false;
    this.editId = null;
    this.form = { title: '', author: '', quote: '' };
    this.showError = false;
  }
}
