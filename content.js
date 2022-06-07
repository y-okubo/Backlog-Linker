window.onload = function () {
  if (window.navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
    return;
  }

  if (window.navigator.userAgent.toLowerCase().indexOf('safari') != -1) {
    var base = document.getElementsByClassName('ticket__key -has-button')[0];
    var div = document.createElement("div");
    var button = document.createElement("button");
    button.textContent = "Copy Rich Link";
    button.type = "button";
    button.id = "copy-rich-link";
    button.addEventListener("click", copyRichLink, false);
    div.appendChild(button);
    base.appendChild(div);
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == 'title') {
    if (document.URL.match("backlog.com")) {
      sendResponse(createBacklogTitle());
      return;
    }
    if (document.URL.match("github.com")) {
      sendResponse(createGitHubTitle());
      return;
    }
  }
});

function copyRichLink() {
  var anchor = document.createElement('a');
  anchor.href = document.URL;
  anchor.textContent = createBacklogTitle();

  navigator.clipboard.write([
    new ClipboardItem({
      "text/plain": Promise.resolve(anchor.outerHTML),
      "text/html": Promise.resolve(anchor.outerHTML),
    }),
  ]);
}

function createBacklogTitle() {
  return document.getElementsByClassName('ticket__key-number')[0].textContent + " " + document.getElementsByClassName('header-icon-set__summary')[0].getElementsByClassName('markdown-body')[0].textContent;
}

function createGitHubTitle() {
  return document.getElementsByClassName('js-issue-title markdown-title')[0].textContent;
}
