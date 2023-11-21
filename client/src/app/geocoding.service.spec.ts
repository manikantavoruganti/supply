import { TestBed } from '@angular/core/testing';

import { GeocodingService } from './geocoding.service';

describe('GeocodingService', () => {
  let geo_service: GeocodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    geo_service = TestBed.inject(GeocodingService);
  });

  it('should be created', () => {
    expect(geo_service).toBeTruthy();
  });
});
