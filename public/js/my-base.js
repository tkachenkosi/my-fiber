// выполнение скриптов после загрузки страницы
document.addEventListener("DOMContentLoaded", function(event) { 
    console.log("Загрузка страницы выполнена")

    document.onmouseup = function() {
        // var e = document.querySelector('.mypopup1')
        // e.style.display = 'none'

        document.querySelector('.mypopup1').style.display = 'none'
    }
  
    // document.getElementById("btn_googl").onclick = function() {
    //   id("btn_googl").onclick = function() {
    //       console.log("Проверка работы кнопки googl (событие назначено автоматически)");
    //   }
  
    //   id("btn_store").onclick = test_local_store;  
    // com.onmouseup = function(e) {console.log("==>"); set_select(this);};

    // var com = document.querySelectorAll(".com");
    // for (i = 0; i < com.length; i++) {
    //   com[i].onmouseup = set_select(com[i]);
    //   console.log("===>",i,com[i])
    // }

    // console.log("window.innerHeight",window.innerHeight)    // размер видимой части окна
    // console.log("document.documentElement.clientHeight",document.documentElement.clientHeight)
    // console.log("document.body.clientHeight",document.body.clientHeight)
    // console.log("getCoords(el).bottom",getCoords(el).bottom)
    // console.log("window.pageYOffset",window.pageYOffset)
    // console.log("сколько осталась до низа",window.innerHeight - (getCoords(el).bottom - window.pageYOffset))
    // console.log("1высота меню",getCoords(m).bottom - getCoords(m).top)

    // console.log("2высота меню",getCoords(m).bottom - getCoords(m).top)


// document.querySelector('.bnav').onclick = function(this) {
//     console.log("Проверка")
//     var m = document.getElementById('nav2');
//     var el = document.getElementById(this);
//     m.style.display = (m.style.display == '' || m.style.display == 'none') ? 'block' : 'none';
//     m.style.top=getCoords(el).bottom + "px";
//     m.style.left=getCoords(el).left + "px";
//     return false;
// };

});
  
var tid = "???";

// 1) Получаете элементы через querySelectorAll
// 2) Преобразуете в массив - Array.prototype.slice.call(result)
// 3) Идете циклом forEach и вешаете обработчик на каждый элемент 
// var but = document.querySelectorAll('div > .click');
// for (var b in but)
// but[b].onclick = function(){
//   var father = this.parentNode;
//   var a = father.querySelector('h2').innerHTML;
//   document.querySelector('div#modal input').value = a;
// };



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

// обрабатываем нажатия кнопок onclick="myFunction(this)"
function myFunction(btn) {
    console.log('Кнопка:', btn);  
    console.log('Кнопка:', btn.name);  
    console.log('Кнопка:', btn.id);  
    btn.name="test";    // изменили имя так как передается по ссылки

};

// **** управление страницей ****


// управление меню-слайдером 
function aside1() {
    var root = qu(':root');
    var rootStyles = getComputedStyle(root);    // для того чтобы прочитать переменную
    // прочитать переменную
    // var span = rootStyles.getPropertyValue('--span');
    // var mainColor = rootStyles.getPropertyValue('--color-main');
    // console.log("Значение переменной "+mainColor) 
    // console.log("Проверка работы aside1") 

    // if (qu(".nav").style.display=="none") {
    if (rootStyles.getPropertyValue('--span')=="0px") {
        // qu(".nav").style.display="block"
        root.style.setProperty("--span", "140px");
        // root.style.setProperty("--del-span", );
    }
    else {
        root.style.setProperty("--span", "0px");
        // qu(".nav").style.display="none";
        // root.style.setProperty("--main-span", 12);
    }
}

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

// запросить страницу с подборкой цвета
function test6(e) {
    set_select(e)
    myAjaxHtml("/color1", {}, function(data) {
        squ(".main", data);
    });
}

