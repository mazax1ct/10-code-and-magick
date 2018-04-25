'use strict';
(function () {
  // константы кодов кнопок для событий
  var ENTER_CODE = 13;
  var ESC_CODE = 27;

  window.util = {
    // варируем прозрачность для изменения насыщенности цвета в разумных пределах чтобы не получить прозрачный элемент
    alpha: function () {
      return 1 - 0.7 * Math.random();
    },
    // генерация случайных данных
    createRandomValue: function (data) {
      return data[Math.floor(Math.random() * data.length)];
    },
    // проверка нажатия Esc
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_CODE) {
        action();
      }
    },
    // проверка нажатия Enter
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_CODE) {
        action();
      }
    }
  };
})();
