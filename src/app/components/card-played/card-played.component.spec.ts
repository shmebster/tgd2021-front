import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPlayedComponent } from './card-played.component';

describe('CardPlayedComponent', () => {
  let component: CardPlayedComponent;
  let fixture: ComponentFixture<CardPlayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPlayedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
