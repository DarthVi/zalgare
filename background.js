"use strict";

import transform from "./contextScript.js";

let defaultIntensity = 10;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ targetIntensity: defaultIntensity });
  console.log(`Default target language: ${defaultIntensity}`);
});

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "slctm",
    contexts: ["selection"],
    title: "Zalgoify selection",
  });
});

chrome.contextMenus.onClicked.addListener((_, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: transform,
  });
});
