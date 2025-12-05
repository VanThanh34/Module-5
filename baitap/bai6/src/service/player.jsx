import axios from "axios";

const players = [

    {

        id: 1,

        code: "MCT-001",

        name: "Thành Bean",

        dob: "2002",

        price: 13000000,

        position: "GK"

    }, {

        id: 2,

        code: "MCT-002",

        name: "Thành Container",

        dob: "1996",

        price: 10000,

        position: "ST"

    }, {

        id: 3,

        code: "MCT-003",

        name: "Tâm nem chua",

        dob: "2004",

        price: 5000,

        position: "ST"

    }

]
const URL_BE = "http://localhost:3000"

export async function getAll() {
    try {
        const response = await axios.get(`${URL_BE}/players`);
        return response.data;
    } catch (e) {
        console.log(e.message)
    }
    return [];
}

export async function deleteById(id) {
    try {
        const response = await axios.delete(`${URL_BE}/players/${id}`, id);
        return response.status === 200;
    } catch (e) {
        console.log(e.message);
    }
    return false;
}
export async function edit(player) {
    try {
        const response = await axios.patch(`${URL_BE}/players/${player.id}`, player);
        return response.status === 200;
    } catch (e) {
        console.log(e.message);
    }
    return false;
}

export async function add(player) {
    try {
        const response = await axios.post(`${URL_BE}/players`, player);
        return response.status === 201;
    } catch (e) {
        console.log(e.message);
    }
    return false;
}

export async function searchById(id) {
    try {
        const response = await axios.get(`${URL_BE}/players/${id}`, id);
        return response.data;
    } catch (e) {
        console.log(e.message);
    }
    return null;
}

