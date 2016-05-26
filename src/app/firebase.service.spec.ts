import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { FirebaseService } from './firebase.service';

describe('Firebase Service', () => {
  beforeEachProviders(() => [FirebaseService]);

  it('should ...',
      inject([FirebaseService], (service: FirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
