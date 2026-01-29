import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { BookRequestServiceProxy, BookRequestDto, UpdateDaysBookRequestDto, UserLoginInfoDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-request-dialog',
  templateUrl: './edit-request-dialog.component.html',

  imports: [CommonModule, FormsModule, ModalModule],
  providers: [BookRequestServiceProxy]


})
export class EditRequestDialogComponent implements OnInit {
  saving = false;
  requestDto: BookRequestDto; // Ye data "BooksComponent" se ayega
  userInfo: UserLoginInfoDto;
  request = new UpdateDaysBookRequestDto(); // Ye update API ke liye hai
  requestedBookId: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    public bsModalRef: BsModalRef,
    private _bookRequestService: BookRequestServiceProxy,
    private _notify: NotifyService
  ) { }

  ngOnInit(): void {
    console.log("REQUEST DTO", this.requestDto);

    const actualData = Array.isArray(this.requestDto) ? this.requestDto[0] : this.requestDto;

    if (actualData) {
      this.request.id = actualData.requestId;
      this.request.bookId = this.requestedBookId;
      this.request.userId = this.userInfo.id;
      this.request.requestDays = actualData.requestDays;
      this.request.stock = actualData.stock;

      console.log("Mapped Request Object (After Fix):", actualData);
    }
  }

  save(): void {
    this.saving = true;
    this._bookRequestService.update(this.request).subscribe({
      next: () => {
        this._notify.success('Request Updated Successfully');
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      error: () => { this.saving = false; }
    });
  }
}