// вызов модального окна
function test_modal() {
    qu(':root').style.setProperty("--wondows_login-width", "500px");
    id("modal-1").checked="true";
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

// вызов модального окна для авторизации
function modal_login1() {
    qu(':root').style.setProperty("--wondows_login-width", "290px")
    // id("muser").value=""
    id("mpass").value=""
    id("modal-login1").checked=true
}

// проверить логин и параль
function login1() {
    myAjax("/login1", {login:id("muser").value ,pass:id("mpass").value}, function(data) {
        // console.log(data.fname,"result",data.result)
        if (data.result != 1) {
            // показать сообщение об ошибки
            sid("fname", "---")
            qu(".modal .err-login").style.visibility="visible"
        } else {
            // .match(/[\ ]/g).length;
            qu(".modal .err-login").style.visibility="hidden"
            a = data.fname.split(' ')
            if (a.length>2) {
                sid("fname",a[0]+' '+a[1].charAt(0)+'.'+a[2].charAt(0)+'.')
            } else {
                sid("fname",a[0]+' '+a[1].charAt(0)+'.')
            };
            // закрыть окно
            id("modal-login1").checked=false
        }
    })
}

// регистрация пользователя на сайте
function reg1(e) {
    // id("muser").value=""
    // id("mpass").value=""
    // id("pemaill").style.display="block"      // block,inline, none

    id("modal-login1").checked=false

    set_select(e)
    myAjaxHtml("/reg1", {}, function(data) {
        squ(".main", data)
    });
}

// выполнить регистрацию пользователя
function reg2(e) {
    var p1 = id("mpass1").value
    var p2 = id("mpass2").value
    var l = id("mlogin").value
    var f = id("mfname").value
    var m = id("memaill").value

    if (p1 == p2 && !isEmpty(l) && !isEmpty(f) && !isEmpty(m)) {
        // console.log("вызов myAjax",l,f,m)
        myAjax("/reg2", {login:l,fname:f,emaill:m,adr:id("madr").value,tel:id("mtel").value,pass:p1}, function(data) {
            if (data.id >0) {
                // console.log("успешное создание пользователя")
                qu(".reg .err-login").style.visibility="hidden"
                qu(".reg .err-reg").style.visibility="hidden"
                sid("fname", fio(data.fname))
                // загрузить главную страницу
                // test5(e)
                // set_select(e)
                myAjaxHtml("/main2", {}, function(data) {
                    squ(".main", data)
                })
            } else {
                // показать сообщение об ошибки
                // console.log("ошибка создание пользователя")
                qu(".reg .err-login").style.visibility="visible"
                qu(".reg .err-reg").style.visibility="visible"
                squ(".reg .err-reg","Такой логин уже существует")
            }
        })
    } else {
        // console.log("заполнены не все поля")
        qu(".reg .err-reg").style.visibility="visible"
        squ(".reg .err-reg","Ошибка ввода пароля или заполнены не все поля")
        qu(".reg .err-login").style.visibility="hidden"
        // qu(".reg .err-login").style.visibility="visible"
    }
}


// закрыть модальное окно для авторизации
function close_login1() {
    id("modal-login1").checked=false
    // qu("#modal-1").checked="true"
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
    // myAjax("/main3", {id: 9009,rem:"проверка предач json на сервер от клиента"}, function(data) {
    myAjaxStor("/main3", sessionStorage.getItem("key3"), function(data) {
        console.log("main3 ->",data);
        console.log("main3 ->", data.code, data.name, data.sum);
        squ("#testjson", data.tid+" "+data.code+" "+data.name);
        tid = data.tid;
    });
};


// обмен массивом json
function main4() {
    var value
    console.log("main4 ->"); 
    myAjax("/main4", {tid:tid,id: 9009,rem:"проверка предач json на сервер от клиента"}, function(data) {

        sid("testjson", "id:"+data[0].id+" code:"+data[0].code+" - "+data[0].name+" - "+data[0].adr+"<br>"+
          "id:"+data[2].id+" code:"+data[2].code+" - "+data[2].name+" - "+data[2].adr);

        for (var i = 0; i < data.length; ++i) {
            console.log("main4 ->", data[i].name, data[i].adr);

            // сохраняем настройки в sessionStogage
            sessionStorage.setItem("key"+i, JSON.stringify(data[i]));

        };
        // squ("#testjson", data[2].id, data[2].name, data[2].adr);
    
    });
};

// страница для работы с кадрами
function kadry(e) {
    set_select(e)
    myAjaxHtml("/kadry", {}, function(data) {
        squ(".main", data)
    });

}
// меню действий для строки таблици кадров
function kadry_pup1() {
    // var m = document.getElementById("pup1").dataset.id;
    var m = sessionStorage.getItem("pup2")      // kadry.id
    console.log("popup sessionStorage",m)
    return false
}
// загрузить таблицу кадры
function kadry1() {
    limit = sessionStorage.getItem("kadry1_limit")
    offset = sessionStorage.getItem("kadry1_offset")
    myAjaxHtml("/kadry1", {limit:limit,offset:offset}, function(data) {
        // sessionStorage.setItem("kadry1_limit", limit)
        // sessionStorage.setItem("kadry1_offset", offset)
        sid("body_kadry1", data)
    })
}
function kadry10() {
    sessionStorage.setItem("kadry1_limit", 6)
    sessionStorage.setItem("kadry1_offset", 0)
    kadry1()
}
// следующие записи
function kadry12() {
    limit = sessionStorage.getItem("kadry1_limit")
    offset = sessionStorage.getItem("kadry1_offset")
    offset = Number(offset) + Number(limit)
    sessionStorage.setItem("kadry1_limit", limit)
    sessionStorage.setItem("kadry1_offset", offset)
    kadry1()
}
// предыдущие записи
function kadry13() {
    limit = sessionStorage.getItem("kadry1_limit")
    offset = sessionStorage.getItem("kadry1_offset")
    offset = Number(offset) - Number(limit)
    sessionStorage.setItem("kadry1_limit", limit)
    sessionStorage.setItem("kadry1_offset", offset)
    kadry1()
}
