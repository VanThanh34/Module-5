let customers = [
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

export function deleteById(id) {
    // customers = customers.filter(customer => customer.id !== id);

    // vòng lặp for:
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].id === id) {
            customers.splice(i, 1);
            break;
        }
    }
}