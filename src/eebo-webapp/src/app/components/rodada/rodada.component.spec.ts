import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RodadaComponent } from './rodada.component';

describe('RodadaComponent', () => {
  let component: RodadaComponent;
  let fixture: ComponentFixture<RodadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RodadaComponent]
    });
    fixture = TestBed.createComponent(RodadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
