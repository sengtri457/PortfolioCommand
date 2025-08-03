import { TestBed } from '@angular/core/testing';

import { ServicePortfolio } from './service-portfolio';

describe('ServicePortfolio', () => {
  let service: ServicePortfolio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePortfolio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
