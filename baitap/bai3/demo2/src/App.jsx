import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            item: ""
        };
    }

    handleChange = (event) => {
        this.setState({ item: event.target.value });
    };

    handleAddItem = () => {
        const { item, list } = this.state;
        if (item.trim() !== "") {
            this.setState({
                list: [...list, item],
                item: ""
            });
        }
    };

    render() {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh", width: "100%" }}
            >

            <div className="card shadow-lg" style={{ width: "100%", maxWidth: "500px" }}>
                    <div className="card-body p-4">
                        <h1 className="text-center mb-4 text-primary">Todo List ✅</h1>

                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Nhập công việc cần làm..."
                                value={this.state.item}
                                onChange={this.handleChange}
                                onKeyDown={(e) => e.key === 'Enter' && this.handleAddItem()}
                            />
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={this.handleAddItem}
                            >
                                Thêm
                            </button>
                        </div>

                        <ul className="list-group list-group-flush">
                            {this.state.list.map((todo, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center bg-light mb-2 rounded border">
                                    <span className="fs-5">{todo}</span>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => {
                                        this.setState({
                                            list: this.state.list.filter((_, i) => i !== index)
                                        })
                                    }}>✕</button>
                                </li>
                            ))}
                        </ul>

                        {this.state.list.length === 0 && (
                            <div className="text-center mt-4">
                                <p className="text-muted">Hôm nay rảnh rỗi quá nhỉ? 😎</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;