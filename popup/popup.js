"use strict";

const normalText = document.querySelector("#normalText");
const zalgoedText = document.querySelector("#zalgoedText");
const changeBtn = document.querySelector("#change");
const sliderRange = document.querySelector("#mySlider");

async function zalgo() {
  const intensity = (await chrome.storage.local.get(["targetIntensity"]))
    .targetIntensity;

  console.log(intensity);
  const oldText = normalText.value;
  const newText = ZalgoModule.zalgoify(oldText, intensity);
  console.log(newText);

  zalgoedText.innerHTML = newText;
}

sliderRange.addEventListener("change", () => {
  chrome.storage.local.set({ targetIntensity: sliderRange.value });
  zalgo();
});

// normalText.addEventListener("onkeyup", zalgo);
// changeBtn.addEventListener("onclick", zalgo);
normalText.onkeyup = changeBtn.onclick = zalgo;
