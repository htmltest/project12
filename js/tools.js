var partnersSpeed       = 500;  // скорость прокрутки партнеров
var partnersDiff        = 490;  // величиная смещения при прокрутке партнеров

var projectSpeed        = 500;  // скорость прокрутки галереи в проектах
var projectDiff         = 1;    // количество позиций, смещающихся при прокрутке галереи в проектах

var mainSliderSpeed     = 500;  // скорость прокрутки карусели на главной
var mainSliderPeriod    = 5000; // период автоматической прокрутки карусели на главной (0 - автоматической прокрутки нет)

var mainAccordSpeed     = 300;  // скорость работы "аккордиона" на главной

var speedScroll         = 500;  // скорость скроллинга по форме заказа

var availableCities = [
    'Москва',
    'Санкт-Петербург',
    'Брянск',
    'Владимир',
    'Вологда',
    'Екатеринбург',
    'Иваново',
    'Калуга',
    'Кострома',
    'Нижний Новгород',
    'Орел',
    'Рязань',
    'Тула',
    'Тверь',
    'Тюмень',
    'Челябинск',
    'Ярославль'
];

var mainSliderTimer = null;

(function($) {

    $(document).ready(function() {

        $('.main-video-link a, .manual-inset-video a, .project-descr-video-photo a').fancybox({
            'transitionIn': 'none',
            'transitionOut': 'none'
        });

        $('.example-img a, .sert-item-photo a, .project-gallery-content a, .main-sert-preview a').fancybox();

        // партнеры
        $(window).load(function() {
            $('.partners').each(function() {
                var curSlider = $(this);
                var curWidth = 0;
                curSlider.find('li').each(function() {
                    curWidth += $(this).width() + 40;
                });
                if (curWidth > 930) {
                    curSlider.data('curLeft', 0);
                    curSlider.find('ul').width(curWidth);
                } else {
                    $('.partners-prev, .partners-next').hide();
                }
            });

            $('.partners-prev').click(function() {
                var curSlider = $('.partners');
                var curLeft = curSlider.data('curLeft');

                curLeft -= partnersDiff;
                if (curLeft < 0) {
                    curLeft = 0;
                }
                curSlider.data('curLeft', curLeft);

                curSlider.find('ul').animate({'left': -curLeft}, partnersSpeed);

                return false;
            });

            $('.partners-next').click(function() {
                var curSlider = $('.partners');
                var curLeft = curSlider.data('curLeft');

                curLeft += partnersDiff;
                if (curLeft >= curSlider.find('ul').width() - 930) {
                    curLeft = curSlider.find('ul').width() - 930;
                }
                curSlider.data('curLeft', curLeft);

                curSlider.find('ul').animate({'left': -curLeft}, partnersSpeed);

                return false;
            });

        });

        // галерея в проектах
        $('.project-gallery').each(function() {
            var curSlider = $(this);
            if (curSlider.find('li').length > 3) {
                curSlider.data('curIndex', 0);
                curSlider.find('ul').width(curSlider.find('li').length * curSlider.find('li:first').width());
            } else {
                curSlider.find('.project-gallery-prev, .project-gallery-next').hide();
            }
        });

        $('.project-gallery-prev').click(function() {
            var curSlider = $(this).parents().filter('.project-gallery');
            var curIndex = curSlider.data('curIndex');

            curIndex -= projectDiff;
            if (curIndex < 0) {
                curIndex = 0;
            }
            curSlider.data('curIndex', curIndex);

            curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, projectSpeed);

            return false;
        });

        $('.project-gallery-next').click(function() {
            var curSlider = $(this).parents().filter('.project-gallery');
            var curIndex = curSlider.data('curIndex');

            curIndex += projectDiff;
            if (curIndex >= curSlider.find('li').length - 3) {
                curIndex = curSlider.find('li').length - 3;
            }
            curSlider.data('curIndex', curIndex);

            curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, projectSpeed);

            return false;
        });

        // карусель на главной странице
        $('.main-slider').each(function() {
            var curSlider = $(this);
            if (curSlider.find('li').length > 1) {
                curSlider.data('curIndex', 0);
                curSlider.data('disableAnimation', true);
                curSlider.find('ul').width(curSlider.find('li').length * curSlider.find('li:first').width());

                var ctrlHTML = '';
                curSlider.find('li').each(function() {
                    ctrlHTML += '<a href="#"></a>';
                });
                $('.main-slider-ctrl').html(ctrlHTML);
                $('.main-slider-ctrl').css({'margin-left': -$('.main-slider-ctrl').width() / 2});
                $('.main-slider-ctrl a:first').addClass('active');
                $('.main-slider-ctrl a').click(function() {
                    var curSlider = $('.main-slider');

                    if (curSlider.data('disableAnimation')) {
                        window.clearTimeout(mainSliderTimer);
                        mainSliderTimer = false;

                        var curIndex = $('.main-slider-ctrl a').index($(this));
                        curSlider.data('curIndex', curIndex);

                        $('.main-slider-ctrl a.active').removeClass('active');
                        $('.main-slider-ctrl a').eq(curIndex).addClass('active');

                        curSlider.data('disableAnimation', false);
                        curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, mainSliderSpeed, function() {
                            curSlider.data('disableAnimation', true);
                            if (mainSliderPeriod > 0) {
                                mainSliderTimer = window.setTimeout(function() { $('.main-slider-next').trigger('click'); }, mainSliderPeriod);
                            }
                        });
                    }

                    return false;
                });

                if (mainSliderPeriod > 0) {
                    mainSliderTimer = window.setTimeout(function() { $('.main-slider-next').trigger('click'); }, mainSliderPeriod);
                }
            } else {
                $('.main-slider-prev, .main-slider-next').hide();
            }
        });

        $('.main-slider-prev').click(function() {
            var curSlider = $('.main-slider');

            if (curSlider.data('disableAnimation')) {
                window.clearTimeout(mainSliderTimer);
                mainSliderTimer = false;

                var curIndex = curSlider.data('curIndex');
                curIndex--;

                if (curIndex == -1) {
                    curIndex = curSlider.find('li').length - 1;
                }
                curSlider.data('curIndex', curIndex);

                $('.main-slider-ctrl a.active').removeClass('active');
                $('.main-slider-ctrl a').eq(curIndex).addClass('active');

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, mainSliderSpeed, function() {
                    curSlider.data('disableAnimation', true);
                    if (mainSliderPeriod > 0) {
                        mainSliderTimer = window.setTimeout(function() { $('.main-slider-next').trigger('click'); }, mainSliderPeriod);
                    }
                });
            }

            return false;
        });

        $('.main-slider-next').click(function() {
            var curSlider = $('.main-slider');

            if (curSlider.data('disableAnimation')) {
                window.clearTimeout(mainSliderTimer);
                mainSliderTimer = false;

                var curIndex = curSlider.data('curIndex');
                curIndex++;

                if (curIndex == curSlider.find('li').length) {
                    curIndex = 0;
                }
                curSlider.data('curIndex', curIndex);

                $('.main-slider-ctrl a.active').removeClass('active');
                $('.main-slider-ctrl a').eq(curIndex).addClass('active');

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, mainSliderSpeed, function() {
                    curSlider.data('disableAnimation', true);
                    if (mainSliderPeriod > 0) {
                        mainSliderTimer = window.setTimeout(function() { $('.main-slider-next').trigger('click'); }, mainSliderPeriod);
                    }
                });
            }

            return false;
        });

        // маркеры для списков внутри "аккордиона" на главной
        $('.main-accord-text').each(function() {
            var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var i = 0;
            $(this).find('li').each(function() {
                $(this).append('<small>' + letters[i] + '.</small>');
                i++;
            });
        });

        // "аккордион" на главной
        $('.main-accord').each(function() {
            $(this).data('curActiveAnimate', true);
            $(this).data('newActiveAnimate', true);

            $(window).load(function() {
                $('body').append('<div class="main-accord accord-test" style="position:fixed; left:-1px; top:-1px;"><img src="images/blank.gif" class="accord-test-img" style="position:absolute; left:100px; top:100px; z-index:999" />' + $('.main-accord').html() + '</div>');
                $('.accord-test .main-accord-text').show();
                $('.accord-test > ul > li').each(function() {
                    var curLi = $(this);
                    var curIndex = $('.accord-test > ul > li').index(curLi);
                    $('.accord-test-img').attr('src', curLi.css('background-image').replace(/"/g, '').replace('url(', '').replace(')', ''));
                    var curHeightImg = $('.accord-test-img').height();
                    if (curLi.height() < curHeightImg) {
                        $('.main-container .main-accord > ul > li').eq(curIndex).find('.main-accord-text').css({'margin-bottom': curHeightImg - curLi.height()});
                    }
                });
                $('.accord-test').remove();
            });
        });

        $('.main-accord > ul > li').click(function() {
            var newActive = $(this);
            if (!newActive.hasClass('active')) {
                if ($('.main-accord').data('curActiveAnimate') && $('.main-accord').data('newActiveAnimate')) {
                    $('.main-accord-text').stop(true, true);
                    $('.main-accord').data('curActiveAnimate', false);
                    $('.main-accord').data('newActiveAnimate', false);
                    var curActive = $('.main-accord > ul > li.active');
                    curActive.find('.main-accord-text').slideUp(mainAccordSpeed, function() {
                        curActive.removeClass('active');
                        $('.main-accord').data('curActiveAnimate', true);
                        newActive.addClass('active');
                        newActive.find('.main-accord-text').slideDown(mainAccordSpeed, function() {
                            $('.main-accord').data('newActiveAnimate', true);
                        });
                    });
                }
            }
        });

        // календарь
        $('.left-period-row input').datepicker({
            showOn: 'button',
            buttonImage: 'images/blank.gif',
            dateFormat: 'yy-mm-dd'
        });

        // селекты
        var params = {
            changedEl: '.window-form-row select'
        }
        cuSel(params);

        $.Placeholder.init({color: '#a5a5a5'});
        $('#window-subscribe form').validate();
        $('#window-comment form').validate();

        // формы
        $('.hotline-feedback a').click(function() {
            $('.overlay').show();
            $('#window-comment').show();
            $('#window-comment').css({'margin-top':-$('#window-comment').height() / 2});
            return false;
        });

        $('.hotline-callback a').click(function() {
            $('.overlay').show();
            $('#window-subscribe').show();
            $('#window-subscribe').css({'margin-top':-$('#window-subscribe').height() / 2});
            return false;
        });

        $('.window-close a').click(function() {
            $('.window').hide();
            $('.overlay').hide();
            return false;
        });

        $('.overlay').click(function() {
            $('.window').hide();
            $('.overlay').hide();
        });

        $('body').keypress(function(e) {
            if (e.keyCode == 27) {
                $('.window').hide();
                $('.overlay').hide();
            }
        });

        $('body').keydown(function(e) {
            if (e.keyCode == 27) {
                $('.window').hide();
                $('.overlay').hide();
            }
        });

        // оформление заказа
        $('.order-form-complect-row').each(function() {
            $(this).find('.order-form-complect-count-val input').val($(this).find('.order-form-complect-count-val span').html());
            if ($(this).find('.order-form-complect-count-val input').val() == '0') {
                $(this).addClass('order-form-complect-row-dis');
            }
        });

        $('.order-form-complect-count-minis').click(function() {
            var curItem = $(this).parents().filter('.order-form-complect-row');
            var curCount = Number(curItem.find('.order-form-complect-count-val input').val());
            if (curCount > 0) {
                curCount--;
            }
            curItem.find('.order-form-complect-count-val input').val(curCount);
            curItem.find('.order-form-complect-count-val span').html(curCount);
            if (curCount == 0) {
                curItem.addClass('order-form-complect-row-dis');
            }

            recalcOrder();
        });

        $('.order-form-complect-count-plus').click(function() {
            var curItem = $(this).parents().filter('.order-form-complect-row');
            var curCount = Number(curItem.find('.order-form-complect-count-val input').val());
            curCount++;
            curItem.find('.order-form-complect-count-val input').val(curCount);
            curItem.find('.order-form-complect-count-val span').html(curCount);
            curItem.removeClass('order-form-complect-row-dis');
            $('.order-form-complect-error div').hide();

            recalcOrder();
        });

        $('.order-form form').validate({
            messages: {
                name: 'Это обязательное поле!',
                email: 'Это обязательное поле!',
                city: 'Это обязательное поле!',
                address: 'Это обязательное поле!'
            },
            invalidHandler: function(form, validator) {
                validator.showErrors();
                if ($('.order-form form .error:first').length > 0) {
                    $('.order-form-steps').data('scrollAnimation', true);
                    $.scrollTo('.order-form form .error:visible:first', {offset: {'top': -92}, duration: speedScroll, onAfter: function() { $('.order-form-steps').data('scrollAnimation', false); }});
                }
            },
            submitHandler: function(form) {
                var curStep = $('.order-steps li').index($('.order-steps li.prev:last'));
                switch(curStep) {
                    case 0:
                        if (Number($('.order-form-complect-result-summ div').html().replace(' ', '')) == 0) {
                            $('.order-form-complect-error div').show();
                            $.scrollTo('.order-form-complect', {offset: {'top': -92}, duration: speedScroll});
                        } else {
                            $('.order-steps li').removeClass('curr');
                            $('.order-steps li').eq(0).addClass('prev');
                            $('.order-steps li').eq(1).addClass('prev curr');
                            $('.order-form-next').before('<div class="order-form-group">' + $('#order-form-contacts').html() + '</div>');
                            $('.order-form-complect-submit').slideUp();
                            $('.order-form-steps').data('scrollAnimation', true);
                            $('.order-form-steps').slideDown(function() {
                                $.scrollTo('.order-form form .order-form-group:last', {offset: {'top': -92}, duration: speedScroll, onAfter: function() { $('.order-form-steps').data('scrollAnimation', false); }});
                            });
                        }
                        break;
                    case 1:
                        if (Number($('.order-form-complect-result-summ div').html().replace(' ', '')) == 0) {
                            $('.order-form-complect-error div').show();
                            $.scrollTo('.order-form-complect', {offset: {'top': -92}, duration: speedScroll});
                        } else {
                            $('.order-steps li').removeClass('curr');
                            $('.order-steps li').eq(1).addClass('prev');
                            $('.order-steps li').eq(2).addClass('prev curr');
                            $('.order-form-next').before('<div class="order-form-group" style="display:none;">' + $('#order-form-delivery').html() + '</div>');
                            $('.order-form form input[name="city"]').autocomplete({
                                source: availableCities,
                                change: function(event, ui) {
                                // закомментирован код, который выводит варианты способов доставки
                                /*    if ($('.order-form form .order-form-group-delivery-list').length > 0) {
                                        if ($('.order-form form input[name="city"]').val() == 'Москва') {
                                            $('.order-form form .order-form-group-delivery-list:first').html($('#order-form-delivery-moscow .order-form-group-delivery-list').html());
                                        } else {
                                            $('.order-form form .order-form-group-delivery-list:first').html($('#order-form-delivery-other .order-form-group-delivery-list').html());
                                        }
                                    } else {
                                        if ($('.order-form form input[name="city"]').val() == 'Москва') {
                                            $('.order-form form .order-form-group:last').append($('#order-form-delivery-moscow').html());
                                        } else {
                                            $('.order-form form .order-form-group:last').append($('#order-form-delivery-other').html());
                                        }
                                        $('.order-form form .order-form-group-delivery-list').slideDown();
                                    }*/
                                }
                            });
                            $('.order-form-next').prev().slideDown(function() {
                                $('.order-form-steps').data('scrollAnimation', true);
                                $.scrollTo('.order-form form .order-form-group:last', {offset: {'top': -92}, duration: speedScroll, onAfter: function() { $('.order-form-steps').data('scrollAnimation', false); }});
                            });
                        }
                        break;
                    case 2:
                        if (Number($('.order-form-complect-result-summ div').html().replace(' ', '')) == 0) {
                            $('.order-form-complect-error div').show();
                            $.scrollTo('.order-form-complect', {offset: {'top': -92}, duration: speedScroll});
                        } else {
                            $('.order-steps li').removeClass('curr');
                            $('.order-steps li').eq(2).addClass('prev');
                            $('.order-steps li').eq(3).addClass('prev curr');
                            $('.order-form-next').before('<div class="order-form-group order-form-group-pay" style="display:none;">' + $('#order-form-pay').html() + '</div>');
                            $('.order-form-next').prev().find('.order-form-group-delivery-list').css({'display': 'block'});
                            $('.order-form-next').prev().slideDown(function() {
                                $('.order-form-steps').data('scrollAnimation', true);
                                $.scrollTo('.order-form form .order-form-group:last', {offset: {'top': -92}, duration: speedScroll, onAfter: function() { $('.order-form-steps').data('scrollAnimation', false); }});
                            });
                        }
                        break;
                    case 3:
                        if (Number($('.order-form-complect-result-summ div').html().replace(' ', '')) == 0) {
                            $('.order-form-complect-error div').show();
                            $.scrollTo('.order-form-complect', {offset: {'top': -92}, duration: speedScroll});
                        } else {
                            $('.order-steps li').removeClass('curr');
                            $('.order-steps li').eq(3).addClass('prev');
                            $('.order-steps li').eq(4).addClass('prev curr');
                            $('.order-form-next').before('<div class="order-form-group" style="display:none;">' + $('#order-form-confirm').html() + '</div>');
                            $('.order-form-next').prev().slideDown(function() {
                                $('.order-form-steps').data('scrollAnimation', true);
                                $.scrollTo('.order-form form .order-form-group:last', {offset: {'top': -92}, duration: speedScroll, onAfter: function() { $('.order-form-steps').data('scrollAnimation', false); }});
                            });
                            $('.order-form-next').fadeOut(function() { $('.order-form-next').remove(); } );
                        }
                        break;
                    case 4:
                        if (Number($('.order-form-complect-result-summ div').html().replace(' ', '')) == 0) {
                            $('.order-form-complect-error div').show();
                            $.scrollTo('.order-form-complect', {offset: {'top': -92}, duration: speedScroll});
                        } else {
                            form.submit();
                        }
                        break;
                }
            }
        });

        window.setInterval(function() {
            $('.order-form-input label:visible').each(function() {
                $(this).css({'margin-top': -($(this).height() + 24) / 2});
            });
        }, 10);

        $('.order-delivery-radio input:checked').parent().parent().addClass('active checked');

        $('.order-form form .order-delivery-item').live('click', function() {
            var curItem = $(this);
            if (!curItem.hasClass('checked')) {
                var curGroup = curItem.parent();
                curGroup.find('.order-delivery-item').stop(true, true);

                curGroup.find('.order-delivery-item.checked').animate({'background-color': '#f3f3f3'});
                curGroup.find('.order-delivery-item.checked .order-delivery-radio').css({'background-position': 'left top'});
                curGroup.find('.order-delivery-item.checked .order-delivery-item-name').animate({'color': '#696969'});
                curGroup.find('.order-delivery-item.checked .order-delivery-item-text').animate({'border-color': '#dedede'});
                curGroup.find('.order-delivery-item.checked .order-delivery-item-price').animate({'color': '#696969'});

                curItem.animate({'background-color': '#e6effc'});
                curItem.find('.order-delivery-radio').css({'background-position': 'left -23px'});
                curItem.find('.order-delivery-item-name').animate({'color': '#6193d8'});
                curItem.find('.order-delivery-item-text').animate({'border-color': '#ccdef7'});
                curItem.find('.order-delivery-item-price').animate({'color': '#6193d8'});

                curGroup.find('.order-delivery-item.checked').removeClass('checked');
                curItem.addClass('checked');

                curItem.find('input').prop('checked', true);
            }
        });

        $('.order-steps li div').click(function() {
            var curStep = $(this).parent();
            if (curStep.hasClass('prev') || curStep.hasClass('curr')) {
                var curIndex = $('.order-steps li').index(curStep);
                if (curIndex == 0) {
                    $.scrollTo('.order-form-complect', {offset: {'top': -92}, duration: speedScroll});
                } else {
                    $.scrollTo('.order-form form .order-form-group:eq(' + (curIndex - 1) + ')', {offset: {'top': -92}, duration: speedScroll});
                }
            }
        });

    });

    // пересчет заказа
    function recalcOrder() {
        var curWeight = 0;
        var curSumm   = 0;

        $('.order-form-complect-row').each(function() {
            var curItem = $(this);
            var curItemWeight = Number(curItem.find('.order-form-complect-weight div').html().replace(',', '.'));
            var curItemPrice = Number(curItem.find('.order-form-complect-price div').html().replace(' ', ''));
            var curItemCount = Number(curItem.find('.order-form-complect-count-val input').val());
            curItem.find('.order-form-complect-weight-summ div').html(String(curItemWeight * curItemCount).replace('.', ','));
            curWeight += curItemWeight * curItemCount;
            curItem.find('.order-form-complect-summ div').html(String(curItemPrice * curItemCount).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
            curSumm += curItemPrice * curItemCount;
        });
        $('.order-form-complect-result-weight div').html(String(curWeight).replace('.', ','));
        $('.order-form-complect-result-summ div').html(String(curSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        var curCount = 0;
        $('.order-form-complect-count-val input').each(function() {
            curCount += Number($(this).val());
        });
        $('.order-form-confirm-count').html(curCount + ' ' + createDeclination(curCount, ['комплектов', 'комплект', 'комплекта']));
        $('.order-form-confirm-summ').html(String(curSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' ' + createDeclination(curSumm, ['рублей', 'рубль', 'рубля']));
        $('.order-form-confirm-all').html(String(curSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' ' + createDeclination(curSumm, ['рублей', 'рубль', 'рубля']));
    }

    function createDeclination($number, $variants) {
        $num100 = $number % 100;
        $num10 = $number % 10;
        if ($num100 >= 5 && $num100 <= 20) {
            return $variants[0];
        } else if ($num10 == 0) {
            return $variants[0];
        } else if ($num10 == 1) {
            return $variants[1];
        } else if ($num10 >= 2 && $num10 <= 4) {
            return $variants[2];
        } else if ($num10 >= 5 && $num10 <= 9) {
            return $variants[0];
        } else {
            return $variants[2];
        }
    }

    // обработка скроллинга
    $(window).bind('load resize scroll', function() {
        if ($('.order-form').length == 1) {
            var curScroll = $(window).scrollTop();
            var curTopSteps = $('.order-steps').offset().top - 10;
            if (curTopSteps < curScroll) {
                $('.order-steps').addClass('order-steps-fixed');
            } else {
                $('.order-steps').removeClass('order-steps-fixed');
            }

            var curTopMiddle = $('.middle').offset().top + 68;
            if (curTopMiddle < curScroll) {
                $('.side').addClass('side-fix');
                $('.side').css({'left': $('.middle').offset().left + $('.middle').width() - 243});
            } else {
                $('.side').removeClass('side-fix');
                $('.side').css({'left': 'auto'});
            }

            if (!$('.order-form-steps').data('scrollAnimation')) {
                if (curScroll < $('.order-form-complect').offset().top - 62) {
                    $('.order-steps li').removeClass('curr');
                    $('.order-steps li').eq(0).addClass('curr');
                } else if (curScroll < $('.order-form form .order-form-group:eq(0)').offset().top - 62) {
                    $('.order-steps li').removeClass('curr');
                    $('.order-steps li').eq(1).addClass('curr');
                } else if (curScroll < $('.order-form form .order-form-group:eq(1)').offset().top - 62) {
                    $('.order-steps li').removeClass('curr');
                    $('.order-steps li').eq(2).addClass('curr');
                } else if (curScroll < $('.order-form form .order-form-group:eq(2)').offset().top - 62) {
                    $('.order-steps li').removeClass('curr');
                    $('.order-steps li').eq(3).addClass('curr');
                } else if (curScroll < $('.order-form form .order-form-group:eq(3)').offset().top - 62) {
                    $('.order-steps li').removeClass('curr');
                    $('.order-steps li').eq(4).addClass('curr');
                }
            }
        }
    });

    // скроллинг по форме заказа
    $(window).load(function() {
        if ($('.order-form').length == 1) {
            $.scrollTo('.order-steps', {duration: speedScroll});
        }
    });

    // корректировка размеров карты
    $(window).bind('load resize', function() {
        var curWidth = $(window).width();
        var curHeight = $(window).height() - $('.header').height() - $('.menu').height() - $('.footer').height();
        $('.map-inner').css({'width': curWidth, 'height': curHeight});
    });

    // верхняя полоса
    var periodTop = 1000;
    var speedTop  = 500;
    var timerTop  = null;

    $(document).ready(function() {

        $('.top-ctrl').click(function() {
            window.clearTimeout(timerTop);
            timerTop = false;
            var curText = $(this).html();
            $(this).html($(this).attr('rel'));
            $(this).attr('rel', curText);
            $('.top').toggleClass('top-open');
            $('.top-banners').slideToggle(speedTop);
            return false;
        });

        $('.top-banners-close').click(function() {
            $('.top-ctrl').trigger('click');
            return false;
        });

    });

    $(window).load(function() {
        timerTop = window.setTimeout(function() { $('.top-ctrl').trigger('click'); }, periodTop);
    });

})(jQuery);