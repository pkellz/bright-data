import axios from 'axios'
import config from '../config';
import { IQuery } from '../models';
import { AxiosResponse } from 'axios';
const { apiURL } = config

const axiosInstance = axios.create({
    method: 'POST',
    baseURL: `${apiURL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
})

/**
 * Trigger Bright Data collector that fetch price data about {keyword} from several competitors
 */
function triggerCollector(keyword: string): Promise<AxiosResponse<{ success: boolean, errorMessage?: string }>> {
    return axiosInstance.post('/collect', { keyword })
}

function getQuery(keyword: string, top?: number): Promise<AxiosResponse<{ success: boolean, data?: IQuery, errorMessage?: string }>> {
    return axiosInstance.get(`/query?keyword=${keyword}&top=${top}`)
}

export default {
    triggerCollector,
    getQuery
} as const;