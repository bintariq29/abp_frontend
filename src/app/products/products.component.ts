import { ChangeDetectorRef, Component, Injector, ViewChild } from '@angular/core';
import { LazyLoadEvent } from '@node_modules/primeng/api';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';

import { ProductServiceProxy, ProductDto, ProductDtoPagedResultDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  standalone: true
})
export class ProductComponent extends PagedListingComponentBase<ProductDto> {
  protected list(event?: LazyLoadEvent): void {
    throw new Error('Method not implemented.');
  }
  protected delete(entity: ProductDto): void {
    throw new Error('Method not implemented.');
  }
  

  
  





}
