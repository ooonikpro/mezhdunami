import { Ref } from "vue";

const headers = {
    'Content-Type': 'application/json'
};

export const useAPI = (baseUrl: string = '/api') => {
    const getRequest = <T>(url: string): Promise<T> => {
        return $fetch<T>(`${baseUrl}${url}`, {
            method: 'GET',
            headers,
        });
    }

    const postRequest = <T>(url: string, body: Record<string, any>): Promise<T> => {
        return $fetch<T>(`${baseUrl}${url}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
    }

    return {
        getRequest,
        postRequest,
    }
}
