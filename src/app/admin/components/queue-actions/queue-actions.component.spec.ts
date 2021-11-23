import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueActionsComponent } from './queue-actions.component';

describe('QueueActionsComponent', () => {
  let component: QueueActionsComponent;
  let fixture: ComponentFixture<QueueActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
