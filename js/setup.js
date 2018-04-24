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

  // ищем блоки в разметке
  var eyesChanger = document.querySelector('.setup-wizard .wizard-eyes');
  var fireballChanger = document.querySelector('.setup-fireball-wrap');
  var eyeBlock = document.querySelector('.wizard-eyes');
  var eyeInput = document.querySelector('input[name="eyes-color"]');
  var fireballBlock = document.querySelector('.setup-fireball-wrap');
  var fireballInput = document.querySelector('input[name="fireball-color"]');

  // изменение цвета глаз волшебника
  eyesChanger.addEventListener('click', function () {
    var color = createRandomValue(EYES_COLORS);
    eyeBlock.style.fill = color;
    eyeInput.value = color;
  });

  // изменение цвета фаербола
  fireballChanger.addEventListener('click', function () {
    var color = createRandomValue(FIREBALL_COLORS);
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

  // перетаскивание артефактов
  var shopElement = document.querySelector('.setup-artifacts-shop'); // блок, откуда изначально берется артефакт
  var artifactsElement = document.querySelector('.setup-artifacts'); // блок, куда можно перетащить артефакт
  var draggedItem = null; // определяем переменную для перетаскиваемого объекта

  // функция обработчика начала перетаскивания
  var elementDragStartHandler = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    artifactsElement.style.outline = '2px dashed red';
  };

  var elementDragEndHandler = function () {
    artifactsElement.style.outline = '';
  };

  // навешиваем обработчики начала перетаскивания на аретфакт в зависимости от того где он находится
  shopElement.addEventListener('dragstart', elementDragStartHandler);
  artifactsElement.addEventListener('dragstart', elementDragStartHandler);

  // навешиваем на документ обработчик слушающий завершение перетаскивания
  document.addEventListener('dragend', elementDragEndHandler);

  // навешиваем обработчик на событие нахождения элемента в зоне дропа
  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  // навешиваем обработчик на событие дропа
  artifactsElement.addEventListener('drop', function (evt) {
    // убираем желтый фон
    evt.target.style.backgroundColor = '';
    // проверяем есть ли в блоке "дети"
    if (evt.target.childElementCount === 0) {
      // копируем перетаскиваемый элемент и вставляем
      var copy = draggedItem.cloneNode();
      evt.target.appendChild(copy);
      // убираем возможность перетаскивать скопированный элемент
      copy.setAttribute('draggable', false);
    }
    evt.preventDefault();
  });

  // навешиваем обработчик на событие вхождения в зону дропа
  artifactsElement.addEventListener('dragenter', function (evt) {
    if (evt.target.childElementCount === 0 && evt.target.tagName.toLowerCase() !== 'img') {
      evt.target.style.backgroundColor = 'yellow';
    }
    evt.preventDefault();
  });

  // навешиваем обработчик на событие выхода из зоны дропа
  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
