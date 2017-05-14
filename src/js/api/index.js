import axios from "axios";

class Fetcher {
    constructor() {
       let instance = axios.create({
            baseURL: 'https://api.aftership.com/v4',
            timeout: 10000,
            headers: {
                'aftership-api-key': 'INSERT-YOUR-APIKEY',
                'Content-Type': 'application/json'
            },
            responseType: 'json'
        });
       this.instance = instance
    }

    xcallCour() {
        this.instance.get('/couriers')
            .then(function (response) {
                var val
                for (var value in response.data.data.couriers) {
                    val = response.data.data.couriers[value]
                    console.log(val.slug, value)
                }
                return (response.data.data)
            })
            .catch(function (err){
                console.log(err.message)
            })
    }
    
    async callCour() {
        try {
            const response = await this.instance.get('/trackings/malaysia-post/CD304613231MY')
            console.log(response.data)
        } catch(err) {
            console.log("ERROR!", err.response)
            console.log("Code:", err.response.status)
            console.log("Msg:", err.response.data.meta.message)
        }
    }
}

export default new Fetcher
