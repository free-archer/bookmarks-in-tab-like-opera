function rand(){
    var c=parseInt(Math.random()*255).toString(16);
    return (""+c).length==1?'0'+c:c;
}    
const randomColor = () => {
        var c='#'+rand()+rand()+rand();
        alert(c);
 }

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
            span.classList.add('title')
            span.textContent= bkTreeNodesChild.title.substring(0, 20)
            contenerBkContener.appendChild(span)

            createDivBkContener(bkTreeNodesChild, divBKContener)
        } else {
            if (divContener.classList[0] == 'contener') {
                const contenerBkContener = document.createElement('div')
                contenerBkContener.classList.add('contener-bk-contener')
                contenerBkContener.classList.add('tile')
                divContener.appendChild(contenerBkContener)
    
                const divBKContener = document.createElement('div')
                divBKContener.classList.add('bk-contener')
                contenerBkContener.appendChild(divBKContener)
    
                const divBK = document.createElement('div')
                divBK.classList.add('bk')
                divBK.style.backgroundColor='var(--bg-color3)'
                divBK.textContent = bkTreeNodesChild.title
                divBKContener.appendChild(divBK)
    
                const span = document.createElement('span')
                span.classList.add('title')
                span.textContent= bkTreeNodesChild.title.substring(0, 20)
                contenerBkContener.appendChild(span)
            } else {
                const divBK = document.createElement('div')
                divBK.classList.add('bk')
                divBK.textContent = bkTreeNodesChild.title

                divContener.appendChild(divBK)
            }
        }
    }

}

const getBookmarks = () => {
    chrome.bookmarks.getSubTree('1938', (startTreeNodes) => {
      const bkContener = document.getElementById('bookmarks')

            createDivBkContener(startTreeNodes[0], bkContener)

      })
    }




document.addEventListener('DOMContentLoaded', () => {
    getBookmarks()

    // chrome.bookmarks.search('ПЛИТКИ', (bookmarkTreeNodes) => {
    //     console.log(bookmarkTreeNodes);
    // })
  })
