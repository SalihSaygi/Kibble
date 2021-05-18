import axi from './axios';

async function getUsers() {
  try {
    const { data } = await axi.get('/api/users');
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function getUser(queryKey) {
  const [_key, { id }] = queryKey;
  try {
    const { data } = await axi.get(`/api/users/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function getProfile() {
  try {
    const { data } = await axi.get('/api/users/profile');
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function postProfileApiToken(accessToken, refreshToken) {
  try {
    const { status } = await axi.put(
      '/api/users/profile',
      accessToken,
      refreshToken
    );
    return status;
  } catch (err) {
    console.error(err);
  }
}

async function postUserApiToken(id, apiToken) {
  try {
    const { status } = await axi.put(`/api/users/${id}`, apiToken);
    return status;
  } catch (err) {
    console.error(err);
  }
}

async function getUserBots(id) {
  try {
    const { data } = await axi.get(`/api/users/${id}/bots`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function getProfileBots() {
  try {
    const { data } = await axi.get('/api/users/profile/bots');
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function getUserOneBot(userId, botId) {
  try {
    const { data } = await axi.get(`/api/users/${userId}/bots/${botId}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getProfileOneBot(id) {
  try {
    const { data } = await axi.get(`/api/users/profile/bots/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export {
  getUsers,
  getUser,
  getProfile,
  getProfileBots,
  getProfileOneBot,
  getUserBots,
  getUserOneBot,
  postProfileApiToken,
  postUserApiToken,
};
