import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { CreateBookDialogComponent } from './create-book/create-book-dialog.component'
import { EditBookDialogComponent } from './edit-book/edit-book-dialog.component'
import { AddRequestDialogComponent } from './add-request/add-request-dialog.component'
import { EditRequestDialogComponent } from './edit-request/edit-request-dialog.component'




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BooksRoutingModule,
    CreateBookDialogComponent,
    EditBookDialogComponent,
    AddRequestDialogComponent,
    EditRequestDialogComponent


  ]
})
export class BooksModule { }
