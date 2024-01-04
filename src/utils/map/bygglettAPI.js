import axios from 'axios';
const bygglettApiEiendomerUrl = import.meta.env.VITE_BYGGLETT_API_EINDOMER_URL;


export async function findEiendomerOmraade(lat, lon, radius, treff=1) {
    const url_omroder = bygglettApiEiendomerUrl+`/${lat}/${lon}?radius=${radius}&matchNumber=${treff}`
    const response = await axios.get(url_omroder)
    return response.data
}