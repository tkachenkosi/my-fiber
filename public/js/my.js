// выполнение скриптов после загрузки страницы
document.addEventListener("DOMContentLoaded", function(event) { 
    console.log("Загрузка страницы выполнена")


});
  
var tid = "???";



// *** служебные функции ***
// выбор по селектору или по id
var qu = function(e) {
    return document.querySelector(e);
};
var id = function(e) {
    return document.getElementById(e);
};
// установить занчение
var squ = function(e,s) {
    document.querySelector(e).innerHTML=s;
};
var sid = function(e,s) {
    document.getElementById(e).innerHTML=s;
};

// получение абсолютных кординат с учетом скрола
function getCoords(el) { // кроме IE8-
    var box = el.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      bottom: box.bottom + pageYOffset,
      right: box.right + pageXOffset
    };
};

// уневерсальное меню
function myPop(e) {
    console.log("Проверка")
    var m = document.getElementById('nav2');
    // var e = document.getElementById('bn1');
   
    // создать меню но не показывать, чтобы вычислить размеры
    m.style.display = (m.style.display == '' || m.style.display == 'none') ? 'block' : 'none';
    m.style.left=getCoords(e).left + "px";

    var h1 = getCoords(m).bottom - getCoords(m).top                                 // высота меню
    var h2 = window.innerHeight - (getCoords(e).bottom - window.pageYOffset)   // сколько осталось до низа окна
    var x1 = getCoords(m).right - getCoords(m).left                                 // ширина меню
    var x2 = window.innerWidth - (getCoords(e).right - window.pageXOffset)      // сколько осталось до правого края

    if (h1<=h2) {
        m.style.top=getCoords(e).bottom + "px";     // меню в низ
    } else {
        m.style.top = (getCoords(e).top - h1) + "px";        // меню в верх
    }

    if (x1>x2) {
        m.style.left = (getCoords(e).left - x1 + (getCoords(e).right-getCoords(e).left)) + "px";        // меню в лево
    }

    // console.log("2высота меню",getCoords(m).bottom - getCoords(m).top)
    m.style.visibility="visible";   // отоброзить меню
    return false;
};

// уневерсальное меню popup - название списка
function myPup(e,popup) {
    var m = document.getElementById(popup);
   
    // создать меню но не показывать, чтобы вычислить размеры
    m.style.display = (m.style.display == '' || m.style.display == 'none') ? 'block' : 'none';

    if (m.style.display == 'block') {
        m.style.left=getCoords(e).left + "px";

        var h1 = getCoords(m).bottom - getCoords(m).top                                 // высота меню
        var h2 = window.innerHeight - (getCoords(e).bottom - window.pageYOffset)   // сколько осталось до низа окна
        var x1 = getCoords(m).right - getCoords(m).left                                 // ширина меню
        var x2 = window.innerWidth - (getCoords(e).right - window.pageXOffset)      // сколько осталось до правого края

        if (h1<=h2) {
            m.style.top=getCoords(e).bottom + "px";     // меню в низ
        } else {
            m.style.top = (getCoords(e).top - h1) + "px";        // меню в верх
        }
        
        if (x1>x2) {
            m.style.left = (getCoords(e).left - x1 + (getCoords(e).right-getCoords(e).left)) + "px";        // меню в лево
        }

        // сохроняем id для использования в функции обработки из popup (используем sessionStorage или атрибут data-)
        // m.dataset.id = e.dataset.id
        sessionStorage.setItem(popup, e.dataset.id);
        // console.log("e.dataset.id=",e.dataset.id)
        m.style.visibility="visible";   // отоброзить меню
    }
    return false;
};


// мой универсальный ajax без преоброзования возврат json 
// b уже в формате строки удобно при чтении стороджей и передачей на сервер
function myAjaxStor(url,b,cback) {
    fetch(url, {
        method: 'post',
        headers: {"Content-type": "application/json; charset=UTF-8"}, 
        body: b
    }).then(function(response) { 
        if (response.status !== 200) {  
            console.log('Проблема! Status Code: ' + response.status);  
            return;
        };
        return response.json();
    }).then(function(data) {
        cback(data);
    }).catch(function (error) {  
        console.log('Request ошибка:', error);  
    });
};

