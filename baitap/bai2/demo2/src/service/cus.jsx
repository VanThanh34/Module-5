 const customers = [
    {
        id: 1,
        code: "MKH-0001",
        name: "Thành",
        address: "Đà Nẵng",
        type: "VIP1"
    },{
        id: 2,
        code: "MKH-0002",
        name: "Thành Bin",
        address: "Đà Nẵng",
        type: "VIP2"
    },{
        id: 3,
        code: "MKH-0003",
        name: "Thành Bean",
        address: "Đà Nẵng",
        type: "VIP3"
    }
]
 export function getAll(){
    return[...customers];
 }