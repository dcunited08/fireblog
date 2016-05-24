export class FireblogPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('fireblog-app h1')).getText();
  }
}
