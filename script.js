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

 const removeDialogBk = () => {
     const bkDialog = document.querySelector('.bk-dialog')
     if (bkDialog) bkDialog.remove()
 } 

 document.addEventListener('click', (evt) => {
    removeDialogBk() 
    }, 
    true)
 
const actionClickSpan = (evt) => {
    const divBKContener = document.createElement('div')
    divBKContener.classList.add('bk-dialog')
    divBKContener.style.left = evt.clientX+'px'
    divBKContener.style.top = evt.clientY+'px'

    document.body.appendChild(divBKContener)

    const bk = evt.target.parentElement.children[0].children
    for(elem of bk) {
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

const renderBk = (bkTreeNodesChild, divContener) => {
    const index = (divContener.children.length > 0) ? bkTreeNodesChild.index : 0
    //const delitel = index.toString.length*10
    //const colorInd= index < 10 ? index : index/delitel
    const colorInd = Math.round(Math.random()*10)

    const divBK = document.createElement('div')
    divBK.setAttribute('url', bkTreeNodesChild.url)
    divBK.classList.add('bk')
    divBK.style.backgroundColor = `var(--bg-color${colorInd})`
    divBK.textContent = getTitleShort(bkTreeNodesChild.url)

    if (index > 3 ) divBK.style.display='none'

    divBK.addEventListener('click', (evt) => actionClickBk(evt))

    divContener.appendChild(divBK)
}
const renderSpan = (title, divContener) => {
    const span = document.createElement('div')
    span.classList.add('title')
    span.textContent= title

    span.addEventListener('click', (evt) => actionClickSpan(evt))

    divContener.appendChild(span)
}
const renderInputCheck = (id, divContener, checked=false) => {
    const inputCheck = document.createElement('input')
    inputCheck.setAttribute('type', 'checkbox')
    inputCheck.setAttribute('neme', 'inputCheck')
    inputCheck.setAttribute('id', id)
    inputCheck.checked = checked

    divContener.appendChild(inputCheck)

    inputCheck.addEventListener('click', (evt) => {
        SETTINGS.startNodeId = +evt.target.id
        setSettingsToStorage()
    })
}
const renderContenerBkContener = (bkTreeNodesChild, divContener) => {
    const contenerBkContener = document.createElement('div')
    contenerBkContener.classList.add('contener-bk-contener')
    divContener.appendChild(contenerBkContener)

    const divBKContener = document.createElement('div')
    divBKContener.classList.add('bk-contener')
    contenerBkContener.appendChild(divBKContener)

    if (!bkTreeNodesChild.children) {
        renderBk(bkTreeNodesChild, divBKContener)
    }

    renderSpan(bkTreeNodesChild.title, contenerBkContener)

    if (SETTINGS.showId) {
        renderSpan(bkTreeNodesChild.id, contenerBkContener)
    }
    if (SETTINGS.selectID) {
        renderInputCheck(bkTreeNodesChild.id, contenerBkContener)
    }
    return divBKContener
}
//Обход дерева главная
const readNodeRecurcive= (bkTreeNodes, divContener) => {
    for (bkTreeNodesChild of bkTreeNodes.children) {
        
        if (bkTreeNodesChild.children) {
            //здесь рекурсивно создаются блоки куда уже будут вложены закладки
            divBKContener = renderContenerBkContener(bkTreeNodesChild, divContener)

            //Рекурсия
            readNodeRecurcive(bkTreeNodesChild, divBKContener)
        } else {
            if (divContener.classList[0] == 'contener') {
                //тут мы создаем контейнер если у нас закладка без папки
                divBKContener = renderContenerBkContener(bkTreeNodesChild, divContener)

            } else { 
                //тут вывод самих конечных закладок
                renderBk(bkTreeNodesChild, divContener)
            }
        }
    }
}

const getBookmarks = () => {
    const startNodeId = SETTINGS.startNodeId
    if (startNodeId != 0) {
        chrome.bookmarks.getSubTree(startNodeId, (startTreeNodes) => {
            const bkContener = document.getElementById('bookmarks')
            readNodeRecurcive(startTreeNodes[0], bkContener)
        })
    } 
    else {
        chrome.bookmarks.getTree((startTreeNodes) => {
            const bkContener = document.getElementById('bookmarks')
            readNodeRecurcive(startTreeNodes[0].children[0], bkContener)
            //console.log(startTreeNodes[0])
        })
    }
    
}

getSettingsFromStorage()
getBookmarks()

// setTimeout(() => {
//     getBookmarks()
// }  
//     , 1000)
// while (true) {
//     if (loadedSettings) {
//     getBookmarks()
//     break
//     }
// }  

