import { cartModalOpen, cartModalClose } from './modal.js';
import pageCategory from './pageCategory.js';
import pageCardGood from './pageCardGood.js';
import { getLocalStorage } from './localStorage.js';

let hash = location.hash.substring(1);
pageCategory(hash);
pageCardGood(hash);

const headerCityButton = document.querySelector('.header__city-button');
const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

// Функция для склонения существительных. Возвращает только слово
const declOfNum = (n, titles) => {
    return titles[n % 10 === 1 && n % 100 !== 11 ?
        0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

// Обновление количества товаров в корзине
export const updateCountGoodsCart = () => {
    if (getLocalStorage().length) {
        subheaderCart.textContent = getLocalStorage().length + ' ' + declOfNum(getLocalStorage().length, ['товар', 'товара', 'товаров']);
    } else {
        subheaderCart.textContent = 'Корзина';
    }
};

updateCountGoodsCart();

// Обновление своего местоположения
const updateLocation = () => {    
    headerCityButton.textContent =
    localStorage.getItem('lomoda-location') ||
            'Ваш город?';
};

updateLocation();

// При клике на эту кнопку можно ввести свой город
headerCityButton.addEventListener('click', () => {
    let city = prompt('Укажите ваш город!');
    if (city !== null) {
        localStorage.setItem('lomoda-location', city);
    }
    updateLocation();
});

// При клике на корзину показывает модальное окно
subheaderCart.addEventListener('click', cartModalOpen.bind(null, cartOverlay));

// При клике на оверлей или крестик закрывает модальное окно
cartOverlay.addEventListener('click', event => {
    const target = event.target;

    if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
        cartModalClose(cartOverlay);
    }
});