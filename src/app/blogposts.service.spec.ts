import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { BlogpostsService } from './blogposts.service';

describe('Blogposts Service', () => {
  beforeEachProviders(() => [BlogpostsService]);

  it('should ...',
      inject([BlogpostsService], (service: BlogpostsService) => {
    expect(service).toBeTruthy();
  }));
});
