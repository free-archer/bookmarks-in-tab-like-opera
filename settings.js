//Global
let divSettingsShowed = false
const SETTINGS = {
    showId: false,
    selectID: false,
    startNodeId: 0
}

const btnSettings = document.getElementById('btn-settings')
const divSettings = document.getElementById('div-settings')
const inpShowId = document.getElementById('showId')
const inpSelectID = document.getElementById('selectID')
const inpNodeId = document.getElementById('startNodeId')
const btnClear = document.getElementById('btn-clear')

const getSettingsFromStore = () => {
    chrome.storage.sync.get(["SETTINGS"], (result) => {
        const keys = Object.keys(result.SETTINGS)
        for (key of keys) {
            if (key != 'SETTINGS') {
                SETTINGS[key] = result.SETTINGS[key]
            }
        }
    })
}
const setSettingsToStore = () => {
    chrome.storage.sync.set({"SETTINGS": SETTINGS});
}

btnSettings.addEventListener('click', () => {
    if (!divSettingsShowed) {
        divSettings.style.display='block'
        inpShowId.checked= SETTINGS.showId
        inpSelectID.checked= SETTINGS.selectID
        inpNodeId.value = SETTINGS.startNodeId
    } 
    else  {
        divSettings.style.display='none'
        } 

    divSettingsShowed = !divSettingsShowed
})

inpShowId.addEventListener('click', (evt) => {
    SETTINGS.showId = evt.target.checked
    setSettingsToStore()
})
inpSelectID.addEventListener('click',(evt) => {
    SETTINGS.selectID = evt.target.checked
    setSettingsToStore()
})

btnClear.addEventListener('click', () => {
    SETTINGS.startNodeId= 0
    inpNodeId.value = SETTINGS.inpNodeId
    setSettingsToStore()
})