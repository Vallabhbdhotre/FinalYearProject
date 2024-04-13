import { TestBed } from '@angular/core/testing';

import { DSInterceptor } from './ds.interceptor';

describe('DSInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DSInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DSInterceptor = TestBed.inject(DSInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
