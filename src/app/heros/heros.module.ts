import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HerosRoutingModule } from './heros-routing.module';
import { CreateHeroDialogComponent } from './create-hero/create-hero-dialog.component';
import { EidtHeroDialogComponent } from './edit-hero/eidt-hero-dialog.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HerosRoutingModule,
    CreateHeroDialogComponent,
    EidtHeroDialogComponent

  ]
})
export class HerosModule { }
