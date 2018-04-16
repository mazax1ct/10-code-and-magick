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

// генерация случайных данных
var createRandomValue = function (data) {
  return data[Math.floor(Math.random() * data.length)];
};

// создание массива похожих волшебников
var createObjects = function (wizardsNames, wizardsLastNames, wizardsCoatColor, wizardsEyesColor) {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    var wizard = {};
    wizard['name'] = createRandomValue(wizardsNames);
    wizard['surname'] = createRandomValue(wizardsLastNames);
    wizard['coat'] = createRandomValue(wizardsCoatColor);
    wizard['eyes'] = createRandomValue(wizardsEyesColor);
    wizards.push(wizard);
  }
  return wizards;
};
// для удобства работы присвоим переменной значение вызываемой с параметрами функции
var wizards = createObjects(names, lastNames, coatColor, eyesColor);

// найдем и отобразим блок с похожими волшебниками
var setupSimilar = document.querySelector('.setup-similar');

setupSimilar.classList.remove('hidden');

// поиск списка похожих волшебников
var wizardsList = document.querySelector('.setup-similar-list');

// работа с шаблоном
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// работа с фрагментом шаблона
var fragment = document.createDocumentFragment();

// функция создания фрагментов на основе сгененрированных ранее данных
var drawWizard = function (elements) {
  for (var i = 0; i < wizards.length; i++) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = elements[i].name + elements[i].surname;
    wizardElement.querySelector('.wizard-coat').style.fill = elements[i].coat;
    wizardElement.querySelector('.wizard-eyes').style.fill = elements[i].eyes;
    fragment.appendChild(wizardElement);
  }
  return fragment;
};

drawWizard(wizards);

// вставка фрагмента
wizardsList.appendChild(fragment);
