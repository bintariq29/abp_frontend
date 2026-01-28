import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { ViewBookRequestsComponent } from './book-requests/view-book-requests.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    ViewBookRequestsComponent
  ]
})
export class RequestsModule {

}
