import axios from 'axios';

export const useApi = () => {

    const callApi = async (endpoint, data, method="GET", headers)=>{
        endpoint = 'http://127.0.0.1:5000' + endpoint
        console.log(method, endpoint, data);
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(userData) {
            if (!headers) {
                headers = {
                    headers: {
                        Authorization: `Bearer ${userData.token}`
                    }
                }
            } else {
                headers.headers.Authorization = `Bearer ${userData.token}`;
            }
        }
        try {
            let result;
            switch (method) {
                case "DELETE":
                    headers.data = data;
                    result = await axios.delete(endpoint, headers);
                    break;
                case "PUT":
                    result = await axios.put(endpoint, data, headers);
                    break;
                case "POST":
                    result = await axios.post(endpoint, data, headers);
                    break;
                default:
                case "GET":
                    // headers.params = data;
                    result = await axios.get(endpoint, headers);
                    break;
            }
            return result
        }catch(e){
            console.log('error')
            throw {error: e}
        }
    }

    return { callApi }
}

