'use strict';
(function () {
  window.renderStatistics = function (ctx, names, times) {
    // вводим переменные для отрисовки облака
    var CLOUD_X = 100; // позиция "облака" по горизонтали
    var CLOUD_Y = 10; // позиция "облака" по вериткали
    var CLOUD_WIDTH = 420; // ширина "облака"
    var CLOUD_HEIGHT = 270; // высота "облака"
    var CLOUD_COLOR = 'rgb(255,255,255)'; // цвет "облака"

    var FONT = '16px PT Mono'; // размер и гарнитура шрифта
    var FONT_COLOR = 'Black'; // цвет шрифта

    // вводим переменные для отрисовки столбцов
    var COLUMN_MAXHEIGHT = 150; // высота гистограммы (максимальная высота столбца)
    var GRAPHIC_OFFSET_Y = 100; // позиция диаграммы по Y
    var COLUMN_START_X = 140; // позиция первого столбца по горизонтали
    var COLUMN_WIDTH = 40; // ширина столбца
    var COLUMN_OFFSET_X = 50; // отступ между столбцами
    var COLUMN_COLOR = 'rgba(255, 0, 0, 1)'; // цвет столбца для игрока "Вы"

    // функция отрисовки "облака" с тенью
    var cloudDraw = function () {
      // рисуем тень
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(CLOUD_X + 10, CLOUD_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);

      // рисуем "облако"
      ctx.fillStyle = CLOUD_COLOR;
      ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

      // выводим текст
      ctx.font = FONT;
      ctx.fillStyle = FONT_COLOR;
      ctx.fillText('Ура вы победили!', 120, 40);
      ctx.fillText('Список результатов:', 120, 60);

      return;
    };

    // функция получения максимального времени
    var getMaxTime = function () {
      // за начальное значение возьмем первый элемент массива, если следующее значение больше то перезапишем значение переменной
      var maxTime = Math.round(times[0]);

      // перебираем массив времени и определяем максимальное значение
      for (var j = 0; j < times.length; j++) {
        if (Math.round(maxTime) < Math.round(times[j])) {
          maxTime = Math.round(times[j]);
        }
      }
      return maxTime;
    };

    // функция отрисовки столбцов
    var columnDraw = function (maxTime) {
      var startX = COLUMN_START_X; // обозначаем начальную точку по X для отрисовки столбца, у первого он равен 140
      var startY = 0; // обозначаем начальную точку по Y для отрисовки столбца

      // переменные для высоты столбца
      var height = 0;
      var heightPx = 0;

      // перебираем массив имен и рисуем колонки
      for (var i = 0; i < names.length; i++) {
        // если не первый столбец то рисуем его от края с отступом в 140 + ширина + отступ
        startX = COLUMN_START_X + COLUMN_WIDTH * i + COLUMN_OFFSET_X * i;

        // считаем высоту столбца
        height = (times[i] / maxTime) * 100; // высота в процентах
        heightPx = (COLUMN_MAXHEIGHT * height) / 100; // высота в px

        // считаем позицию столбца по Y
        startY = GRAPHIC_OFFSET_Y + (COLUMN_MAXHEIGHT - heightPx);

        if (names[i] === 'Вы') { // меняем цвет столбца если текущий игрок "Вы"
          ctx.fillStyle = COLUMN_COLOR;
        } else {
          ctx.fillStyle = 'rgba(0, 0, 255,' + window.util.alpha() + ')';
        }
        ctx.fillRect(startX, startY, COLUMN_WIDTH, heightPx);

        // рисуем имена под столбцами
        ctx.font = FONT;
        ctx.fillStyle = FONT_COLOR;
        ctx.fillText(names[i], startX, GRAPHIC_OFFSET_Y + COLUMN_MAXHEIGHT + 20);

        // рисуем результаты времени столбцами
        ctx.font = FONT;
        ctx.fillStyle = FONT_COLOR;
        ctx.fillText(Math.round(times[i]), startX, startY - 10);
      }
    };

    // вызов функции отрисовки "облака"
    cloudDraw();

    // вызов функции отрисовки столбцов
    columnDraw(getMaxTime(times));
  };
})();
