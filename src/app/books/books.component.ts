import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BookDto, BookRequestServiceProxy, BookServiceProxy, UserLoginInfoDto } from '@shared/service-proxies/service-proxies';
import { CreateBookDialogComponent } from './create-book/create-book-dialog.component';
import { CommonModule } from '@node_modules/@angular/common';
import { NotifyService, PermissionCheckerService } from '@node_modules/abp-ng2-module';
import { AppSessionService } from '@shared/session/app-session.service';
import { forkJoin } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { EditBookDialogComponent } from './edit-book/edit-book-dialog.component';
import { AddRequestDialogComponent } from './add-request/add-request-dialog.component';
import { EditRequestDialogComponent } from './edit-request/edit-request-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, ModalModule],
  templateUrl: './books.component.html',
  providers: [BsModalService, BookServiceProxy, BookRequestServiceProxy],
})
export class BooksComponent implements OnInit {
  bookList: any[];
  bookRequestList: any[]
  combineDataList: any[]
  isLoading = false;
  totalBooks = 0;
  totalRequests = 0;
  isAdmin = false;
  userInfo: UserLoginInfoDto = this.appSessionService.user;

  constructor(
    private bookService: BookServiceProxy,
    private modalService: BsModalService,
    private bookRequestService: BookRequestServiceProxy,
    private appSessionService: AppSessionService,
    private permissionService: PermissionCheckerService,
    private cdr: ChangeDetectorRef,
    private _notify: NotifyService,
    private _router: Router,

  ) {
  }
  ngOnInit(): void {
    this.checkUserRole();
    this.loadAllData();
  }
  checkUserRole() {
    const user = this.appSessionService.user;
    const userId = this.appSessionService.user.id;
    console.log("USER KI ID", userId);
    if (user.userName.toLowerCase() == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  createBook() {
    const createModal = this.modalService.show(CreateBookDialogComponent)
    createModal.content.onSave.subscribe(() => {
      this.loadAllData();
    });
  }

  editBook(bookId: number): void {
    const editModal = this.modalService.show(EditBookDialogComponent, {
      initialState: {
        id: bookId
      }
    });

    editModal.content.onSave.subscribe(
      () => {
        this.loadAllData();
      }
    );

  }

  addRequest(bookDetails: BookDto) {
    const addRequestModal = this.modalService.show(AddRequestDialogComponent,
      {
        initialState: {
          bookDetails: bookDetails,
          userDetails: this.userInfo,
        }
      }
    );
    addRequestModal.content.onSave.subscribe(() => {
      this.loadAllData();
    });
  }

  editRequest(requestItem: any, bookId): void {
    const editModal = this.modalService.show(EditRequestDialogComponent, {
      class: 'modal-md',
      initialState: {
        requestDto: requestItem,
        userInfo: this.userInfo,
        requestedBookId: bookId
      }
    });

    editModal.content.onSave.subscribe(() => {
      this.loadAllData();
    });
  }

  withdrawRequest(requestId: number, bookName: string, item: any, whichFunction: string): void {

    abp.message.confirm(
      `Are you sure you want to ${whichFunction} the request for "${bookName}"?`,
      `${whichFunction} Confirmation`,
      (result: boolean) => {
        if (result) {
          this.bookRequestService.delete(requestId).subscribe({
            next: () => {
              this._notify.success(`${whichFunction} successfully.`);


              this.loadAllData();
            },
            error: (err) => {
              console.error(`${whichFunction} Error:`, err);
            }
          });
        }
      }
    );
  }

  viewRequest(): void {
    this._router.navigateByUrl("/app/view-book-request");
  }





  loadAllData() {
    this.isLoading = true;

    forkJoin({
      books: this.bookService.getAll("id asc", 0, 10),
      requests: this.isAdmin ? this.bookRequestService.getAll("id asc", 0, 10) : this.bookRequestService.getRequestsByUserId(this.userInfo.id),
    }).subscribe({
      next: (response) => {
        const books = response.books.items;
        const requests = response.requests.items;
        console.log("REQUESTS KA DATA", requests)
        this.combineDataList = books.map(book => {
          // 1. Is book ki request dhoondo (BookId se match karo)
          const relatedRequest = requests.find(req => req.bookId === book.id);

          // 2. Naya object banao jis mein book ka data ho + request ka data (agar ho to)
          return {
            ...book,

            requestDetails: relatedRequest ? {
              requestId: relatedRequest.id,
              userName: relatedRequest.userName,
              status: relatedRequest.status,
              dateTime: relatedRequest.dateTime, // String hai to seedha aa jayegi
              requestDays: relatedRequest.requestDays,
              email: relatedRequest.email,
              stock: relatedRequest.stock
            } : null
          };
        });

        this.totalBooks = response.books.totalCount;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }



  deleteBook(book: BookDto): void {
    abp.message.confirm(
      `Are you sure you want to delete "${book.title}"?`,
      'Delete Book',
      (result: boolean) => {
        if (result) {
          this.bookService.delete(book.id).subscribe({
            next: () => {
              abp.notify.success('Successfully Deleted');
              this.loadAllData();
            },
            error: (err) => {
              console.error(err);
              abp.notify.error('Something went wrong!');
            }
          });
        }
      }
    );
  }
}
