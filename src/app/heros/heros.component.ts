import { Component } from '@angular/core';
import { FormsModule } from '@node_modules/@angular/forms';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { LocalizePipe } from '@shared/pipes/localize.pipe';
import { HeroAppServicServiceProxy } from '@shared/service-proxies/service-proxies';


@Component({
  imports: [LocalizePipe , FormsModule],
  templateUrl: './heros.component.html',
  standalone: true,
  providers: [HeroAppServicServiceProxy],
  animations: [appModuleAnimation()]
})
export class HerosComponent {
  keyword='';
  advancedFiltersVisible=true;
  constructor(
    private _heroService: HeroAppServicServiceProxy
  ) {

  }

  createUser() {
    this._heroService
  }

  list(): void {
    alert(this.keyword)


  }


  // list(event?: LazyLoadEvent): void {
  //     if (this.primengTableHelper.shouldResetPaging(event)) {
  //         this.paginator.changePage(0);

  //         if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
  //             return;
  //         }
  //     }

  //     this.primengTableHelper.showLoadingIndicator();

  //     this._userService
  //         .getAll(
  //             this.keyword,
  //             this.isActive,
  //             this.primengTableHelper.getSorting(this.dataTable),
  //             this.primengTableHelper.getSkipCount(this.paginator, event),
  //             this.primengTableHelper.getMaxResultCount(this.paginator, event)
  //         )
  //         .pipe(
  //             finalize(() => {
  //                 this.primengTableHelper.hideLoadingIndicator();
  //             })
  //         )
  //         .subscribe((result: UserDtoPagedResultDto) => {
  //             this.primengTableHelper.records = result.items;
  //             this.primengTableHelper.totalRecordsCount = result.totalCount;
  //             this.primengTableHelper.hideLoadingIndicator();
  //             this.cd.detectChanges();
  //         });
  // }

}
