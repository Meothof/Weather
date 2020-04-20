import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlaceWeatherOverviewComponent } from './place-weather-overview.component';

describe('PlaceWeatherOverviewComponent', () => {
  let component: PlaceWeatherOverviewComponent;
  let fixture: ComponentFixture<PlaceWeatherOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceWeatherOverviewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceWeatherOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
