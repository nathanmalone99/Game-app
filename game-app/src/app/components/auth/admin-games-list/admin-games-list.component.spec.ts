import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGamesListComponent } from './admin-games-list.component';

describe('AdminGamesListComponent', () => {
  let component: AdminGamesListComponent;
  let fixture: ComponentFixture<AdminGamesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGamesListComponent]
    });
    fixture = TestBed.createComponent(AdminGamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
