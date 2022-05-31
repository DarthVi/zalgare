"use strict";

const ZalgoModule = (function () {
  const range = n => [...Array(n).keys()];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const getDiacritical = function () {
    let diacriticals = [];
    let char = 0x300;
    while (char <= 0x36f) {
      diacriticals.push(String.fromCharCode(char));
      char += 0x001;
    }

    return diacriticals;
  };

  const diacriticals = getDiacritical();

  //   console.log(diacriticals);

  function* zalgo() {
    const diac_length = diacriticals.length;
    while (true) {
      const randnum = getRandomInt(diac_length);
      yield diacriticals[randnum];
    }
  }

  function zalgoify(str, intensity) {
    let newText = str.split("").map(function (c) {
      const zalgoGen = zalgo();
      if (c == " ") return c;
      for (let i = 0; i < intensity; i++) {
        const zalgoOut = zalgoGen.next().value;
        c += zalgoOut;
      }
      return c;
    });

    newText = newText.join("");
    return newText;
  }

  return { zalgoify };
})();
