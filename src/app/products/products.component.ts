import { ChangeDetectorRef, Component, Injector, ViewChild, OnInit } from '@angular/core';
import { LazyLoadEvent } from '@node_modules/primeng/api';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { Table, TableModule } from 'primeng/table';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { PrimeTemplate } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductServiceProxy, ProductDto, ProductDtoPagedResultDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, PrimeTemplate, PaginatorModule,]
})
export class ProductComponent extends PagedListingComponentBase<ProductDto> implements OnInit {
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  products: ProductDto[] = [];

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  ngOnInit(): void {
    this.list();
  }

  editProduct(id: number): void {
    // Navigate to edit page or open dialog
    console.log('Edit product', id);
  }

  protected list(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
        return;
      }
    }

    this.primengTableHelper.showLoadingIndicator();

    this._productService
      .getAll(
        this.primengTableHelper.getSorting(this.dataTable) || '',
        this.primengTableHelper.getSkipCount(this.paginator, event) || 0,
        Math.max(this.primengTableHelper.getMaxResultCount(this.paginator, event), this.primengTableHelper.defaultRecordsCountPerPage)
      )
      .subscribe((result: ProductDtoPagedResultDto) => {
        console.log('Products loaded:', result.items.length, result);
        this.primengTableHelper.records = result.items;
        this.primengTableHelper.totalRecordsCount = result.totalCount;
        this.primengTableHelper.hideLoadingIndicator();
        this.cd.detectChanges();
      }, error => {
        console.error('Error loading products:', error);
        this.primengTableHelper.hideLoadingIndicator();
      });
  }

  protected delete(entity: ProductDto): void {
    abp.message.confirm(this.l('ProductDeleteWarningMessage', entity.name), undefined, (result: boolean) => {
      if (result) {
        this._productService.delete(entity.id).subscribe(() => {
          abp.notify.success(this.l('SuccessfullyDeleted'));
          this.refresh();
        });
      }
    });
  }
}
