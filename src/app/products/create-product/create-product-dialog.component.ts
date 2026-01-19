import { Component, Injector, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { ProductServiceProxy, CreateProductDto } from '@shared/service-proxies/service-proxies';
import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
    templateUrl: './create-product-dialog.component.html',
    standalone: true,
    imports: [
        FormsModule,
        AbpModalHeaderComponent,
        AbpValidationSummaryComponent,
        AbpModalFooterComponent,
        LocalizePipe,
    ],
})
export class CreateProductDialogComponent extends AppComponentBase implements OnInit {
    @Output() onSave = new EventEmitter<any>();

    saving = false;
    product = new CreateProductDto();

    constructor(
        injector: Injector,
        public _productService: ProductServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.product.isAvailable = true;
    }

    save(): void {
        this.saving = true;

        this._productService.create(this.product).subscribe(
            () => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
            },
            () => {
                this.saving = false;
            }
        );
    }
}