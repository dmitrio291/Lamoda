import getGoods from './service.js';

// Функция для создания карточки товара
const createCard = ({ id, preview, cost, brand, name: title, sizes }) => {
    const li = document.createElement('li');

    li.classList.add('goods__item');

    li.innerHTML = `
        <article class="good">
            <a class="good__link-img" href="card-good.html#${id}">
                <img class="good__img" src="goods-image/${preview}" alt="${title}">
            </a>
            <div class="good__description">
                <p class="good__price">${cost} &#8381;</p>
                <h3 class="good__title">${brand} <span class="good__title__grey">/ ${title}</span></h3>
                ${sizes ?
                    `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>`: 
                    ''}                    
                <a class="good__link" href="card-good.html#${id}">Подробнее</a>
            </div>
        </article>
    `;

    return li;
};

export default (hash) => {
    // Страница категорий
    try {
        const goodsTitle = document.querySelector('.goods__title');
        const goodsList = document.querySelector('.goods__list');

        const changeTitle = () => {
            goodsTitle.textContent = document.querySelector(`[href*="#${hash}"]`).textContent;
        };

        if (!goodsList) {
            throw 'This is not a goods page!';
        }

        // Функция для вывода товаров на страницу
        const renderGoodsList = data => {
            goodsList.textContent = '';

            const cards = data.map(createCard);
            goodsList.append(...cards);

            // 2-ой способ с помошью forEach
            // data.forEach(item => {
            //     const card = createCard(item);
            //     goodsList.append(card);
            // });
        };

        changeTitle();
        getGoods(renderGoodsList, 'category', hash);

        window.addEventListener('hashchange', () => {
            hash = location.hash.substring(1);
            changeTitle();
            getGoods(renderGoodsList, 'category', hash);
        });

    } catch (err) {
        console.warn(err);
    }
};