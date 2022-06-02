"use strict";

const normalText = document.querySelector("#normalText");
const zalgoedText = document.querySelector("#zalgoedText");
const changeBtn = document.querySelector("#change");
const copyBtn = document.querySelector("#copy");
const sliderRange = document.querySelector("#mySlider");

chrome.storage.local
  .get(["targetIntensity"])
  .then(resp => resp.targetIntensity)
  .then(value => {
    console.log(value);

    sliderRange.value = value;
  });

async function zalgo() {
  const intensity = (await chrome.storage.local.get(["targetIntensity"]))
    .targetIntensity;

  const oldText = normalText.value;
  const newText = ZalgoModule.zalgoify(oldText, intensity);

  zalgoedText.innerHTML = newText;
}

sliderRange.addEventListener("change", () => {
  chrome.storage.local.set({ targetIntensity: sliderRange.value });
  zalgo();
});

// normalText.addEventListener("onkeyup", zalgo);
// changeBtn.addEventListener("onclick", zalgo);
normalText.onkeyup = changeBtn.onclick = zalgo;

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(zalgoedText.textContent);
});
