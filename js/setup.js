'use strict';
var setup = document.querySelector('.setup');

setup.classList.remove('hidden');

// входные данные
var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var lastNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColor = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARDS = 4;

// генерация случайных данных
var createRandomValue = function (data) {
  return data[Math.floor(Math.random() * data.length)];
};

// создание массива похожих волшебников
var createObjects = function () {
  var wizards = [];
  for (var i = 0; i < WIZARDS; i++) {
    var wizard = {};
    wizard['name'] = createRandomValue(names);
    wizard['surname'] = createRandomValue(lastNames);
    wizard['coat'] = createRandomValue(coatColor);
    wizard['eyes'] = createRandomValue(eyesColor);
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

drawWizard(createObjects());

// поиск списка похожих волшебников
var wizardsList = document.querySelector('.setup-similar-list');

// вставка фрагмента
wizardsList.appendChild(fragment);

// найдем и отобразим блок с похожими волшебниками
var setupSimilar = document.querySelector('.setup-similar');

setupSimilar.classList.remove('hidden');
