import axios, { AxiosResponse } from 'axios';

export const fetchData = async <T,>(url: string): Promise<T> => {
    try {
        const response: AxiosResponse<T, any> = await axios.get<T>(url);
        return response.data;
    } catch (error: unknown) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
