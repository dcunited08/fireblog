import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { FireblogAppComponent } from '../app/fireblog.component';

beforeEachProviders(() => [FireblogAppComponent]);

describe('App: Fireblog', () => {
  it('should create the app',
      inject([FireblogAppComponent], (app: FireblogAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'fireblog works!\'',
      inject([FireblogAppComponent], (app: FireblogAppComponent) => {
    expect(app.title).toEqual('fireblog works!');
  }));
});
