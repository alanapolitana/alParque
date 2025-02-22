import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImcTemplateComponent } from './imc-template.component';

describe('ImcTemplateComponent', () => {
  let component: ImcTemplateComponent;
  let fixture: ComponentFixture<ImcTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImcTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImcTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
