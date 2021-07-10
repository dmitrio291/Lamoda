// Функция для получния данных с сервера
// Запрос базы данных
const getData = async (server) => {
    const data = await fetch(server);
    if (data.ok) {
        return data.json();
    } else {
        throw new Error(`Данные не были получены, ошибка ${data.status} ${data.statusText}`);
    }
};

const getGoods = (callback, prop, value) => {
    getData('db.json')
        .then(data => {
            if (value) {
                callback(data.filter(item => item[prop] === value));
            } else {
                callback(data);
            }
        })
        .catch(err => {
            console.error(err);
        });
};

export default getGoods;