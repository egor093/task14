const input = document.querySelector('input');
const form = document.querySelector('form');
const newDiv = document.createElement('div');
const play = document.querySelector('.play');
const previu = document.querySelector('.previu');

const createVideo = (id) => {
    newDiv.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>`
    play.append(newDiv);
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyB5nX8yZf5VQi0g7V7FWwpJ6YSrOTK8b10&q=${input.value}&type=video`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            createVideo(data.items[0].id.videoId);
            previu.innerHTML = '';
            data.items.forEach(element => {
                const img = document.createElement('img');
                img.src = element.snippet.thumbnails.medium.url;
                previu.append(img);
            });
            previu.addEventListener('click',(event) => {
                const srcArr = event.target.src.split('/');
                createVideo(srcArr[srcArr.lenght - 2]);
            });
        });
});