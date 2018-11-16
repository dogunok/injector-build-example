"use strict";

function start() {
  var qs = function qs(selector) {
    return document.querySelector(selector);
  };

  var moveFantomasZone = function moveFantomasZone() {
    var btn = qs('.zone-coordonnees .zone-fantomas');
    var parent = qs('.zoneCTA');
    parent.insertAdjacentElement('afterbegin', btn);
  };

  Kameleoon.API.runWhenElementPresent('.zone-coordonnees .zone-fantomas', moveFantomasZone);
}

var check_Kameleoon = setInterval(function () {
  if (typeof Kameleoon !== 'undefined') {
    clearInterval(check_Kameleoon);
    start();
  }
}, 100);