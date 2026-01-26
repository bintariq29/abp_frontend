import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { CreateBookDialogComponent } from './create-book/create-book-dialog.component'
import { EditBookDialogComponent } from './edit-book/edit-book-dialog.component'



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BooksRoutingModule,
    CreateBookDialogComponent,
    EditBookDialogComponent,

  ]
})
export class BooksModule { }
