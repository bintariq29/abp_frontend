import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LazyLoadEvent, PrimeTemplate } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { LocalizePipe } from '@shared/pipes/localize.pipe';
import { HeroAppServicServiceProxy, HeroDto } from '@shared/service-proxies/service-proxies';


@Component({
  imports: [LocalizePipe, FormsModule, PaginatorModule, PrimeTemplate],
  templateUrl: './heros.component.html',
  standalone: true,
  providers: [HeroAppServicServiceProxy],
  animations: [appModuleAnimation()]
})
export class HerosComponent extends PagedListingComponentBase<HeroDto> {
  protected delete(entity: HeroDto): void {
    throw new Error('Method not implemented.');
  }
  keyword = '';
  advancedFiltersVisible = false;

  constructor(

    private _heroService: HeroAppServicServiceProxy,
    injector: Injector,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }



  createUser() {
    this._heroService
  }

  list(event?: LazyLoadEvent): void {
    alert(this.keyword)


  }

  refresh(): void {

  }



}
