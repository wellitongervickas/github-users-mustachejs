const handleAlert = async message => {
  const alert = await templateLoader('templates/alert/message.mustache.html', {
    type: 'danger',
    message,
  });

  app.insertAdjacentHTML('beforeend', alert);
};

const setSearchProcessing = status => {
  const input = document.getElementById('search-input');
  const button = document.getElementById('search-button');

  const elementAction = status ? 'setAttribute': 'removeAttribute';

  button[elementAction]('disabled', status);
  input[elementAction]('disabled', status);

  const iconClasses = button.firstElementChild.classList;

  iconClasses[status ? 'remove' : 'add']('fa-search')
  iconClasses[!status ? 'remove' : 'add']('fa-spinner', 'fa-spin')
};

const getUser = username => axios.get(`https://api.github.com/search/users?q=${username}`)
  .then(res => res.data)
  .catch(() => handleAlert('Internal error'));

const handleGetUser = async (value) => {
  const results = document.getElementById('results');
  const alert = document.getElementById('alert');

  if (results) {
    results.remove();
  }

  if (alert) {
    alert.remove();
  }

  if (!value || !value.length) {
    handleAlert('Please, type a username!');
  } else {
    setSearchProcessing(true);

    await getUser(value).then(async (res) => {
      setSearchProcessing(false);

      if (!res.items.length) {
        handleAlert('User not found');
      } else {
        const users = await templateLoader('templates/results/box.mustache.html', { users: res.items });
        app.insertAdjacentHTML('beforeend', users);
      }
    });
  }
};

document.getElementById('search-input').addEventListener('keyup', e => {
  if (e.keyCode !== 13) {
    return;
  }

  handleGetUser(e.target.value);
});

document.getElementById('search-button').addEventListener('click', () => {
  const input = document.getElementById('search-input');
  handleGetUser(input.value);
});
