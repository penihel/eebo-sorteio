import { TestBed } from '@angular/core/testing';

import { RodadaService } from './rodada.service';

describe('RodadaService', () => {
  let service: RodadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RodadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
