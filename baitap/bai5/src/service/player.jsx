const players = [
    {
        id: 1,
        code: "MCT-001",
        name:"Thành Bean",
        dob:"2002",
        price:13000000,
        position:"GK"
    },{
        id: 2,
        code: "MCT-002",
        name:"Thành Container",
        dob:"1996",
        price:10000,
        position:"ST"
    },{
        id: 3,
        code: "MCT-003",
        name:"Tâm nem chua",
        dob:"2004",
        price:5000,
        position:"ST"
    }
]
export const positions = [
    {   value: "GK",
        label: "Thủ môn (GK)"
    },
    {   value: "DF",
        label: "Hậu vệ (DF)"
    },
    {   value: "MF",
        label: "Tiền vệ (MF)"
    },
    {   value: "ST",
        label: "Tiền đạo (ST)"
    }
];
export function getAll() {
    return [...players]
}

export function deleteById(id){
    for (let i = 0; i < players.length; i++) {
        if(players[i].id === id){
            players.splice(i,1)
            break;
        }
    }
}

export function add(player){
    players.push(player)
}

export function searchById(id){
    id = +id;
    for (let i = 0; i < players.length; i++) {
        if(players[i].id === id){
            return players[i] ;
        }
    }
}

export function search(keyword){
    const lowerKeyword = keyword.trim().toLowerCase();
    return players.filter(player =>
        player.name.toLowerCase().includes(lowerKeyword)
    );
}