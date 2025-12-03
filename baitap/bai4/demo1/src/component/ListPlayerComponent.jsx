import {add, deleteById, getAll, positions, search, searchById} from "../service/player.jsx";
import {useEffect, useRef, useState} from "react";
import DeleteComponent from "./DeleteComponent.jsx";
import DetailPlayerComponent from "./DetailPlayerComponent.jsx";

const ListPlayerComponent = () => {
    const [playerList, setPlayerList] = useState(null)
    const [deletePlayer, setDeletePlayer] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [reloading, setReloading] = useState(false)
    const [detailPlayer, setDetailPlayer] = useState(null)
    const [showDetail, setShowDetail] = useState(false)


    const idRef = useRef(null)
    const codeRef = useRef(null)
    const nameRef = useRef(null)
    const dobRef = useRef(null)
    const priceRef = useRef(null)
    const posiRef = useRef(null)
    const searchRef = useRef(null)

    useEffect(() => {
        setPlayerList(getAll())
    }, [reloading]);

    const handleShowModal = (player) => {
        setDeletePlayer(player)
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }

    const handleAdd = () => {
        const id = idRef.current.value;
        const code = codeRef.current.value;
        const name = nameRef.current.value;
        const dob = dobRef.current.value;
        const price = priceRef.current.value;
        const position = posiRef.current.value;
        const newPlayer = {
            id: id,
            code: code,
            name: name,
            dob: dob,
            price: price,
            position: position
        }
        add(newPlayer)
        handleReload()
        idRef.current.value = ""
        codeRef.current.value = ""
        nameRef.current.value = ""
        dobRef.current.value = ""
        priceRef.current.value = ""
        posiRef.current.value = ""
    }

    const handleReload = () => {
        setReloading(!reloading);
    }

    const handleDetail = (player) => {
        setDetailPlayer(player);
        setShowDetail(true);
    }
    const closeDetail = () =>{
        setShowDetail(false);
    }
    const handleSearch = () => {
        const keyword = searchRef.current.value.trim()
        const playerDetail = search(keyword);
        setPlayerList(playerDetail);
    }

    return (
        <div className="container py-4">
            <h1 className="text-center text-primary mb-4 fw-bold text-uppercase">
                <i className="fa-solid fa-futbol me-2"></i>
                Danh sách cầu thủ bóng đá
            </h1>

            <div className="card shadow-sm mb-5 border-0 bg-light">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                        <i className="fa-solid fa-user-plus me-2"></i>Thêm cầu thủ mới
                    </h5>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row g-3">
                            <div className="col-md-2">
                                <label className="form-label fw-bold">ID</label>
                                <input ref={idRef} name="id" className="form-control" placeholder="Auto" />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label fw-bold">Mã cầu thủ</label>
                                <input ref={codeRef} name="code" className="form-control" placeholder="MCT-..." />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-bold">Tên cầu thủ</label>
                                <input ref={nameRef} name="name" className="form-control" placeholder="Nhập họ tên" />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-bold">Ngày sinh</label>
                                <input ref={dobRef} name="dob" type="date" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Giá chuyển nhượng ($)</label>
                                <input ref={priceRef} name="price" type="number" className="form-control" placeholder="VD: 1000000" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Vị trí</label>
                                <select ref={posiRef} name="position" className="form-select">
                                    <option value="">-- Chọn vị trí --</option>
                                    {positions.map((pos) => (
                                        <option key={pos.value} value={pos.value}>
                                            {pos.label}
                                        </option>
                                    ))}

                                </select>
                            </div>
                        </div>
                        <div className="mt-3 text-end">
                            <button onClick={handleAdd} type="button" className="btn btn-success px-4">
                                <i className="fa-solid fa-save me-2"></i>Lưu thông tin
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row justify-content-end mb-3">
                <div className="col-md-4">
                    <div className="input-group">
                        <input
                            ref={searchRef}
                            className="form-control"
                            placeholder="Nhập tên cầu thủ cần tìm..."
                        />
                        <button onClick={handleSearch} className="btn btn-outline-primary">
                            <i className="fa-solid fa-magnifying-glass me-1"></i> Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <table className="table table-striped table-hover mb-0 align-middle">
                        <thead className="table-dark text-center">
                        <tr>
                            <th className="py-3">STT</th>
                            <th className="py-3">Mã</th>
                            <th className="py-3 text-start ps-4">Tên cầu thủ</th>
                            <th className="py-3">Năm sinh</th>
                            <th className="py-3">Giá trị</th>
                            <th className="py-3">Vị trí</th>
                            <th className="py-3">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {playerList && playerList.length > 0 ? (
                            playerList.map((player, index) => (
                                <tr key={player.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center"><span className="badge bg-light text-dark border">{player.code}</span></td>
                                    <td className="fw-bold ps-4 text-primary">{player.name}</td>
                                    <td className="text-center">{player.dob}</td>
                                    <td className="text-end pe-4 fw-bold text-success">{player.price} $</td>
                                    <td className="text-center">
                                        <span className={`badge rounded-pill ${
                                            player.position === 'ST' ? 'bg-danger' :
                                                player.position === 'GK' ? 'bg-warning text-dark' :
                                                    player.position === 'MF' ? 'bg-success' : 'bg-secondary'
                                        }`}>
                                            {player.position}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="btn-group" role="group">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger btn-sm"
                                                title="Xóa"
                                                onClick={() => handleShowModal(player)}
                                            >
                                                <i className="fa-solid fa-trash"></i>Xoá
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-info btn-sm"
                                                title="Xem chi tiết"
                                                onClick={() => handleDetail(player)}
                                            >
                                                <i className="fa-solid fa-eye"></i>Chi tiết
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-5 text-muted">
                                    <i className="fa-regular fa-folder-open fs-1 mb-3 d-block"></i>
                                    Không có dữ liệu cầu thủ nào.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- CÁC MODAL --- */}
            {showModal && deletePlayer && (
                <DeleteComponent
                    deletePlayer={deletePlayer}
                    showModal={showModal}
                    closeModal={closeModal}
                    onReload={handleReload}
                />
            )}
            {showDetail && detailPlayer && (
                <DetailPlayerComponent
                    detailPlayer={detailPlayer}
                    showDetail={showDetail}
                    closeDetail={closeDetail}
                />
            )}
        </div>
    )
}
export default ListPlayerComponent