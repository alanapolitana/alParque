import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsidePublicitarioComponent } from './aside-publicitario.component';

describe('AsidePublicitarioComponent', () => {
  let component: AsidePublicitarioComponent;
  let fixture: ComponentFixture<AsidePublicitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsidePublicitarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsidePublicitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
