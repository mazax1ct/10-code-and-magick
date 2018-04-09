var renderStatistics = function(ctx, names, times) {

  //вводим переменные для отрисовки облака
  var cloudX = 100; //позиция "облака" по горизонтали
  var cloudY = 10; //позиция "облака" по вериткали
  var cloudWidth = 420; //ширина "облака"
  var cloudHeight = 270; //высота "облака"
  var cloudColor = 'rgb(255,255,255)'; //цвет "облака"
  var cloudShadow = true; //наличие тени

  var font = "16px PT Mono"; //размер и гарнитура шрифта
  var fontColor = "Black"; //цвет шрифта

  //вводим переменные для отрисовки столбцов
  var columnMaxHeight = 150; //высота гистограммы (максимальная высота столбца)
  var graphicOffsetY = 100; //позиция диаграммы по Y
  var offsetXStart = 140; //позиция первого столбца по горизонтали
  var width = 40; //ширина столбца
  var offsetX = 50; //отступ между столбцами
  var alpha = function () {
    return 1 - 0.7 * Math.random(); //варируем прозрачность для изменения насыщенности цвета колонки в разумных пределах чтобы не получить прозрачный столбец
  }
  var currentColumnColor = 'rgba(255, 0, 0, 1)'; //цвет столбца для игрока "Вы"

  //функция отрисовки "облака" с тенью
  var cloudDraw = function (cloudX, cloudY, cloudWidth, cloudHeight, cloudColor, cloudShadow) {
    if(cloudShadow === true){
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(cloudX+10, cloudY+10, cloudWidth, cloudHeight);
    }

    ctx.fillStyle = cloudColor;
    ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);

    //выводим текст
    ctx.font = font;
    ctx.fillStyle = fontColor;
    ctx.fillText("Ура вы победили!", 120, 40);
    ctx.fillText("Список результатов:", 120, 60);

    return;
  }

  //функция получения максимального времени
  var getMaxTime = function () {
    //за начальное значение возьмем первый элемент массива, если следующее значение больше то перезапишем значение переменной
    var maxTime = Math.round(times[0]);

    //перебираем массив времени и определяем максимальное значение
    for (var j = 0; j < times.length; j++) {
      if(Math.round(maxTime) < Math.round(times[j])){
        maxTime = Math.round(times[j]);
      }
    }
    return maxTime;
  }

  //функция отрисовки столбцов
  var columnDraw = function (maxTime) {
    var startX = offsetXStart; //обозначаем начальную точку по X для отрисовки столбца, у первого он равен 140
    var startY = 0; //обозначаем начальную точку по Y для отрисовки столбца

    //переменные для высоты столбца
    var height = 0;
    var heightPx = 0;

    //перебираем массив имен и рисуем колонки
    for (var i = 0; i < names.length; i++) {
      //если не первый столбец то рисуем его от края с отступом в 140 + ширина + отступ
      startX = offsetXStart + width*i + offsetX*i;

      //считаем высоту столбца
      height = (times[i] / maxTime) * 100; //высота в процентах
      heightPx = (columnMaxHeight * height) / 100; //высота в px

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

  //вызов функции отрисовки "облака"
  cloudDraw(cloudX, cloudY, cloudWidth, cloudHeight, cloudColor, cloudShadow);

  //вызов функции отрисовки столбцов
  columnDraw(getMaxTime(times));
}
