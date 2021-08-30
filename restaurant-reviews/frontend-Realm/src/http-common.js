import axios from "axios"

export default axios.create({
    baseURL:"https://ap-south-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/restaurant-reviews-qrvmf/service/restaurants/incoming_webhook/",
    headers:{
        "Content-type":"application/json"
    }
});