import { Component, Output } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { BookServiceProxy, CreateBookDto } from '@shared/service-proxies/service-proxies';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-book-dialog',
  imports: [CommonModule, FormsModule, ModalModule],
  standalone: true,
  templateUrl: './create-book-dialog.component.html',
  providers: [BookServiceProxy]
})
export class CreateBookDialogComponent {
  saving = false
  book = new CreateBookDto()
  @Output() onSave = new EventEmitter<any>();
  constructor(
    public bsModalRef: BsModalRef,
    private bookService: BookServiceProxy

  ) {

  }

  save(): void {
    this.saving = true;
    this.bookService.create(this.book).subscribe({
      next: () => {
        alert('Book Saved Successfully!');
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      error: (err) => {
        this.saving = false;
        console.error(err);
      }

    });
  }
}
