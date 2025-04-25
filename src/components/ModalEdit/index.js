function ModalEdit({ isOpen, onClose, onSave, editTitle, setEditTitle }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSave()}
                />
                <div className="modal-actions">
                    <button className="modal-actions-save" onClick={onSave}>Save</button>
                    <button className="modal-actions-cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ModalEdit;
