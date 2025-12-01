import {getAll} from "../service/cus.jsx";
import React from "react";

function ListCus() {
    return (
        <>
            <h1 style={{color: "red"}}>Danh sách khách hàng</h1>
            <table >
                <tr>
                    <th>STT</th>
                    <th>Mã</th>
                    <th>Tên</th>
                    <th>Địa chỉ</th>
                    <th>Loại khách hàng</th>
                </tr>
                <tbody>
                {
                    getAll().map((customers, i) => (
                        <tr key={customers.id}>
                            <td>{i + 1}</td>
                            <td>{customers.code}</td>
                            <td>{customers.name}</td>
                            <td>{customers.address}</td>
                            <td>{customers.type}</td>
                        </tr>))
                }
                </tbody>
            </table>
        </>
    )
}
export default ListCus;