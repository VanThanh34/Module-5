import {deleteById} from "../service/player.jsx";

const DeleteComponent = ({closeModal,deletePlayer,showModal, onReload})=>{

    const handleDelete = ()=>{
        deleteById(deletePlayer.id)
        closeModal()
        onReload()
    }
    return (
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-danger text-white">
                        <h5 className="modal-title">Xoá cầu thủ</h5>
                        <button
                            type="button"
                            className="btn-close"
                            style={{ filter: 'invert(1)' }}
                            onClick={closeModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>
                            Bạn có chắc chắn muốn xóa cầu thủ:
                            <strong className="text-danger fs-5"> {deletePlayer.name} </strong>
                        </p>
                        <p>
                            Vị trí: <strong>{deletePlayer.position}</strong> <br />
                            Giá trị: <strong>{deletePlayer.price}</strong>
                        </p>
                        <p className="text-muted small fst-italic">
                            Hành động này không thể hoàn tác.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>
                            Hủy bỏ
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                            Đồng ý xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DeleteComponent ;