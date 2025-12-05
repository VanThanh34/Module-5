import { deleteById } from "../service/player.jsx";
import { toast } from "react-toastify";

const DeleteComponent = ({ closeModal, deletePlayer, showModal, onReload }) => {

    const handleDelete = async () => {
        // Gọi API xóa (Thêm await)
        const isSuccess = await deleteById(deletePlayer.id);

        if (isSuccess) {
            toast.success("Xoá thành công", {
                position: "top-right",
                theme: "dark",
                autoClose: 1500 // 500 hơi nhanh quá, để 1500 cho dễ đọc
            });

            // QUAN TRỌNG: Gọi hàm này để danh sách bên ngoài cập nhật lại
            onReload();

            // Đóng modal sau khi xong việc
            closeModal();
        } else {
            toast.error("Xoá thất bại", {
                position: "top-right",
                theme: "dark",
                autoClose: 1500
            });
            // Nếu lỗi thì không đóng modal vội, để người dùng thử lại
        }
    }

    // Nếu không có dữ liệu người chơi thì không render để tránh lỗi
    if (!deletePlayer) return null;

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
                    <div className="modal-body text-center">
                        <p className="fs-5">
                            Bạn có chắc chắn muốn xóa cầu thủ:<br/>
                            <strong className="text-danger fs-3"> {deletePlayer.name} </strong>
                        </p>
                        <div className="bg-light p-2 rounded d-inline-block text-start mb-3">
                            {/* SỬA LỖI HIỂN THỊ POSITION */}
                            <div>Vị trí: <strong>{deletePlayer.position?.label || deletePlayer.position}</strong></div>
                            <div>Giá trị: <strong>{deletePlayer.price?.toLocaleString()} $</strong></div>
                        </div>
                        <p className="text-muted small fst-italic">
                            Hành động này không thể hoàn tác.
                        </p>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-secondary px-4" onClick={closeModal}>
                            Hủy bỏ
                        </button>
                        <button type="button" className="btn btn-danger px-4" onClick={handleDelete}>
                            Đồng ý xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DeleteComponent;