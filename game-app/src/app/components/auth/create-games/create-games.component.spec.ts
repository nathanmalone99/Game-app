import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGamesComponent } from './create-games.component';

describe('CreateGamesComponent', () => {
  let component: CreateGamesComponent;
  let fixture: ComponentFixture<CreateGamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGamesComponent]
    });
    fixture = TestBed.createComponent(CreateGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
