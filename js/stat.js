var renderStatistics = function(ctx, names, times) {

  //вводим переменные, в дальнешем это могут быть передаваемые в функцию параметры
  var cloudX = 100; //позиция "облака" по горизонтали
  var cloudY = 10; //позиция "облака" по вериткали
  var cloudWidth = 420; //ширина "облака"
  var cloudHeight = 270; //высота "облака"
  var font = "16px PT Mono"; //размер и гарнитура шрифта
  var fontColor = "Black"; //цвет шрифта

  var columnMaxHeight = 150; //высота гистограммы (максимальная высота столбца)
  var graphicOffsetY = 100; //позиция диаграммы по Y
  var offsetXStart = 140; //позиция первого столбца по горизонтали
  var width = 40; //ширина столбца
  var offsetX = 50; //отступ между столбцами
  var alpha = function () {
    return 1 - 0.7 * Math.random(); //варируем прозрачность для изменения насыщенности цвета колонки в разумных пределах чтобы не получить прозрачный столбец
  }
  var currentColumnColor = 'rgba(255, 0, 0, 1)'; //цвет столбца для игрока "Вы"

  //сначала выводим тень нашего "облака" со смещением относительно самого облака, т.к. облако должно быть поверх тени
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; //цвет заливки тени
  ctx.fillRect(cloudX+10, cloudY+10, cloudWidth, cloudHeight);

  //вводим "облако"
  ctx.fillStyle = 'rgb(255,255,255)'; //цвет "облака"
  ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);

  //выводим текст
  ctx.font = font;
  ctx.fillStyle = fontColor;
  ctx.fillText("Ура вы победили!", 120, 40);
  ctx.fillText("Список результатов:", 120, 60);

  var startX = offsetXStart; //обозначаем начальную точку по X для отрисовки столбца, у первого он равен 140
  var startY = 0; //обозначаем начальную точку по Y для отрисовки столбца
  console.log(times);

  //переменная для максимального времени,
  //за первое значение возьмем первый элемент массива,
  //если следующее значение больше то перезапишем значение переменной
  var maxTime = Math.round(times[0]);

  //перебираем массив времени и рисуем колонки
  for (var j = 0; j < times.length; j++) {
    if(Math.round(maxTime) < Math.round(times[j])){
      maxTime = Math.round(times[j]);
    }
  }

  //переменная для высоты столбца
  var height = 0;
  var heightPx = 0;

  //перебираем массив имен и рисуем колонки
  for (var i = 0; i < names.length; i++) {
    if(i > 0){ //если не первый столбец то рисуем его от края с отступом в 140 + ширина + отступ
      startX = offsetXStart + width*i + offsetX*i;
    }

    //считаем высоту столбца
    height = (times[i] / maxTime) * 100; //высота в процентах
    heightPx = (columnMaxHeight * height) / 100;

    //считаем позицию столбца по Y
    startY = graphicOffsetY + (columnMaxHeight - heightPx);

    if(names[i] === "Вы"){ //меняем цвет столбца если текущий игрок "Вы"
      ctx.fillStyle = currentColumnColor;
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255,'+ alpha() +')';
    }
    ctx.fillRect(startX, startY, width, heightPx);

    //рисуем имена под столбцами
    ctx.font = font;
    ctx.fillStyle = fontColor;
    ctx.fillText(names[i], startX, graphicOffsetY + columnMaxHeight + 20);

    //рисуем результаты времени столбцами
    ctx.font = font;
    ctx.fillStyle = fontColor;
    ctx.fillText(Math.round(times[i]), startX, startY-10);
  }

}
