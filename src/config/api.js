import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.17:8080/lyfemap"
});

export const local = {
    selectAll: () => api.get("locais"),
    selectById: idLocal => api.get(`locais/${idLocal}`),
    insertLocal: local => api.post("locais/", local),
    selectByDistance: (radius, latitude, longitude) => api.get(`locais/distance/${radius}`, {
        params: {
            latitude,
            longitude
        }
    }),
};

export default api;