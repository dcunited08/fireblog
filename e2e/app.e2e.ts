import { FireblogPage } from './app.po';

describe('fireblog App', function() {
  let page: FireblogPage;

  beforeEach(() => {
    page = new FireblogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('fireblog works!');
  });
});
