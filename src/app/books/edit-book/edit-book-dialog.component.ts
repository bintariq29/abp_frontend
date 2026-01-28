import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { BookDto, BookServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@node_modules/abp-ng2-module';

@Component({
  selector: 'app-edit-book-dialog',
  imports: [CommonModule, FormsModule, ModalModule],
  templateUrl: './edit-book-dialog.component.html',
  standalone: true,
  providers: [BookServiceProxy]
})
export class EditBookDialogComponent implements OnInit {
  saving = false;
  book = new BookDto();
  id: number;
  @Output() onSave = new EventEmitter<any>();
  constructor(
    public bsModalRef: BsModalRef,
    private bookService: BookServiceProxy,
    private cdr: ChangeDetectorRef,
    private notifyService: NotifyService


  ) {

  }
  ngOnInit(): void {
    this.bookService.get(this.id).subscribe((result) => {
      console.log("Backend sa data aya", result);
      this.book = result;
      this.cdr.detectChanges();
    });
  }

  save(): void {
    this.saving = true;
    this.bookService.update(this.book).subscribe({
      next: () => {
        this.notifyService.info('Book updated successfully!');
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      error: () => this.saving = false
    });
  }

}
