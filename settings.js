//Global
let divSettingsShowed = false
const SETTINGS = {
    showId: false,
    selectID: false,
}

const getSettingsFromStore = () => {
    chrome.storage.sync.get(["SETTINGS"], (result) => {
        //console.log(result)
        //SETTINGS = result.SETTINGS
        const keys = Object.keys(result.SETTINGS)
        for (key of keys) {
            if (key != 'SETTINGS') {
                SETTINGS[key] = result.SETTINGS[key]
            }
        }
        //SETTINGS = Object.assign({}, result)
        console.log(SETTINGS)
    })
}
const setSettingsToStore = () => {
    chrome.storage.sync.set({"SETTINGS": SETTINGS});
}

const btnSettings = document.getElementById('btn-settings')
const divSettings = document.getElementById('div-settings')
const inpShowId = document.getElementById('showId')
const inpSelectID = document.getElementById('selectID')

btnSettings.addEventListener('click', () => {
    if (!divSettingsShowed) {
        divSettings.style.display='block'
        inpShowId.checked= SETTINGS.showId
        inpSelectID.checked= SETTINGS.selectID
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

getSettingsFromStore()