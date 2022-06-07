const title = document.getElementById("title");
const address = document.getElementById("address");

chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, tabs => {
  title.value = tabs[0].title;
  address.value = tabs[0].url;

  chrome.tabs.sendMessage(tabs[0].id, { message: 'title' }, function (text) {
    var anchor = document.createElement('a');
    anchor.href = tabs[0].url;
    anchor.textContent = text;

    function listener(e) {
      e.clipboardData.setData("text/html", anchor.outerHTML);
      e.clipboardData.setData("text/plain", anchor.outerHTML);
      e.preventDefault();
    }

    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);

    title.value = text;
    address.value = tabs[0].url;
  });
});
