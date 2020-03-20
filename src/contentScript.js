import { SELECTORS } from './selectors';

chrome.runtime.onMessage.addListener(function(request, _, sendResponse) {
  if (request.action == 'get-changelog-info') {
    const linkBtn = document.querySelector(SELECTORS.LINK_BTN);
    linkBtn.click();

    const linkHref = document.querySelector(SELECTORS.LINK_HREF).innerText;
    const title = document.querySelector(SELECTORS.TITLE).innerText;
    sendResponse({linkHref, title});
  }
});
