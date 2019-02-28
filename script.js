const createDivBkContener = (bkTreeNodes, divContener) => {
    for (bkTreeNodesChild of bkTreeNodes.children) {
        if (bkTreeNodesChild.children) {
            const contenerBkContener = document.createElement('div')
            contenerBkContener.classList.add('contener-bk-contener')
            divContener.appendChild(contenerBkContener)

            const divBKContener = document.createElement('div')
            divBKContener.classList.add('bk-contener')
            contenerBkContener.appendChild(divBKContener)

            const span = document.createElement('span')
            span.textContent= bkTreeNodesChild.title
            contenerBkContener.appendChild(span)

            createDivBkContener(bkTreeNodesChild, divBKContener)
        } else {

            if (divContener.classList[0] == 'contener') {
                const divBKContener = document.createElement('div')
                divBKContener.classList.add('bk-contener')
                divContener.appendChild(divBKContener)
                
                const divBK = document.createElement('div')
                divBK.classList.add('bk')
                divBK.textContent = bkTreeNodesChild.title

                divBKContener.appendChild(divBK)
            } else {
                const divBK = document.createElement('div')
                divBK.classList.add('bk')
                divBK.textContent = bkTreeNodesChild.title

                divContener.appendChild(divBK)
            }

            // const aLink = document.createElement('a')
            // aLink.setAttribute('href', bkTreeNodesChild.url)
            // aLink.textContent= bkTreeNodesChild.title
            // contenerBkContener.appendChild(aLink)
        }
    }

}

const getBookmarks = () => {
    chrome.bookmarks.getSubTree('1938', (startTreeNodes) => {

      const bkContener = document.getElementById('bookmarks');

      //for (const bkTreeNodes of arBookmarkTreeNodes) {
          //for (const childbkTreeNodes of startTreeNodes[0].children) {
            // bkContener.classList.add('bk-contener')
            // bkContener.textContent = childbkTreeNodes.title

            createDivBkContener(startTreeNodes[0], bkContener);

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
