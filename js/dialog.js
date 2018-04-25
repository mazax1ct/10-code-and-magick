'use strict';
(function () {
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
    window.util.isEscEvent(evt, closePopup);
  };

  // обработчик открытия попапа по клику
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  // обработчик открытия попапа с клавиатуры
  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  // обработчик закрытия попапа с клавиатуры
  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  // обработчик закрытия попапа по клику
  setupClose.addEventListener('click', function () {
    closePopup();
  });

  // драг/дроп диалога
  window.drag(setup, dialogDragger);
})();
