import axios from "axios";

const URL_BE = "http://localhost:3000"
export async function getAllPosition(){
    try{
        const response = await axios.get(`${URL_BE}/positions`);
        return response.data;
    }catch (e){
        console.log(e.message)
    }
    return [];
}

