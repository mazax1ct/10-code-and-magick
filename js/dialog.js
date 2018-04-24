'use strict';
(function () {
  // константы кодов кнопок для событий
  var ENTER_CODE = 13;
  var ESC_CODE = 27;

  // ищем блоки в разметке
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var dialogDragger = setup.querySelector('.setup-user-pic');

  // функция открытия попапа
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // функция закрытия попапа
  var closePopup = function () {
    setup.classList.add('hidden');
    setup.style.top = '';
    setup.style.left = '';
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

  // навешиваем обработчик на нажите мыши
  dialogDragger.addEventListener('mousedown', function (evt) {
    // отменяем события по умолчанию
    evt.preventDefault();

    // пишем начальные координаты в переменную
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // обработчик перемещения мыши
    var onMouseMove = function (moveEvt) {
      // отменяем события по умолчанию
      moveEvt.preventDefault();

      // считаем разницу между начальными координатами и точкой куда переместили блок
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // перезаписываем начальные координаты
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    // обработчик "отжатия" мыши
    var onMouseUp = function (upEvt) {
      // отменяем события по умолчанию
      upEvt.preventDefault();
      // удаляем обработчики событий с блока
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // подписываемся на события нажития мыши и "отжатия" мыши на окне
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
