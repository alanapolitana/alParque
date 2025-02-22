import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParqueDetallesTemplateComponent } from './parque-detalles-template.component';

describe('ParqueDetallesTemplateComponent', () => {
  let component: ParqueDetallesTemplateComponent;
  let fixture: ComponentFixture<ParqueDetallesTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParqueDetallesTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParqueDetallesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
