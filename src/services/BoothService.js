import axios from "axios";

const BOOTH_API_GET_ALL_URL = "https://oxygen-app-backend.herokuapp.com/booth/all"
const BOOTH_API_CREATE_BOOTH_URL = "https://oxygen-app-backend.herokuapp.com/booth/addBooth"
const BOOTH_API_GET_BOOTH_BY_TYPE_URL = "https://oxygen-app-backend.herokuapp.com/boothsByType"
class BoothService
{

    getAllBooths()
    {
        return axios.get(BOOTH_API_GET_ALL_URL)
    }

    getAllFactories(type)
    {
        return axios.get(BOOTH_API_GET_BOOTH_BY_TYPE_URL,{type})
    }

    createBooth(booth)
    {
        let formData = new FormData();
        formData.append('location', booth.location);
        formData.append('name', booth.name);
        formData.append('manager', booth.manager);
        formData.append('phone', booth.phone);
        formData.append('largeCylinderStock', booth.largeCylinderStock);
        formData.append('smallCylinderStock', booth.smallCylinderStock);
        formData.append('type', booth.type);

        try {
            return axios.post(BOOTH_API_CREATE_BOOTH_URL,formData);
        } catch (error) {
            console.log(error.data);
        }

    }



}
export default new BoothService()