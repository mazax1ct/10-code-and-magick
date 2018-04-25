'use strict';
(function () {
  // перетаскивание артефактов
  var shopElement = document.querySelector('.setup-artifacts-shop'); // блок, откуда изначально берется артефакт
  var artifactsElement = document.querySelector('.setup-artifacts'); // блок, куда можно перетащить артефакт
  var draggedItem = null; // определяем переменную для перетаскиваемого объекта

  // функция обработчика начала перетаскивания
  var elementDragStartHandler = function (evt) {
    if (evt.target.parentElement.parentElement.className === 'setup-artifacts-shop') {
      if (evt.target.tagName.toLowerCase() === 'img') {
        draggedItem = evt.target.cloneNode();
        evt.dataTransfer.setData('text/plain', evt.target.alt);
      }
    } else {
      if (evt.target.tagName.toLowerCase() === 'img') {
        draggedItem = evt.target;
        evt.dataTransfer.setData('text/plain', evt.target.alt);
      }
    }
    artifactsElement.style.outline = '2px dashed red';
  };

  // функция обработчика конца перетаскивания
  var elementDragEndHandler = function () {
    artifactsElement.style.outline = '';
  };

  // навешиваем обработчики начала/конца перетаскивания на контейнер с аретфактами
  shopElement.addEventListener('dragstart', elementDragStartHandler);
  shopElement.addEventListener('dragend', elementDragEndHandler);

  artifactsElement.addEventListener('dragstart', elementDragStartHandler);
  artifactsElement.addEventListener('dragend', elementDragEndHandler);

  // навешиваем обработчик события нахождения элемента в зоне дропа
  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  // навешиваем обработчик на событие дропа
  artifactsElement.addEventListener('drop', function (evt) {
    // убираем желтый фон
    evt.target.style.backgroundColor = '';
    if (evt.target.childElementCount === 0 && evt.target.tagName.toLowerCase() === 'div') {
      evt.target.appendChild(draggedItem);
    }
    artifactsElement.style.outline = '';
    evt.preventDefault();
  });

  // навешиваем обработчики на событие вхождения/выхода из зоны дропа
  artifactsElement.addEventListener('dragenter', function (evt) {
    if (evt.target.childElementCount === 0 && evt.target.tagName.toLowerCase() === 'div') {
      evt.target.style.backgroundColor = 'yellow';
    } else {
      evt.target.style.backgroundColor = 'red';
    }
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
