 const getTitle = (url) => {
    //const text = url.match(/:\/\/.*\.\w{1,3}\//)[0].slice(3,-1)
    const start = url.search(/:\/\//)+3
    const temp = url.substring(start)
    const end = temp.search(/\//)

    return temp.substring(0, end)
 }
 const getTitleShort = (url) => {
    //const text = url.match(/:\/\/.*\.\w{1,3}\//)[0].slice(3,-1)
    const start = url.search(/:\/\//)+3
    const temp = url.substring(start)
    const end = temp.search(/\./)
    return temp.substring(0, end)
 }

 const actionClickBk = (evt) => {
    evt.preventDefault();
    const url = evt.target.getAttribute('url')
    window.open(url).focus();
 }

 const actionClickContener = (evt) => {
    console.log(evt.target.children)

    const bkContener = document.getElementById('bookmarks')

    const divBKContener = document.createElement('div')
    divBKContener.classList.add('bk-dialog')
    divBKContener.style.left = evt.clientX+'px'
    divBKContener.style.top = evt.clientY+'px'
    console.log(evt.clientX)
    console.log(evt.clientY)
    //bkContener.appendChild(divBKContener)    
    document.body.appendChild(divBKContener)

    const bk = evt.target.children
    for(elem of bk) {
        console.log(elem)
        const url = elem.getAttribute('url')
        const title = elem.textContent

        const divBK = document.createElement('div')
        divBK.setAttribute('url', url)
        divBK.classList.add('bk')
        divBK.style.backgroundColor = `var(--bg-color1)`
        divBK.textContent = title

        divBK.addEventListener('click', (evt) => actionClickBk(evt))

        divBKContener.appendChild(divBK)

    }
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
                    divBK.textContent = getTitleShort(bkTreeNodesChild.url)

                    divBK.addEventListener('click', (evt) => actionClickBk(evt))

                    divContener.appendChild(divBK)

                    divContener.addEventListener('click', (evt) => actionClickContener(evt))
                }
            }
        }
    }

}

const getBookmarks = () => {
    //1938
    chrome.bookmarks.search('PLIT', (bookmarkTreeNodes) => {
        console.log(bookmarkTreeNodes);
    
        const startNode = bookmarkTreeNodes[0].id

    chrome.bookmarks.getSubTree(startNode, (startTreeNodes) => {
      const bkContener = document.getElementById('bookmarks')

            createDivBkContener(startTreeNodes[0], bkContener)

      })
    })
    }

    // chrome.bookmarks.getTree((startTreeNodes) => {
    //     const bkContener = document.getElementById('bookmarks')
  
    //           createDivBkContener(startTreeNodes[0], bkContener)
  
    //     })
    //   }
  



document.addEventListener('DOMContentLoaded', () => {
    getBookmarks()
  })
