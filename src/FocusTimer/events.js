import { controls } from "./elements.js";
import { songs } from "./elements.js";
import * as actions from "./actions.js";
import * as elem from "./elements.js";
import { updateDisplay } from "./timer.js";
import state from "./state.js";
import { pauseAllSounds } from "./actions.js";
export function registerControls() {
  controls.addEventListener("click", (event) => {
    const action = event.target.dataset.action;
    if (typeof actions[action] != "function") {
      return;
    }

    actions[action]();
  });
}

export function registerSongs() {
  songs.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    const action = event.target.dataset.action;
    if (typeof actions[action] != "function") {
      return;
    }
    pauseAllSounds();
    actions[action]();

    if (state.isMute) {
      button.classList.add("active");
      return;
    }
  });
}

// events está sendo tudo observado ao clicar nos botões

export function setMinutes() {
  elem.minutes.addEventListener("focus", () => {
    elem.minutes.textContent = "";
  });
  elem.minutes.onkeypress = (event) => /\d/.test(event.key);

  elem.minutes.addEventListener("blur", (event) => {
    let timer = event.currentTarget.textContent;
    timer = timer > 60 ? 60 : timer;

    state.minutes = timer;
    state.seconds = 0;

    updateDisplay();
    elem.minutes.removeAttribute("contenteditable");
  });
}
