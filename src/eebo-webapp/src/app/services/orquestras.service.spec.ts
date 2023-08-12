import { TestBed } from '@angular/core/testing';

import { OrquestrasService } from './orquestras.service';

describe('OrquestrasService', () => {
  let service: OrquestrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrquestrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
