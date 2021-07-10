import { renderCart } from './cart.js';

// Блокировка скрола
const disableScroll = () => {
    if (document.disableScroll) return;

    const widthScroll = window.innerWidth - document.body.offsetWidth;

    document.disableScroll = true;

    document.body.dbScrollY = window.scrollY;

    document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${widthScroll}px;
    `;
};  

// Включение вертикального скрола
const enableScroll = () => {
    document.disableScroll = false;

    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dbScrollY
    });
};

// Открытие модальноге окна
export const cartModalOpen = overlay => {
    overlay.classList.add('cart-overlay-open');
    disableScroll();
    renderCart();
};

// Закрытие модального окна
export const cartModalClose = overlay => {
    overlay.classList.remove('cart-overlay-open');
    enableScroll();
};