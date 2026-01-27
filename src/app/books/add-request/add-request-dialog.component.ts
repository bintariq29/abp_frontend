import { Component, OnInit, Output } from '@angular/core';
import { BookDto, BookRequestServiceProxy, CreateBookRequestDto, UserLoginInfoDto } from '@shared/service-proxies/service-proxies';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { NotifyService } from 'abp-ng2-module';

@Component({
  selector: 'app-add-request-dialog',
  imports: [CommonModule, FormsModule, ModalModule],
  templateUrl: './add-request-dialog.component.html',
  providers: [BookRequestServiceProxy]
})
export class AddRequestDialogComponent implements OnInit {
  saving = false;
  request = new CreateBookRequestDto();
  bookDetails: BookDto;
  userDetails: UserLoginInfoDto
  @Output() onSave = new EventEmitter<any>();
  currentDateTime: Date = new Date();

  constructor(
    private bookRequestService: BookRequestServiceProxy,
    public bsModalRef: BsModalRef,
    private notifyService: NotifyService

  ) {


  }
  ngOnInit(): void {
    if (this.bookDetails && this.userDetails) {
      this.request.bookId = this.bookDetails.id;
      this.request.userId = this.userDetails.id;

      this.request.requestDays = 1;

      this.request.userName = this.userDetails.userName;
      this.request.bookName = this.bookDetails.title;
      this.request.email = this.userDetails.emailAddress;

      this.request.dateTime = this.currentDateTime.toISOString();
    }
  }
  save(): void {
    this.saving = true;

    // Backend call
    this.bookRequestService.create(this.request).subscribe({
      next: () => {
        this.notifyService.info('Request submitted successfully!');
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
