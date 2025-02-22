import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadDetallesTemplateComponent } from './actividad-detalles-template.component';

describe('ActividadDetallesTemplateComponent', () => {
  let component: ActividadDetallesTemplateComponent;
  let fixture: ComponentFixture<ActividadDetallesTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadDetallesTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadDetallesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
