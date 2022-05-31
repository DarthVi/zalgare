"use strict";

const intensity = (async function () {
  return (await chrome.storage.local.get(["targetIntensity"])).targetIntensity;
})();

// const script = document.createElement("script");
// script.setAttribute("type", "text/javascript");
// script.setAttribute("src", "./zalgoFunc.js");
// document.body.appendChild(script);

function createHTMLElement(element, selection, newHTML) {
  const range = selection.getRangeAt(0);
  range.deleteContents();
  const el = document.createElement(element);
  el.innerHTML = newHTML;
  range.insertNode(el);
}

function transform() {
  const selectedText = window.getSelection();

  if (!selectedText) return;

  const textString = selectedText.toString();

  const newText = ZalgoModule.zalgoify(textString, intensity);

  const html = newText;

  createHTMLElement("span", selectedText, html);
}
// transform();
