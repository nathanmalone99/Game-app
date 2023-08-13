import { TestBed } from '@angular/core/testing';

import { AdminGamesService } from './admin-games.service';

describe('AdminGamesService', () => {
  let service: AdminGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
