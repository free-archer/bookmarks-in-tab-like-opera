const createDivBkContener = (bkTreeNodes, divContener) => {
    for (bkTreeNodesChild of bkTreeNodes.children) {
        if (bkTreeNodesChild.children) {
            const divBKContener = document.createElement('div')
            divBKContener.classList.add('bk-contener')
            divBKContener.textContent = bkTreeNodesChild.title
            createDivBkContener(bkTreeNodesChild, divBKContener)
        } else {
            const divBK = document.createElement('div')
            divBK.classList.add('bk')
            divBK.textContent = bkTreeNodesChild.title

            divContener.appendChild(divBK)
            return divContener
        }
    }

}

const getBookmarks = () => {
    chrome.bookmarks.getSubTree('1938', (startTreeNodes) => {

      const bkContener = document.getElementById('bookmarks');

      //for (const bkTreeNodes of arBookmarkTreeNodes) {
          //for (const childbkTreeNodes of startTreeNodes[0].children) {
              divBKContener = createDivBkContener(startTreeNodes[0], bkContener);

              //bkContener.appendChild(divBKContener);
          //}
      //}

          //$('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
      })
    }




document.addEventListener('DOMContentLoaded', () => {
    getBookmarks();

    // chrome.bookmarks.search('ПЛИТКИ', (bookmarkTreeNodes) => {
    //     console.log(bookmarkTreeNodes);
    // })
  })
