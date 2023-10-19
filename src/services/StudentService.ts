import type {AxiosResponse } from "axios";
import type { StudentItem, AdviserItem } from "@/type";
import apiClient from './AxiosClient'


export default {
  getStudent(
    perPage: number,
    page: number
  ): Promise<AxiosResponse<StudentItem[]>> {
    return apiClient.get<Array<StudentItem>>(
      "/students?_limit=" + perPage + "&_page=" + page
    );
  },
  getStudentById(id: number): Promise<AxiosResponse<StudentItem>> {
    return apiClient.get<StudentItem>("/students/" + id.toString());
  },
  getAdviser(
    perPage: number,
    page: number
  ): Promise<AxiosResponse<AdviserItem[]>> {
    return apiClient.get<Array<AdviserItem>>(
      "/advisors?_limit=" + perPage + "&_page=" + page
    );
  },
  getAdviserById(id: number): Promise<AxiosResponse<AdviserItem>> {
    return apiClient.get<AdviserItem>("/advisors/" + id.toString());
  },
};
