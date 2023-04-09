// Задание 1. Карточки стран
// Есть API с информацией о 120 странах мира. URL:
// https://restcountries.com/v3.1/all
// Получить данные с помощью fetch и сформировать разметку карточек стран (например каждую 10-ю из массива) по ОБРАЗЦУ.
// ВАЖНО: Для разметки используйте сетку bootstrap, шаблоны смотрите ЗДЕСЬ.
// Пример кода для формирования блока карточки страны смотрите ниже. Функция возвращает html в виде строки, которую затем можно вставлять в разметку с помощью innerHTML или insertAdjacentHTML(https://learn.javascript.ru/mo...)
// ПОДСКАЗКА
// Некоторые значения (языки, валюты) хранятся внутри объектов, вам может быть удобно достать их с помощью метода Object.values(obj) (https://developer.mozilla.org/...)

const card = document.querySelector('.card');
const img = document.querySelector('img');
const cardBody = document.querySelector('.card-body');
const cardText = document.querySelector('.card-text');
const row = document.querySelector('.row')

function createCards(flag, countryName, region, population, languageStr, moneyStr) {
    return `
    <div class="col">
    <div class='card'>
    <img src="${flag}">
    <h2 class='country'>${countryName}</h2>   
    <p class='region'>${region}</p>   
    <p class='population'>${population}</p>   
    <p class='language'>${languageStr}</p>
    <p class='money'>${moneyStr}</p>
    </div>
    </div>`
}

fetch('https://restcountries.com/v3.1/all')
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        for(let i = 0;i < data.length; i += 1){
            const flag = data[i].flags.png;
            const countryName = data[i].name.official;
            const region = data[i].region;
            const population = `${(data[i].population / 1000000).toFixed(1)} млн`;
            const languageStr = Object.values(data[i].languages).join(', ');
            const moneyArr = Object.values(data[i].currencies);
            const moneyStr = moneyArr.map(Element => {
                if (Element.symbol !== undefined){
                    return `${Element.symbol} ${Element.name}`;
                } else {
                    return `${Element.name}`;
                }
            })
            console.log(languageStr);
            const card = createCards(flag, countryName, region, population, languageStr, moneyStr);
            row.insertAdjacentHTML('beforeend', card);
        }
    });