// мой универсальный ajax возврат json
function myAjax(url,b,cback) {
    fetch(url, {
        method: 'post',
        headers: {"Content-type": "application/json; charset=UTF-8"}, 
        body: JSON.stringify(b)
    }).then(function(response) { 
        if (response.status !== 200) {  
            console.log('Проблема! Status Code: ' + response.status);  
            return;
        };
        return response.json();     // конвертируем ответ в json
    }).then(function(data) {
        cback(data);                // а вот и наши данные в формате json
    }).catch(function (error) {  
        console.log('Request myAjax ошибка:', error);  
    });
};

// мой универсальный ajax возврат html
// headers: {"Content-type": "text/html; charset=UTF-8"}, 
function myAjaxHtml(url,b,cback) {
    fetch(url, {
        method: 'post',
        headers: {"Content-type": "application/json; charset=UTF-8"}, 
        body: JSON.stringify(b)
    }).then(function(response) { 
        if (response.status !== 200) {  
            console.log('Проблема! Status Code: ' + response.status);  
            return;
        };
        return response.text()      // возврать в формате html
    }).then(function(data) {
        cback(data);
    }).catch(function (error) {  
        console.log('Request ошибка:', error);  
    });
};


// **** прикладные функции ****


function test1() {
    // window.innerWidth/innerHeight
    console.log("Проверка работы js, ширина окна "+document.documentElement.clientWidth) 
}

// показать кусок страници шрифтов
function test3(e) {
    set_select(e)
    myAjaxHtml("/fnt2", {}, function(data) {
        squ(".main", data);
    });
}



// показать главное окно
function test4(e) {
    set_select(e)
    myAjaxHtml("/main1", {idf:9}, function(data) {
        squ(".main", data);
    });
}

// показать фрагмент из шаблона
function test5(e) {
    set_select(e)
    myAjaxHtml("/main2", {}, function(data) {
        squ(".main", data);
    });
}


function fio(obj) {
    a = obj.split(' ')
    if (a.length>2) {
        return a[0]+' '+a[1].charAt(0)+'.'+a[2].charAt(0)+'.'
    } else {
        return a[0]+' '+a[1].charAt(0)+'.'
    }
}

function isEmpty(obj) {
    if(typeof(obj) == 'undefined' || obj === null || obj === '') {
        return true
    } else {
        return false
    }
}


// проверка универсальной функции
cb=function callback(data) {
    console.log("это вызов из моей callback - печатаем полученные данные от сервера:"); 
    // console.log(data); 
    // console.log(data.Name);
    squ(".main", data);
};

// чтение сторадж и передача данных
function test2(e) {
    console.log("test2"); 
    // var m = JSON.parse(sessionStorage.getItem("key1"));
    set_select(e)
    myAjaxHtml("/main2", JSON.parse(sessionStorage.getItem("key2")), function(data){
        squ(".main", data);
    });
};


// обмен одним json
function main3() {
    var value
    console.log("main3 ->"); 
    myAjax("/main3", {id: 9009,rem:"проверка предач json на сервер от клиента",sum: 81055.00}, function(data) {
    // myAjaxStor("/main3", sessionStorage.getItem("key3"), function(data) {
        console.log("main3 ->",data);
        console.log("main3 ->", data.code, data.name, data.sum);
        squ("#result", data.code+" "+data.name);
        // tid = data.tid;
    });
};


// обмен массивом json
function kadryj() {
    var value
    console.log("kadryj ->"); 
    myAjax("/kadryj", {tid:tid,id: 1019,rem:"проверка предач json kadryj",sum: 5155.00}, function(data) {

        sid("result", "id:"+data[0].id+" code:"+data[0].code+" - "+data[0].name+" - "+data[0].adr+"<br>"+
          "id:"+data[2].id+" code:"+data[2].code+" - "+data[2].name+" - "+data[2].adr);

        for (var i = 0; i < data.length; ++i) {
            console.log("kadryj ->", data[i].name, data[i].adr);

            // сохраняем настройки в sessionStogage
            // sessionStorage.setItem("key"+i, JSON.stringify(data[i]));

        };
        // squ("#testjson", data[2].id, data[2].name, data[2].adr);
    
    });
};

// страница для работы с кадрами
function kadry(e) {
//    set_select(e)
    //
    console.log("kadry ->");

    myAjaxHtml("/kadry", {}, function(data) {
        squ("#kadry", data)
    });

}
