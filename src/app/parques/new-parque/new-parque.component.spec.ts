import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParqueComponent } from './new-parque.component';

describe('NewParqueComponent', () => {
  let component: NewParqueComponent;
  let fixture: ComponentFixture<NewParqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewParqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewParqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
