const fetch = require('node-fetch');

const getRooms = async (req, res) => {
  fetch('https://api.github.com/users/github')
    .then(res => res.json())
    .then(json => console.log(json));
};
