import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidAnswerNotificationComponent } from './valid-answer-notification.component';

describe('ValidAnswerNotificationComponent', () => {
  let component: ValidAnswerNotificationComponent;
  let fixture: ComponentFixture<ValidAnswerNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidAnswerNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidAnswerNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
