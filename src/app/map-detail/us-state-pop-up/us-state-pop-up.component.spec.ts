import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsStatePopUpComponent } from './us-state-pop-up.component';

describe('UsStatePopUpComponent', () => {
  let component: UsStatePopUpComponent;
  let fixture: ComponentFixture<UsStatePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsStatePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsStatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
