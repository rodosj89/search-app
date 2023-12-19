import axios from "axios";
import { validateJWT } from "../utils"
import { callerName, hostAPIGW } from "../utils/config";

export const getRecomendation = async () => {
    try {
        let token = await validateJWT()
        let uris= [`/api/content/list/vod_recom_caller/1?callerName=${callerName[localStorage.getItem('env')]}&groupBy=series&restricted=false&showAdultContent=false&size=12`]
        return await axios.get(`${hostAPIGW[localStorage.getItem('env')]}/api/v1/dynamic/bulk?uris=${uris}`, {
            headers: {
                'Authorization': token
            }
        })
    } catch (error) {
        throw error
    }    
}