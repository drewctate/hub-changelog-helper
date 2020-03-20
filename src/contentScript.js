chrome.runtime.onMessage.addListener(function(request, _, sendResponse) {
  if (request.action == 'get-changelog-info') {
    const linkBtn = document.querySelector('.tau-copylink__trigger__text');
    linkBtn.click();

    const linkHref = document.querySelector('.tau-copylink__link').innerText;
    const title = document.querySelector('.view-header__entity-title').innerText;
    sendResponse({linkHref, title});
  }
});
