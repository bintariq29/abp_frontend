import { Component } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { LocalizePipe } from '@shared/pipes/localize.pipe';
import { HeroAppServicServiceProxy } from '@shared/service-proxies/service-proxies';


@Component({
  imports: [LocalizePipe],
  templateUrl: './heros.component.html',
  standalone: true,
  providers: [HeroAppServicServiceProxy],
  animations:[appModuleAnimation()]
})
export class HerosComponent {
  constructor(
    private _heroService: HeroAppServicServiceProxy
  ) {

  }

  createUser() {
  }

}
