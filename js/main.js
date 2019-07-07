$(document).ready(function(){
	$('.reviews-slider').slick({
		slidesToShow: 1,
		arrows: false,
		dots: true,
		appendDots: '.reviews__nav',
	});
	$('.questions__block').click(function () {
        $(this).toggleClass('questions__block--active').find('.questions__question').next().slideToggle();
        $(this).find('.questions__question').toggleClass('questions__question--active');
    });
	$('.mask').mask("+380 999-99-99-99");
	$('.go_to').click(function() {
	    $('html, body').animate({
            scrollTop: $(".working").offset().top
        }, 500);
	});
	$('.btn-toggle').click(function(){
		$('.header__panel').removeClass('header__panel--disable');
		$('.header__panel').toggleClass('header__panel--active');
		$('.btn-toggle__line').toggleClass('btn-toggle__line--active');
		$('body').toggleClass('body-overflow');
	});
	$(window).load(function(){
		$ (".header").sticky({ topSpacing: 0, className: 'sticky' });
	});
	$(document).on('click', function (e) {
		if (!$(e.target).closest(".header__wrap").length) {
			$('.header__panel').removeClass('header__panel--active');
			$('.header__panel').addClass('header__panel--disable');
			$('.btn-toggle__line').removeClass('btn-toggle__line--active');
			$('body').removeClass('body-overflow');
		}
		e.stopPropagation()
	});

	$('.header-nav__link--scroll').click( function(){ // ловим клик по ссылке с классом go_to
	var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top-113 }, 500); // анимируем скроолинг к элементу scroll_el
        }
	    return false; // выключаем стандартное действие
    });

	$('form').each(function() {
		$(this).submit(function () {
            var formID = $(this).attr('id'); // Получение ID формы
            var formNm = $('#' + formID);
            $.ajax({
                type: 'POST',
                url: 'form.php', // Обработчик формы отправки
                data: formNm.serialize(),
                success: function (data) {
                    // Вывод текста результата отправки в текущей форме
                    $(formNm).html(data);
                }
            }).done(function(){
            	$('#modal-thank').arcticmodal();
            });
            return false;
        });

		$(this).validate({
			rules: {
				repair_number: {
					required: true,
					minlength: 2
				},
				coorepation_number: {
					required: true,
					minlength: 2
				},
				coop_number: {
					required: true,
					minlength: 2
				},
				speciality: {
					required: true,
					minlength: 2
				},
				name: {
					required: true,
					minlength: 2
				},
				phone: {
					required: true,
					minlength: 2
				},
			},
			messages: {
				repair_number: {
					required: "",
				},
				coorepation_number: {
					required: "",
				},
				coop_number: {
					required: "",
					email: "" 
				},
				speciality: {
					required: "",
				},
				name: {
					required: "",
				},
				phone:{
				  required: "",
				},
			}
		});
	});
})