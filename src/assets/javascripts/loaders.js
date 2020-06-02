const app = document.getElementById('app');

(async() => {
  const scripts = document.createElement('script');
  scripts.src = 'assets/javascripts/scripts.js';

  const title = await templateLoader('templates/page/title.mustache.html', { title: 'Search Github Users'});
  const searchField = await templateLoader('templates/search/input.mustache.html');
  const searchButton = await templateLoader('templates/search/button.mustache.html');

  const search = document.createElement('div');
  search.id = 'search';
  search.classList.add('search');
  search.innerHTML = searchField + searchButton;

  app.innerHTML = title;
  app.appendChild(search);

  document.body.appendChild(scripts);
})();
