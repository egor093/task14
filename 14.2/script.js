const card = document.querySelector('.card');
const img = document.querySelector('img');
const cardBody = document.querySelector('.card-body');
const cardText = document.querySelector('.card-text');
const row = document.querySelector('.row');

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

fetch('https://restcountries.com/v3.1/name/deutschland')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for (let i = 0; i < data.length; i += 1) {
            const flag = data[i].flags.png;
            const countryName = data[i].name.official;
            const region = data[i].region;
            const population = `${(data[i].population / 1000000).toFixed(1)} млн`;
            const languageStr = Object.values(data[i].languages).join(', ');
            const moneyArr = Object.values(data[i].currencies);
            const moneyStr = moneyArr.map(Element => {
                if (Element.symbol !== undefined) {
                    return `${Element.symbol} ${Element.name}`;
                } else {
                    return `${Element.name}`;
                }
            })
            console.log(languageStr);
            const card = createCards(flag, countryName, region, population, languageStr, moneyStr);
            row.insertAdjacentHTML('beforeend', card);

            const neighbourds = data[i].borders;
            neighbourds.forEach(element => {
                let url = `https://restcountries.com/v3.1/alpha/${element}`;
                fetch(url)
                .then((response) => {
                    return response.json();
                })
                    .then((data) => {
                        for (let i = 0; i < data.length; i++) {
                            const name = document.createElement('h1');
                            name.innerText = 'Соседняя страна';
                            
                            const flag = data[i].flags.png;
                            const countryName = data[i].name.official;
                            const region = data[i].region;
                            const population = `${(data[i].population / 1000000).toFixed(1)} млн`;
                            const languageStr = Object.values(data[i].languages).join(', ');
                            const moneyArr = Object.values(data[i].currencies);
                            const moneyStr = moneyArr.map(Element => {
                                if (Element.symbol !== undefined) {
                                    return `${Element.symbol} ${Element.name}`;
                                } else {
                                    return `${Element.name}`;
                                }
                            })
                            console.log(languageStr);
                            const card = createCards(flag, countryName, region, population, languageStr, moneyStr);
                            row.insertAdjacentHTML('beforeend', card);
                        }
                    })
            });
        }
    })