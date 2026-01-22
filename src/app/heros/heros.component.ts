import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, PrimeTemplate } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { LocalizePipe } from '@shared/pipes/localize.pipe';
import { HeroAppServicServiceProxy, HeroDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { TableModule } from 'primeng/table';


@Component({
  imports: [LocalizePipe, FormsModule, PaginatorModule, TableModule,
  ],
  templateUrl: './heros.component.html',
  standalone: true,
  providers: [HeroAppServicServiceProxy,],
  animations: [appModuleAnimation()]
})
export class HerosComponent extends AppComponentBase implements OnInit {
  protected delete(entity: HeroDto): void {
    throw new Error('Method not implemented.');
  }
  keyword = '';
  advancedFiltersVisible = false;
  heros: any[] = [];

  constructor(

    private _heroService: HeroAppServicServiceProxy,
    private _cd: ChangeDetectorRef,
    injector: Injector,
  ) {
    super(injector);
  }
  ngOnInit(): void {

    this.getHeros();
  }

  getHeros() {
    this._heroService.getAllHeros().subscribe((result) => {
      this.heros = result.items;
      this._cd.detectChanges();
    })
  }

  createHero() {

  }

  deleteHero(hero: any): void {
    abp.message.confirm(
      this.l('Hero Delete Warning Message', hero.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._heroService.deleteHeroByEmailId(hero.emailId).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.getHeros();
          });
        }
      }
    );
  }







}
