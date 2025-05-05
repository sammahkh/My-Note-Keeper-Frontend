import React from "react";
import "./ConfirmDeleteModal.css";

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Are you sure you want to delete this note?</h3>
        <div className="Confirm-delete-modal">
          <button onClick={onConfirm} className="confirm-btn">
            Yes, Delete
          </button>
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
