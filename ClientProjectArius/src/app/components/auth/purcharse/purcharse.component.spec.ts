import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurcharseComponent } from './purcharse.component';

describe('PurcharseComponent', () => {
  let component: PurcharseComponent;
  let fixture: ComponentFixture<PurcharseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurcharseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurcharseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
