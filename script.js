const getBookmarks = () => {
    const bookmarkTreeNodes = chrome.bookmarks.getSubTree('1938', (arBookmarkTreeNodes) => {
      console.log(arBookmarkTreeNodes);
      const bkContener = document.getElementById('bookmarks');

      for (const bkTreeNodes of arBookmarkTreeNodes) {
          for (const childbkTreeNodes of bkTreeNodes.children) {
              divBKContener = createDivBkContener(childbkTreeNodes);

              bkContener.appendChild(divBKContener);
          }
      }

          //$('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
      })
    }

const createDivBkContener = (bkTreeNodes) => {
    const divBKContener = document.createElement('div')
    divBKContener.classList.add('bk-contener')

    const divBK = document.createElement('div')
    divBK.classList.add('bk')
    divBK.textContent = bkTreeNodes.title

    divBKContener.appendChild(divBK)

    return divBKContener
}


document.addEventListener('DOMContentLoaded', () => {
    getBookmarks();

    chrome.bookmarks.search('ПЛИТКИ', (bookmarkTreeNodes) => {
        console.log(bookmarkTreeNodes);
    })
  })
