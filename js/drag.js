'use strict';
(function () {
  // item - что перемещаем
  // itemDragger - за какой элемент перемещаем
  window.drag = function (item, itemDragger) {
    // навешиваем обработчик на нажите мыши
    itemDragger.addEventListener('mousedown', function (evt) {
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

        item.style.top = (item.offsetTop - shift.y) + 'px';
        item.style.left = (item.offsetLeft - shift.x) + 'px';
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
  };
})();
