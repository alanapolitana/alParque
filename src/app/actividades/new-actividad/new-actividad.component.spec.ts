import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewActividadComponent } from './new-actividad.component';

describe('NewActividadComponent', () => {
  let component: NewActividadComponent;
  let fixture: ComponentFixture<NewActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
