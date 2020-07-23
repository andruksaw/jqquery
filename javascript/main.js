/* 
    напечатать текст
*/
function typing(el) {
    let text = $(el).text()
    let fullText = ''
    let wordCounter = 0

    let typingInterval = setInterval(() => {
        fullText += text[wordCounter]
        $(el).html(fullText)
        wordCounter++
        if (fullText === text) {
            clearInterval(typingInterval)
        }
    }, 100)
}
typing('h1')

/* Убегать от мышки */
let catchCount = 0
$('h1').on('mouseenter', function () {
    catchCount++
    if (catchCount < 5) {
        $(this).css({
            position: 'absolute'
        })
        $(this).animate({
            left: random(0, window.innerWidth - $(this).outerWidth()),
            top: random(0, window.innerHeight - $(this).outerHeight())
        }, {
            duration: 500,
            queue: false
        })
    } else {
        catchCount = 0
        $(this).css({
            position: 'static'
        })
        typing('h1')
    }

}).css({
    position: 'relatve',
    width: 'max-content',
    margin: '0 auto'
})
/* Рандомное число */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/* Скрол */
// let scrollCounter = 0
// let scrollPosition = 0
// let scrollSize = $(window).height()
// let maxSrollSize = $('body').height()
// let duration = 1000
// let trueTimeScroll = 0

// $('body').on('wheel', function (e) {
//     // console.log(e.timeStamp)
//     if (e.timeStamp > trueTimeScroll + duration || trueTimeScroll == 0) {
//         trueTimeScroll = e.timeStamp

//         if (e.originalEvent.deltaY > 0) {
//             /* Прокрута вниз */
//             if (scrollCounter >= (maxSrollSize / scrollSize) - 2) {
//                 /* Нахожу конец сайта */
//                 scrollCounter = (maxSrollSize / scrollSize) - 1
//                 /* Ставлю экран на футер */
//             } else {
//                 scrollCounter++
//             }
//         } else if (e.originalEvent.deltaY < 0) {
//             /* Прокрута вверх */
//             if (scrollCounter <= 0) {
//                  /* Тут узнаем вверх и если позиция меньше либо рано вврху то ставить на вверх экран */
//                 scrollCounter = 0
//             } else {
//                 if ((maxSrollSize / scrollSize) - 1 == scrollCounter) { 
//                     scrollCounter = Math.floor((maxSrollSize / scrollSize) - 1)
//                 } else {
//                     scrollCounter--
//                 }
//             }
//         }

//         scrollPosition = (scrollCounter * scrollSize) * -1
//         $(this).animate({
//             top: scrollPosition
//         }, {
//             duration: duration,
//             easing:'easeInOutQuint'
//         })

//     }
// }).css({
//     overflow: 'hidden',
//     top: 0,
//     left: 0,
//     position: 'fixed',
//     width: '100%'
// })

$('.js-btn-top').click(function (e) {
    e.preventDefault()
    $('body,html').stop(true).animate({
        scrollTop: 0
    }, {
        duration: 1000
    })
}).fadeOut(0)

const navPosition = $('header nav').offset().top
$(window).on('scroll', function () {
    if ($(window).scrollTop() > 200) {
        $('.js-btn-top').fadeIn(500, 'easeInOutExpo')
    } else {
        $('.js-btn-top').fadeOut(500, 'easeInOutExpo')
    }
    if ($(window).scrollTop() >= navPosition) {
        $('header nav').css({
            position: 'fixed',
            width: '100%',
            top: 0,
            zIndex: 999
        })
    } else {
        $('header nav').css({
            position: 'static'
        })
    }
})

$('.js-sroll-to-id').click(function (e) {
    e.preventDefault()
    let attr = $(this).attr('href')
    $('body,html').stop(true).animate({
        scrollTop: $(attr).offset().top - $('header nav').outerHeight()
    }, {
        duration: 1000
    })
})

/* акардион */

$('a[data-target]').click(function (e) {
    e.preventDefault()
    let attr = $(this).attr('data-target')
    $('a[data-target]').not(this).removeClass('active')
    $(this).toggleClass('active')
    $(`div[data-target]`).not(`div[data-target=${attr}]`).stop(true).slideUp(200)
    $(`div[data-target=${attr}]`).stop(true).slideToggle(200)
})

/* фильтр */

$('button[data-filter]').click(function (e) {
    e.preventDefault()
    let attr = $(this).attr('data-filter')
    if (attr == 'all') {
        $(`div[data-filter]`).stop(true).slideDown(200)
    } else {
        $(`div[data-filter]`).not(`div[data-filter=${attr}]`).stop(true).slideUp(200)
    }
    $(`div[data-filter=${attr}]`).stop(true).slideDown(200)
})


/* Открыть модальное окно */
$('.close').click(function (e) {
    e.preventDefault()
    $('.modal').fadeOut(500)
})

$('.modal').click(function (e) {
    console.log(e)
    if (e.target === e.currentTarget) {
        $('.modal').fadeOut(500)
    }
})

$('.js-modal-show').click(function (e) {
    e.preventDefault()
    $('.modal').fadeIn(500)
})