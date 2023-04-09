const ul = document.querySelector('ul');
const select = document.querySelector('select');
const option = document.querySelector('option');
const companies = document.querySelector('.companies');

fetch(' http://api.citybik.es/v2/networks')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.networks.forEach(element => {
            if (element.location.city == 'London') {
                element.company.forEach(item => {
                    const li = document.createElement('li');
                    li.innerText = item;
                    ul.append(li);
                })
            }
        });
    });


select.addEventListener('change', () => {
    document.querySelectorAll('.companies li').forEach(item =>{
        item.remove()
    })
    fetch('http://api.citybik.es/v2/networks')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.networks.forEach(element => {
                if (select.value == element.location.country) {
                    element.company.forEach(item => {
                    const li = document.createElement('li');
                    li.innerText = item;
                    companies.append(li);
                    console.log(element.company)
                    })
                }
            });
        });
});