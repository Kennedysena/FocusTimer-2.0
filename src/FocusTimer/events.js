import { controls } from './elements.js';
import { songs } from './elements.js';
import * as actions from './actions.js'
export function registerControls() {
    controls.addEventListener("click", (event) => {
       const action = event.target.dataset.action;
        if (typeof actions[action] != "function") {
            return
        }
        
        actions[action]()
    })

   
}

export function registerSongs() {
    songs.addEventListener("click", (event) => {
        console.log(event.target.dataset.action)
        const action = event.target.dataset.action;
        if (action === undefined) {
            return
        }
    })
    
}

// events está sendo tudo observado ao clicar nos botões