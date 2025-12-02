import React, {Component} from "react";
import {getAll, deleteById} from "../service/cus.jsx";

class ListCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            showModal: false,
            deleteCustomer: null
        };
    }

    componentDidMount() {
        this.setState({
            customers: getAll()
        });
    }

    handleShowModal = (customer) => {
        this.setState({
            showModal: true,
            deleteCustomer: customer
        });
    };

    handleCloseModal = () => {
        this.setState({
            showModal: false,
            deleteCustomer: null
        });
    };

    handleDelete = () => {
        const {deleteCustomer} = this.state;

        deleteById(deleteCustomer.id);

        this.setState({
            customers: getAll(),
            showModal: false,
            deleteCustomer: null
        });

        console.log("Đã xóa khách hàng:", deleteCustomer.name);
    };

    render() {
        const {customers, showModal, deleteCustomer} = this.state;

        return (
            <div className="container mt-4">
                <h1 className="text-danger mb-3">Danh sách khách hàng</h1>


                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                    <tr>
                        <th>STT</th>
                        <th>Mã</th>
                        <th>Tên</th>
                        <th>Địa chỉ</th>
                        <th>Loại khách</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer, index) => (
                        <tr key={customer.id}>
                            <td>{index + 1}</td>
                            <td>{customer.code}</td>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td>{customer.type}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => this.handleShowModal(customer)}
                                >Xoá
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {showModal && deleteCustomer && (
                    <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Cảnh báo xóa!</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        style={{ filter: 'invert(1)' }}
                                        onClick={this.handleCloseModal}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        Bạn có chắc chắn muốn xóa khách hàng:
                                        <strong className="text-danger"> {deleteCustomer.name} </strong> không?
                                    </p>
                                    <p className="text-muted small">Hành động này không thể hoàn tác.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={this.handleCloseModal}>
                                        Hủy bỏ
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={this.handleDelete}>
                                        Xác nhận xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ListCustomer;