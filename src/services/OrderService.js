import axios from "axios";

const ORDER_API_BASE_URL = "https://oxygen-app-backend.herokuapp.com/order/orderByDistributor"
class OrderService
{

    getOrderByDistributor(distributorId)
    {
        console.log(distributorId)
        return axios.get(ORDER_API_BASE_URL,{params:{
            id: distributorId
        }
        });
    }

}
export default new OrderService()