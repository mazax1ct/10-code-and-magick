'use strict';

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

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARDS = 4;

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var ENTER_CODE = 13;

var ESC_CODE = 27;

// ищем блоки в разметке
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var eyesChanger = document.querySelector('.setup-wizard .wizard-eyes');
var fireballChanger = document.querySelector('.setup-fireball-wrap');

// функция открытия попапа
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// функция закрытия попапа
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// функция для обработчика нажатия Esc в открытом попапе
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    closePopup();
  }
};

// обработчик открытия попапа по клику
setupOpen.addEventListener('click', function () {
  openPopup();
});

// обработчик открытия попапа с клавиатуры
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    openPopup();
  }
});

// обработчик закрытия попапа с клавиатуры
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closePopup();
  }
});

// обработчик закрытия попапа по клику
setupClose.addEventListener('click', function () {
  closePopup();
});

// изменение цвета глаз волшебника
eyesChanger.addEventListener('click', function () {
  var color = createRandomValue(EYES_COLORS);
  var eyeBlock = document.querySelector('.wizard-eyes');
  var eyeInput = document.getElementsByName('eyes-color')[0];
  eyeBlock.style.fill = color;
  eyeInput.value = color;
});

// изменение цвета фаербола
fireballChanger.addEventListener('click', function () {
  var color = createRandomValue(FIREBALL_COLORS);
  var fireballBlock = document.querySelector('.setup-fireball-wrap');
  var fireballInput = document.getElementsByName('fireball-color')[0];
  fireballBlock.style.backgroundColor = color;
  fireballInput.value = color;
});

// генерация случайных данных
var createRandomValue = function (data) {
  return data[Math.floor(Math.random() * data.length)];
};

// создание массива похожих волшебников
var generateWizards = function () {
  var wizards = [];
  for (var i = 0; i < WIZARDS; i++) {
    var wizard = {};
    wizard['name'] = createRandomValue(NAMES);
    wizard['surname'] = createRandomValue(LAST_NAMES);
    wizard['coat'] = createRandomValue(COATS_COLORS);
    wizard['eyes'] = createRandomValue(EYES_COLORS);
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
