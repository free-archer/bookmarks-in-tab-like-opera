'use strict'

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    chrome.tabs.create({
    url: `chrome-extension://${chrome.runtime.id}/index.html`
  });
    console.log(chrome.runtime.id);
});
