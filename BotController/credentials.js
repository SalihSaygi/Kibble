import { http } from "@dogehouse/kebab";

const credentials = (apiKey) => {
    const { accessToken, refreshToken } = await http.bot.auth(apiKey);

    return accessToken, refreshToken
}

export default credentials