const getBookmarks = () => {
    const bookmarkTreeNodes = chrome.bookmarks.getSubTree('1938', (bookmarkTreeNodes) => {
      console.log(bookmarkTreeNodes);
          //$('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
      })
    };
  
  document.addEventListener('DOMContentLoaded', () => {
    getBookmarks();

    chrome.bookmarks.search('ПЛИТКИ', (bookmarkTreeNodes) => {
        console.log(bookmarkTreeNodes);
    })
  });