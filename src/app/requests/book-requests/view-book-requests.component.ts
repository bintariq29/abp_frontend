import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyService } from 'abp-ng2-module';
import { BookRequestServiceProxy, UpdateStatusBookRequestDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-view-book-requests',
  imports: [CommonModule],
  templateUrl: './view-book-requests.component.html',
  providers: [BookRequestServiceProxy]

})
export class ViewBookRequestsComponent implements OnInit {
  requests: any[] = [];
  isLoading = false;
  constructor(
    private bookRequestService: BookRequestServiceProxy,
    private notifyService: NotifyService,
    private cdr: ChangeDetectorRef
  ) {


  }
  ngOnInit(): void {
    this.loadRequests();
  }
  loadRequests() {
    this.isLoading = true;
    this.bookRequestService.getAll("id asc", 0, 100).subscribe({
      next: (result) => {
        this.requests = result.items;
        this.isLoading = false;
        this.cdr.detectChanges();
        console.log("REQUESTS", this.requests);
      },
      error: () => {
        this.isLoading = false;
        this.notifyService.error("Failed to load requests");
      }
    });
  }


  approveRequest(req: any) {
    this.processStatusUpdate(req, true, 'Accepted');
  }

  rejectRequest(req: any) {
    this.processStatusUpdate(req, false, 'Rejected');
  }

  private processStatusUpdate(req: any, isTargetApproved: boolean, actionText: string) {
    abp.message.confirm(
      `Do you want to ${actionText} request for "${req.bookName}"?`,
      "Confirm Action",
      (result: boolean) => {
        if (result) {
          const input = new UpdateStatusBookRequestDto();
          input.id = req.id;
          input.userId = req.userId;
          input.bookId = req.bookId;

          // Backend ab String mang raha hai, to actionText (Accepted/Rejected) assign karo
          input.status = actionText;

          this.bookRequestService.updateRequestStatus(input).subscribe({
            next: () => {
              this.notifyService.success(`Successfully ${actionText}`);
              this.loadRequests();
            },
            error: (err) => {
              // Agar backend error de, to notify karo
              this.notifyService.error(err.message || "Update failed");
            }
          });
        }
      }
    );
  }

}
