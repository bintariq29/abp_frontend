import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BookRequestServiceProxy, BookServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateBookDialogComponent } from './create-book/create-book-dialog.component';
import { CommonModule } from '@node_modules/@angular/common';
import { PermissionCheckerService } from '@node_modules/abp-ng2-module';
import { AppSessionService } from '@shared/session/app-session.service';
import { forkJoin } from 'rxjs';

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

  constructor(
    private bookService: BookServiceProxy,
    private modalService: BsModalService,
    private bookRequestService: BookRequestServiceProxy,
    private appSessionService: AppSessionService,
    private permissionService: PermissionCheckerService

  ) {
  }
  ngOnInit(): void {
    this.checkUserRole();
    this.loadAllData();
  }
  checkUserRole() {
    const user = this.appSessionService.user;
    if (user.userName.toLowerCase() == 'admin') {
      alert("Khushamdeed! User: " + user.userName + " Is Admin: " + this.isAdmin);
    } else {
      alert("Koi user login nahi hai!");
    }
  }
  createBook() {
    this.modalService.show(CreateBookDialogComponent)
  }

  loadAllData() {
    this.isLoading = true;

    forkJoin({
      books: this.bookService.getAll(undefined, 0, 10),
      requests: this.bookRequestService.getAll(undefined, 0, 10)
    }).subscribe({
      next: (response) => {
        const books = response.books.items;
        const requests = response.requests.items;

        this.combineDataList = books.map(book => {
          // 1. Is book ki request dhoondo (BookId se match karo)
          const relatedRequest = requests.find(req => req.bookId === book.id);

          // 2. Naya object banao jis mein book ka data ho + request ka data (agar ho to)
          return {
            ...book, // Book ka sara data (id, title, price)
            // Agar request mili to uske extra fields, warna null
            requestDetails: relatedRequest ? {
              requestId: relatedRequest.id,
              userName: relatedRequest.userName,
              status: relatedRequest.status,
              dateTime: relatedRequest.dateTime, // String hai to seedha aa jayegi
              requestDays: relatedRequest.requestDays,
              email: relatedRequest.email
            } : null
          };
        });

        this.totalBooks = response.books.totalCount;
        this.isLoading = false;
        console.log("Combined List Ready:", this.combineDataList);
      },
      error: (err) => {
        this.isLoading = false;
        alert("Koi ek API fail ho gayi");
      }
    });
  }


}
