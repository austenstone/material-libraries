import { TestBed } from '@angular/core/testing';

import { MaterialIconListService } from './material-icon-list.service';

describe('MaterialIconListService', () => {
  let service: MaterialIconListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialIconListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
