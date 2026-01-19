import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { CreateProductDialogComponent } from './create-product/create-product-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        ProductsRoutingModule,
        CreateProductDialogComponent
    ]
})
export class ProductsModule {


}