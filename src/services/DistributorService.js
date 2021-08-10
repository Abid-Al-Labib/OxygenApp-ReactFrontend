import axios from "axios";

const DISTRIBUTOR_API_GET_ALL_URL = "https://oxygen-app-backend.herokuapp.com/distributor/all"
const DISTRIBUTOR_API_ADD_DISTRIBUTOR_URL = "https://oxygen-app-backend.herokuapp.com/distributor/addDistributor"
const DISTRIBUTOR_API_PLACE_ORDER_URL = "https://oxygen-app-backend.herokuapp.com/distributor/placeOrder"
class DistributorService
{

    getAllDistributors()
    {
        return axios.get(DISTRIBUTOR_API_GET_ALL_URL)
    }

    createDistributor(distributor)
    {
        
        let formData = new FormData();
        formData.append('name', distributor.name);
        formData.append('emptyCylindersLarge', distributor.emptyCylindersLarge);
        formData.append('fullCylindersLarge', distributor.fullCylindersLarge);
        formData.append('emptyCylindersSmall', distributor.emptyCylindersSmall);
        formData.append('fullCylindersSmall', distributor.fullCylindersSmall);
        try {
            return axios.post(DISTRIBUTOR_API_ADD_DISTRIBUTOR_URL,formData);
        } catch (error) {
            console.log(error.data);
        }
    }

    placeOrder(order)
    {

        let formData = new FormData();
        let convertedDate = order.date.getDate() +'/'+ order.date.getMonth() +'/'+ order.date.getFullYear();
        formData.append('type', order.type);
        formData.append('size', order.size);
        formData.append('boothName', order.boothName);
        formData.append('quantity', order.quantity);
        formData.append('date', convertedDate);
        formData.append('dis_id', order.dis_id);

        console.log(JSON.stringify(formData));
        try {
            return axios.put(DISTRIBUTOR_API_PLACE_ORDER_URL, formData)
        } catch (error) {
            console.log(error.data)
        }

    }

}
export default new DistributorService()