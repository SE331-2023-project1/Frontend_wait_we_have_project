import apiClient from './AxiosClient'
import type { AxiosResponse } from 'axios'
import type { AdviserItem } from '@/type'


export default {
    getAdvisers(perPage: number, page: number): Promise<AxiosResponse<AdviserItem[]>> {
        return apiClient.get<AdviserItem[]>('/advisers?_limit='+perPage+'&_page='+page)
    },
    getAdviserById(id: number): Promise<AxiosResponse<AdviserItem>> {
        return apiClient.get<AdviserItem>('organizers/' + id.toString())
    },
    saveAdviser(advisers: AdviserItem): Promise<AxiosResponse<AdviserItem>> {
        return apiClient.post<AdviserItem>('/advisers', advisers)
    },
    getAdviserBy(): Promise<AxiosResponse<AdviserItem[]>> {
        return apiClient.get<AdviserItem[]>('/advisers')
    }
}