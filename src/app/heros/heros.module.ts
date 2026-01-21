import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerosRoutingModule } from './heros-routing.module';
import { CreateHeroDialogComponent } from './create-hero/create-hero-dialog.component';
import { EidtHeroDialogComponent } from './edit-hero/eidt-hero-dialog.component';
import { HerosComponent } from './heros.component';
import { SharedModule } from '@node_modules/primeng/api';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    HerosRoutingModule,
    CreateHeroDialogComponent,
    EidtHeroDialogComponent,
    HerosComponent

  ]
})
export class HerosModule { }





