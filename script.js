const getBookmarks = () => {
    const bookmarkTreeNodes = chrome.bookmarks.getTree( (bookmarkTreeNodes) => {
      console.log(bookmarkTreeNodes);
          //$('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
      })
    };
  
  document.addEventListener('DOMContentLoaded', () => {
    getBookmarks();
  });