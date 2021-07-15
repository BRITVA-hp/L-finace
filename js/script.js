document.addEventListener('DOMContentLoaded', () => {

    // Очистка активного класаа

    function clearActiveClass(arr, activeClass) {
        arr.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    // Табы на странице enter.html
    function tabsEnter(tabs, tabActive, contents, contentActive, enter) {
        const tabs_ = document.querySelectorAll(tabs),
              contents_ = document.querySelectorAll(contents),
              rec = document.querySelector('.enter__text'),
              button = document.querySelector('.enter__button');

        tabs_.forEach((tab, i) => {
            tab.addEventListener('click', () => {
                clearActiveClass(tabs_, tabActive);
                clearActiveClass(contents_, contentActive);
                tab.classList.add(tabActive);

                contents_.forEach((content, y) => {
                    if (i == y) {
                        content.classList.add(contentActive);
                    }
                });

                if (enter) {
                    if (tab.classList.contains('enter__footer__text--aut')) {
                        rec.style.display = 'block';
                        button.textContent = 'Авторизоваться';
                    } else {
                        rec.style.display = 'none';
                        button.textContent = 'Зарегистрироваться';
                    }
                }
            });
        });
    }

    tabsEnter('.enter__footer__text', 'enter__footer__text--active', '.enter__form__box', 'enter__form__box--active', true);
    tabsEnter('.cabinet__menu__item', 'cabinet__menu__item--active', '.cabinet__form', 'cabinet__form--active');

    // Бургер и меню
    function burgerMenu(burger, menu, menuClose, menuActive, burgerActive) {
        const burger_ = document.querySelector(burger),
              menu_ = document.querySelector(menu),
              menuClose_ = document.querySelector(menuClose);

        burger_.addEventListener('click', () => {
            menu_.classList.add(menuActive);
            burger_.classList.add(burgerActive);
        });
        menuClose_.addEventListener('click', () => {
            menu_.classList.remove(menuActive);
            burger_.classList.remove(burgerActive);
        });
    }

    burgerMenu('.header__burger', '[data-nav]', '.nav__close', 'nav--active', 'header__burger--active');

    // Слайдер на странице article

    function sliderArt(window, field, windowWidth, fieldWidth) {
        const window_ = document.querySelector(window),
              field_ = document.querySelector(field);

        if (window_) {
            let startPoint,
            movePoint,
            leaveMovePoint,
            endPoint = 0,
            screenWidth;

            const slidermove = (e) => {
                e.preventDefault();
                movePoint = e.pageX - startPoint;
                field_.style.transform = `translateX(${movePoint + endPoint}px)`;
            };

            const windowLeaveFunc = (e) => {
                e.preventDefault();
                leaveMovePoint = e.pageX - startPoint;
                window_.removeEventListener('mousemove', slidermove);
                if (screenWidth >= 1540) {
                    if (leaveMovePoint < 0) {
                        endPoint = -(fieldWidth - windowWidth);
                        field_.style.transform = `translateX(-${fieldWidth - windowWidth}px)`;
                    }
                } else if (screenWidth >= 1500 && screenWidth < 1540) {
                    if (leaveMovePoint < 0) {
                            endPoint = -Math.abs(fieldWidth - screenWidth - 240);
                            field_.style.transform = `translateX(-${Math.abs(fieldWidth - screenWidth - 240)}px)`;
                    }
                } else if (screenWidth >= 1040 && screenWidth < 1500) {
                    if (leaveMovePoint < 0) {
                        endPoint = -(fieldWidth - 920);
                        field_.style.transform = `translateX(-${fieldWidth - 920}px)`;
                    }
                } else {
                    if (leaveMovePoint < 0) {
                            endPoint = -Math.abs(fieldWidth - (screenWidth - 120));
                            field_.style.transform = `translateX(-${Math.abs(fieldWidth - (screenWidth - 120))}px)`;
                    }
                }
                if (leaveMovePoint > 0) {
                    endPoint = 0;
                    field_.style.transform = `translateX(0px)`;
                }
            };

            window_.addEventListener('touchstart', (e) => {
                startPoint = e.changedTouches[0].pageX;
                screenWidth = document.documentElement.clientWidth;
            });

            window_.addEventListener('touchmove', (e) => {
                movePoint = e.changedTouches[0].pageX - startPoint;
                field_.style.transform = `translateX(${movePoint + endPoint}px)`;
            });

            window_.addEventListener('touchend', (e) => {
                endPoint += e.changedTouches[0].pageX - startPoint;
                if (screenWidth >= 1540) {
                    if (endPoint < -(fieldWidth - windowWidth)) {
                        endPoint = -(fieldWidth - windowWidth);
                        field_.style.transform = `translateX(-${fieldWidth - windowWidth}px)`;
                    }
                    if (endPoint > 0) {
                        endPoint = 0;
                        field_.style.transform = `translateX(0px)`;
                    }
                } else if (screenWidth >= 1500 && screenWidth < 1540) {
                    if (endPoint < 0) {
                        if (Math.abs(endPoint) > Math.abs(fieldWidth - screenWidth - 280)) {
                            endPoint = -Math.abs(fieldWidth - screenWidth - 280);
                            field_.style.transform = `translateX(-${Math.abs(fieldWidth - screenWidth - 280)}px)`;
                        }
                    } else {
                        endPoint = 0;
                        field_.style.transform = `translateX(0px)`;
                    }
                } else if (screenWidth >= 1040 && screenWidth < 1500) {
                    if (endPoint < -(fieldWidth - 920)) {
                        endPoint = -(fieldWidth - 920);
                        field_.style.transform = `translateX(-${fieldWidth - 920}px)`;
                    }
                    if (endPoint > 0) {
                        endPoint = 0;
                        field_.style.transform = `translateX(0px)`;
                    }
                } else {
                    if (endPoint < 0) {
                        if (Math.abs(endPoint) > Math.abs(fieldWidth - (screenWidth - 120))) {
                            endPoint = -Math.abs(fieldWidth - (screenWidth - 120));
                            field_.style.transform = `translateX(-${Math.abs(fieldWidth - (screenWidth - 120))}px)`;
                        }
                    } else {
                        endPoint = 0;
                        field_.style.transform = `translateX(0px)`;
                    }
                }
            });

            window_.addEventListener('mousedown', (e) => {
                e.preventDefault();
                startPoint = e.pageX;
                screenWidth = document.documentElement.clientWidth;
                window_.addEventListener('mousemove', slidermove);

                window_.addEventListener('mouseleave', windowLeaveFunc);
            });

            window_.addEventListener('mouseup', (e) => {
                window_.removeEventListener('mousemove', slidermove);
                endPoint += e.pageX - startPoint;
                if (screenWidth >= 1540) {
                    if (endPoint < -(fieldWidth - windowWidth)) {
                        endPoint = -(fieldWidth - windowWidth);
                        field_.style.transform = `translateX(-${fieldWidth - windowWidth}px)`;
                    }
                    if (endPoint > 0) {
                        endPoint = 0;
                        field_.style.transform = `translateX(0px)`;
                    }
                } else if (screenWidth >= 1500 && screenWidth < 1540) {
                    if (endPoint < 0) {
                        if (Math.abs(endPoint) > Math.abs(fieldWidth - screenWidth - 280)) {
                            endPoint = -Math.abs(fieldWidth - screenWidth - 280);
                            field_.style.transform = `translateX(-${Math.abs(fieldWidth - screenWidth - 280)}px)`;
                        }
                    } else {
                        endPoint = 0;
                        field_.style.transform = `translateX(0px)`;
                    }
                } else if (screenWidth >= 1040 && screenWidth < 1500) {
                    console.log(1);
                    if (endPoint < -(fieldWidth - 920)) {
                        endPoint = -(fieldWidth - 920);
                        field_.style.transform = `translateX(-${fieldWidth - 920}px)`;
                    }
                    if (endPoint > 0) {
                        endPoint = 0;
                        field_.style.transform = `translateX(0px)`;
                    }
                } else {
                    if (endPoint < 0) {
                        console.log(screenWidth);
                        if (Math.abs(endPoint) > Math.abs(fieldWidth - (screenWidth - 120))) {
                            endPoint = -Math.abs(fieldWidth - (screenWidth - 120));
                            field_.style.transform = `translateX(-${Math.abs(fieldWidth - (screenWidth - 120))}px)`;
                        }
                    } else {
                        endPoint = 0;
                        field_.style.transform = `translateX(0px)`;
                    }
                }
            });

            document.addEventListener('mouseup', () => {
                window_.removeEventListener('mouseleave', windowLeaveFunc);
            });
        }

    }

    sliderArt('.article-slider__window', '.article-slider__field', 1300, 1520);

});