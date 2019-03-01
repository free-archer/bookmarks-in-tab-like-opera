 const getTitle = (url) => {
    //const text = url.match(/:\/\/.*\.\w{1,3}\//)[0].slice(3,-1)
    const start = url.search(/:\/\//)+3
    const temp = url.substring(start)
    //const end = temp.search(/\//)
    const end = temp.search(/\./)
    //const end = url.search(/\.\w{1,3}\//)+4

    return temp.substring(0, end)
 }

 const actionClickBk = (evt) => {
    evt.preventDefault();
    const url = evt.target.getAttribute('url')
    window.open(url).focus();
 }
const createDivBkContener = (bkTreeNodes, divContener) => {
    for (bkTreeNodesChild of bkTreeNodes.children) {
        const index = bkTreeNodesChild.index
        const delitel = index.toString.length*10
        const colorInd= index < 10 ? index : index/delitel

        if (bkTreeNodesChild.children) {
            //здесь рекурсивно создаются блоки куда уже будут вложены закладки
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
            //if (index > 4 ) break

            if (divContener.classList[0] == 'contener') {
                //тут мы создаем контейнер если у нас закладка без папки
                const contenerBkContener = document.createElement('div')
                contenerBkContener.classList.add('contener-bk-contener')
                contenerBkContener.classList.add('tile')
                divContener.appendChild(contenerBkContener)
    
                const divBKContener = document.createElement('div')
                divBKContener.classList.add('bk-contener')
                contenerBkContener.appendChild(divBKContener)
    
                const divBK = document.createElement('div')
                divBK.setAttribute('url', bkTreeNodesChild.url)
                divBK.classList.add('bk')
                divBK.style.backgroundColor = `var(--bg-color${colorInd})`
                divBK.textContent = getTitle(bkTreeNodesChild.url)
                divBKContener.appendChild(divBK)

                divBK.addEventListener('click', (evt) => actionClickBk(evt))
    
                const span = document.createElement('span')
                span.classList.add('title')
                span.textContent= bkTreeNodesChild.title.substring(0, 20)
                contenerBkContener.appendChild(span)
            } else { 
                //тут вывод самих конечных закладок
                if (index < 4 ) {
                    const divBK = document.createElement('div')
                    divBK.setAttribute('url', bkTreeNodesChild.url)
                    divBK.classList.add('bk')
                    divBK.style.backgroundColor = `var(--bg-color${colorInd})`
                    divBK.textContent = getTitle(bkTreeNodesChild.url)

                    const smallSpan = document.createElement('p')
                    smallSpan.classList.add('smallSpan')
                    smallSpan.textContent= bkTreeNodesChild.url
                    divBK.appendChild(smallSpan)

                    divBK.addEventListener('click', (evt) => actionClickBk(evt))

                    divContener.appendChild(divBK)
                }
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
