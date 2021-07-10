// Получение данных из JSON и их парсинг из localStorage
export const getLocalStorage = () => JSON?.parse(localStorage.getItem('cart-lomoda')) || [];

// Запись данных в localStorage в формате JSON
export const setLocalStorage = data => localStorage.setItem('cart-lomoda', JSON.stringify(data));