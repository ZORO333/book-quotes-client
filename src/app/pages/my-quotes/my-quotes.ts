import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuotesService } from '../../services/quotes';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-quotes.html',
  styleUrl: './my-quotes.css'
})
export class Quotes {
  quotes: any[] = [];
  editing = false;
  editId: number | null = null;

  form = {
    text: '',
    author: ''
  };

  showError = false;

  constructor(private quotesService: QuotesService) { }

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    this.quotesService.getQuotes().subscribe((res: any[]) => {
      this.quotes = res;
    });
  }

  saveQuote() {
    if (!this.form.text.trim() || !this.form.author.trim()) {
      this.showError = true;
      return;
    }

    this.showError = false;

    const payload = {
      text: this.form.text,
      author: this.form.author,
      userId: 1
    };

    if (this.editing) {
      this.quotesService.updateQuote(this.editId!, payload).subscribe(() => {
        this.resetForm();
        this.loadQuotes();
      });
    } else {
      this.quotesService.createQuote(payload).subscribe(() => {
        this.resetForm();
        this.loadQuotes();
      });
    }
  }




  startEdit(q: any) {
    this.editing = true;
    this.editId = q.id;
    this.form = { text: q.text, author: q.author };
  }

  deleteQuote(id: number) {
    this.quotesService.deleteQuote(id).subscribe(() => {
      this.loadQuotes();
    });
  }

  resetForm() {
    this.editing = false;
    this.editId = null;
    this.form = { text: '', author: '' };
    this.showError = false;
  }
  cancelEdit() {
    this.editing = false;
    this.editId = null;
    this.form = { text: '', author: '' };
    this.showError = false;
  }

}
