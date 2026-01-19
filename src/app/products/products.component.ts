import { ChangeDetectorRef, Component, Injector, ViewChild, OnInit } from '@angular/core';
import { LazyLoadEvent } from '@node_modules/primeng/api';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';

import { ProductServiceProxy, ProductDto, ProductDtoPagedResultDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  standalone: true
})
export class ProductComponent extends PagedListingComponentBase<ProductDto> {
  products: ProductDto[] = [];

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  onInit(): void {
    this.list();
  }

  protected list(event?: LazyLoadEvent): void {
    this.primengTableHelper.showLoadingIndicator();

    this._productService
      .getAll(
        this.primengTableHelper.getSorting(null), // assuming no table for now
        this.primengTableHelper.getSkipCount(null, event),
        this.primengTableHelper.getMaxResultCount(null, event)
      )
      .subscribe((result: ProductDtoPagedResultDto) => {
        this.products = result.items;
        this.primengTableHelper.totalRecordsCount = result.totalCount;
        this.primengTableHelper.hideLoadingIndicator();
        this.cd.detectChanges();
        alert('Products loaded: ' + this.products.length);
      });
  }

  protected delete(entity: ProductDto): void {
    // Implement delete logic
    this._productService.delete(entity.id).subscribe(() => {
      this.refresh();
    });
  }


}
