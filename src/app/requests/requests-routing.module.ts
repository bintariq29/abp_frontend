import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBookRequestsComponent } from './book-requests/view-book-requests.component';

const routes: Routes = [
  {
    path:"",
    component:ViewBookRequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
