const btn = document.getElementById("btn");
btn.addEventListener("click", function() {
    chrome.tabs.create({
    url: `chrome-extension://${chrome.runtime.id}/index.html`
  });
    console.log(chrome.runtime.id);
});
