import { Component } from '@angular/core';
import { LocalizePipe } from '@shared/pipes/localize.pipe';
import { HeroAppServicServiceProxy } from '@shared/service-proxies/service-proxies';


@Component({
  imports: [LocalizePipe],
  templateUrl: './heros.component.html',
  standalone: true,
  providers: [HeroAppServicServiceProxy],
})
export class HerosComponent {
  constructor(
    private _heroService: HeroAppServicServiceProxy
  ) {

  }

  createUser() {
  }

}
