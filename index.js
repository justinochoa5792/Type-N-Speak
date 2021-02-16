// Init Speech Api
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  //   Loop through Voices
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.textContent = voice.name + "(" + voice.lang + ")";

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speech
const speak = () => {
  if (synth.speaking) {
    console.error("Already speaking");
    return;
  }

  if (textInput.value !== "") {
    // Add background animation
    body.style.background = "#141414 url(img/wave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";

    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // Speech End
    speakText.onend = (e) => {
      console.log("Done Speaking...");
      body.style.background = "#141414";
    };

    // Speech Error
    speakText.onerror = (e) => {
      console.error("Something is wrong");
    };
    // Voice Select
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    // Loop through voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });
    //  Set Pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // Speak
    synth.speak(speakText);
  }
};

// Event Listener
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate Change
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));

// Pitch
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener("change", (e) => speak());
