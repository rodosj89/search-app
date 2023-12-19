'use strict'

import axios from "axios"
import { validateJWT } from "../utils"
import { hostSearch, hostAPIGW } from "../utils/config"

export const search = async (value, stripe) => {
    try {
        let token = await validateJWT()
        return await axios.get(`${hostSearch[localStorage.getItem('env')]}/search/v1/all?phrase=${value}&size=18&stripes=${stripe}`, {
            headers: {
                'Authorization': token
            }
        })
    } catch (error) {
        throw error
    }    
}

export const getStripeContent = async (uri, token, url, page = 1) => {
    try {
        const result =  await axios.get(`${url}/api/v1/dynamic/bulk?deviceType=Web Client&uris[]=${uri}&groupBy=series&restricted=false&showAdultContent=false&size=12`, {
            headers: {
                'Authorization': token
            }
        })

        return result.data
    } catch (error) {
        throw error
    }

}

export const getPageStructure = async (pageId) => {
    try {
        const token = await validateJWT()
        const cacheToken = await getCacheToken(token)
        const url = hostAPIGW[localStorage.getItem('env')]
        const result =  await axios.get(`${url}/api/v1/dynamic/page?deviceType=Web Client&id=${pageId}&token=${cacheToken}`, {
            headers: {
                'Authorization': token
            }
        })

        const stripes = result.data.content.page.stripes

        const structure = []
        for(let i = 0; i < stripes.length; i++) {
            if(stripes[i].stripe) {
                const stripe = {
                    title: stripes[i].stripe.titles[0].title,
                    stripeType: stripes[i].stripe.type,
                }
                const contentResult = await getStripeContent(stripes[i].stripe.sourceInfo.uri, token, url)
                stripe.content = contentResult[0]
                structure.push(stripe)
            }
        }
        return structure
    } catch (error) {
        throw error
    }

}

const getCacheToken = async (token) => {
    try {
        const response = await axios.get(`${hostAPIGW[localStorage.getItem('env')]}/auth/v2/cachetoken`, 
            { 
                headers: { 'Authorization': token } 
            })
            
        return response.data.token
    } catch (error) {
        throw error
    }
}