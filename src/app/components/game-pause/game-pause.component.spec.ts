import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePauseComponent } from './game-pause.component';

describe('GamePauseComponent', () => {
  let component: GamePauseComponent;
  let fixture: ComponentFixture<GamePauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamePauseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
