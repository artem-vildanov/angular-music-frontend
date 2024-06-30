import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBaseComponent } from './public-base.component';

describe('PublicBaseComponent', () => {
  let component: PublicBaseComponent;
  let fixture: ComponentFixture<PublicBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
