'use strict';
(function () {
  // входные данные
  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var LAST_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var COATS_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var WIZARDS = 4;

  // создание массива похожих волшебников
  var generateWizards = function () {
    var wizards = [];
    for (var i = 0; i < WIZARDS; i++) {
      var wizard = {};
      wizard['name'] = window.util.createRandomValue(NAMES);
      wizard['surname'] = window.util.createRandomValue(LAST_NAMES);
      wizard['coat'] = window.util.createRandomValue(COATS_COLORS);
      wizard['eyes'] = window.util.createRandomValue(window.sharedConstants.eyesColors);
      wizards.push(wizard);
    }
    return wizards;
  };

  // работа с шаблоном
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // работа с фрагментом шаблона
  var fragment = document.createDocumentFragment();

  // функция создания фрагментов на основе сгененрированных ранее данных
  var drawWizard = function (wizards) {
    for (var i = 0; i < wizards.length; i++) {
      var wizardElement = wizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name + ' ' + wizards[i].surname;
      wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coat;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyes;
      fragment.appendChild(wizardElement);
    }
    return fragment;
  };

  drawWizard(generateWizards());

  // поиск списка похожих волшебников
  var wizardsList = document.querySelector('.setup-similar-list');

  // вставка фрагмента
  wizardsList.appendChild(fragment);

  // найдем и отобразим блок с похожими волшебниками
  var setupSimilar = document.querySelector('.setup-similar');

  setupSimilar.classList.remove('hidden');
})();
