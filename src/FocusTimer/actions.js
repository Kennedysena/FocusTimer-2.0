import state from "./state.js";
import * as timer from "./timer.js";
import * as elem from "./elements.js";
import * as sounds from "./sounds.js";
export function toggleRunning() {
  state.isRunning = document.documentElement.classList.toggle("running");
  timer.countdown();
  sounds.buttonPressAudio.play();
}

export function reset() {
  clearTimeout(state.countdownId);
  state.isRunning = false;
  document.documentElement.classList.remove("running");
  state.countdownId = null;
  timer.updateDisplay(state.minutes, state.seconds);
  sounds.buttonPressAudio.play();
  console.log("Reset - Timer stopped");
}
export function set() {
  elem.minutes.setAttribute("contenteditable", true);
  elem.minutes.focus();
}

export function plus() {
  let minutes = Number(elem.minutes.textContent);

  // Adiciona 5 minutos, se estiver no intervalo correto
  if (minutes % 5 === 0) {
    minutes += 5;
  } else {
    // Caso não esteja alinhado com múltiplos de 5, ajuste para o próximo múltiplo de 5
    minutes = Math.ceil(minutes / 5) * 5;
  }

  minutes = Math.min(minutes, 60); // Limita para 60 minutos no máximo

  // Se o temporizador estiver rodando, pare-o e reinicie com o novo valor
  if (state.isRunning) {
    reset(); // Para o temporizador atual
    state.minutes = minutes; // Atualiza o estado com o novo valor
    state.seconds = 0; // Reseta os segundos para 0
    timer.updateDisplay(state.minutes, state.seconds); // Atualiza a interface
    console.log(
      `Plus - Timer Restarted - Minutes: ${state.minutes}, Seconds: ${state.seconds}`
    );
    timer.countdown(); // Reinicia a contagem
    state.isRunning = true;
    document.documentElement.classList.remove("running");
  } else {
    // Se o temporizador não estiver rodando, apenas atualize o estado
    state.minutes = minutes;
    state.seconds = 0; // Reseta os segundos para 0
    timer.updateDisplay(state.minutes, state.seconds); // Atualiza a interface
  }
}

export function min() {
  let minutes = Number(elem.minutes.textContent);
  if (minutes <= 0) {
    reset(); 
  } else if (minutes % 5 === 0) {
    minutes -= 5; 
    if (minutes < 5) {
      minutes = 5; 
    }
  } else {
    minutes = Math.floor(minutes / 5) * 5; 
  }

  if (state.isRunning) {
    reset();
    state.minutes = minutes;
    state.seconds = 0;
    timer.updateDisplay(state.minutes, state.seconds);
    timer.countdown();
  } else {
    state.minutes = minutes;
    state.seconds = 0;
    timer.updateDisplay(state.minutes, state.seconds);
  }
}

export function pauseAllSounds() {
  sounds.buttonPressAudio.pause();
  sounds.forestAudio.pause();
  sounds.rainAudio.pause();
  sounds.coffeeMakerAudio.pause();
  sounds.fireplaceAudio.pause();

  document.querySelectorAll("#songs button").forEach((button) => {
    button.classList.remove("active");
  });
}

export function toggleMusic() {
  state.isMute = document.documentElement.classList.toggle("music-on");
  if (state.isMute) {
    sounds.forestAudio.play();
    return;
  }

  sounds.forestAudio.pause();
}

export function toggleMusicRain() {
  state.isMute = document.documentElement.classList.toggle("music-on");
  if (state.isMute) {
    sounds.rainAudio.play();
    return;
  }
  sounds.rainAudio.pause();
}

export function toggleMusicCoffeeMaker() {
  state.isMute = document.documentElement.classList.toggle("music-on");
  if (state.isMute) {
    sounds.coffeeMakerAudio.play();
    return;
  }
  sounds.coffeeMakerAudio.pause();
}

export function toggleMusicFireplace() {
  state.isMute = document.documentElement.classList.toggle("music-on");
  if (state.isMute) {
    sounds.fireplaceAudio.play();
    return;
  }
  sounds.fireplaceAudio.pause();
}
