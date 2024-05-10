async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function renderEpisodes() {
    const episodes = await fetchData('https://swapi.dev/api/films/');
    const app = document.getElementById('app');
    const episodeList = document.createElement('ul');

    episodes.results.forEach(episode => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${episode.episode_id}`;
        link.textContent = `${episode.title} (Эпизод ${episode.episode_id})`;
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращаем стандартное действие ссылки
            const episodeId = episode.episode_id;
            renderEpisodeDetails(episodeId, episodes); 
            history.pushState(null, '', `#${episodeId}`); 
        });
        listItem.appendChild(link);
        episodeList.appendChild(listItem);
    });

    app.innerHTML = '';
    app.appendChild(episodeList);
}

async function renderEpisodeDetails(episodeId, episodes) {
    const episode = episodes.results.find(ep => ep.episode_id === episodeId); // Находим нужный эпизод по его id
    const app = document.getElementById('app');
    app.innerHTML = ''; // Очищаем содержимое перед отрисовкой

    const heading = document.createElement('h1');
    heading.textContent = `${episode.title} (Эпизод ${episode.episode_id})`;

    const backButton = document.createElement('button');
    backButton.textContent = 'Назад к эпизодам';
    backButton.addEventListener('click', () => {
        window.history.back(); // Возвращаемся на предыдущую страницу в истории браузера
    });

    const openingCrawl = document.createElement('p');
    openingCrawl.textContent = episode.opening_crawl;

    const planetsTitle = document.createElement('h2');
    planetsTitle.textContent = 'Планеты';

    const planetsList = document.createElement('ul');
    await Promise.all(episode.planets.map(async planetUrl => {
        const planetData = await fetchData(planetUrl);
        const planetListItem = document.createElement('li');
        planetListItem.textContent = planetData.name;
        planetsList.appendChild(planetListItem);
    }));

    const speciesTitle = document.createElement('h2');
    speciesTitle.textContent = 'Расы';

    const speciesList = document.createElement('ul');
    await Promise.all(episode.species.map(async speciesUrl => {
        const speciesData = await fetchData(speciesUrl);
        const speciesListItem = document.createElement('li');
        speciesListItem.textContent = speciesData.name;
        speciesList.appendChild(speciesListItem);
    }));

    app.appendChild(heading);
    app.appendChild(backButton);
    app.appendChild(openingCrawl);
    app.appendChild(planetsTitle);
    app.appendChild(planetsList);
    app.appendChild(speciesTitle);
    app.appendChild(speciesList);
}


window.addEventListener('popstate', () => {
    const url = window.location.hash; // Получаем текущий URL
    if (url === '') {
        renderEpisodes(); // Если URL пустой, отображаем список эпизодов
    } else {
        const episodeId = url.substring(1); 
        renderEpisodeDetails(episodeId); 
    }
});

//при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    renderEpisodes();
});
