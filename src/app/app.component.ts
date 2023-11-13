import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemReorderEventDetail, ModalController, Platform } from '@ionic/angular';
import { Observable, Subscription, firstValueFrom, lastValueFrom, map, take, takeLast } from 'rxjs';
import { IPlace } from './interfaces/place';
import { SearchPlaceComponent } from './place/search-place/search-place.component';
import { PlaceService } from './services/place.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  protected places: IPlace[] = [];
  private places$: Observable<IPlace[]>;
  private subscription?: Subscription;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private placeService: PlaceService,
  ) {
    this.places$ = this.streamSortedPlaces();
  }

  public ngOnInit(): void {
    this.streamPlaces();
    this.loadFirstAvailablePlace();
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private streamSortedPlaces(): Observable<IPlace[]> {
    return this.placeService.streamSavedPlaces().pipe(
      map(placesRecord => Object.values(placesRecord).sort((a, b) => {
        if (a.order != null && b.order != null) {
          return a.order.toString().localeCompare(b.order.toString());
        }
        return a.name.localeCompare(b.name);
      })),
    )
  }

  private streamPlaces() {
    this.subscription = this.places$.subscribe(placesRecord => {
      this.places = Object.values(placesRecord).sort((a, b) => {
        if (a.order != null && b.order != null) {
          return a.order.toString().localeCompare(b.order.toString());
        }
        return a.name.localeCompare(b.name);
      })
    })
  }

  private async loadFirstAvailablePlace() {
    const places = await firstValueFrom(this.places$);
    if (places.length > 0) {
      this.router.navigate(['place/weather-overview', places[0].id]);
    }
  }

  public async openSearch() {
    const modal = await this.modalController.create({
      component: SearchPlaceComponent
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  public async reorderSavedPlaces(ev: CustomEvent<ItemReorderEventDetail>) {
    const { from, to } = ev.detail;
    const original = this.places[from];
    const destination = this.places[to];
    await this.placeService.updatePlace(original.id, { order: to });
    await this.placeService.updatePlace(destination.id, { order: from });
    ev.detail.complete();
  }

  public trackPlaceById(index: number, place: IPlace) {
    return place.id;
  }

}
