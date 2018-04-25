'use strict';
(function () {
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  // ищем блоки в разметке
  var eyesChanger = document.querySelector('.setup-wizard .wizard-eyes');
  var fireballChanger = document.querySelector('.setup-fireball-wrap');
  var eyeBlock = document.querySelector('.wizard-eyes');
  var eyeInput = document.querySelector('input[name="eyes-color"]');
  var fireballBlock = document.querySelector('.setup-fireball-wrap');
  var fireballInput = document.querySelector('input[name="fireball-color"]');

  // изменение цвета глаз волшебника
  eyesChanger.addEventListener('click', function () {
    var color = window.util.createRandomValue(window.sharedConstants.eyesColors);
    eyeBlock.style.fill = color;
    eyeInput.value = color;
  });

  // изменение цвета фаербола
  fireballChanger.addEventListener('click', function () {
    var color = window.util.createRandomValue(FIREBALL_COLORS);
    fireballBlock.style.backgroundColor = color;
    fireballInput.value = color;
  });
})();
