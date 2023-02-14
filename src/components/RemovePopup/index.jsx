import React from "react";
import "../FormPopup/style.css";

const RemovePopup = (props) => {
  const { onClose, selectedEmployee, updateEmployeeDetails, employeeDetails } =
    props;

  const handleConfirmRemove = () => {
    const employees = employeeDetails.filter(
      (emp) => emp.id !== selectedEmployee.id
    );
    updateEmployeeDetails(employees);
    onClose();
  };

  return (
    <div className="popup-container">
      <div className="overlay">
        <div className="popup-center">
          <div className="modal-header">
            <h2>Remove Employee</h2>
            <button className="btn close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="confirm-msg">
              Please confirm if you want to remove {selectedEmployee?.firstName}{" "}
              {selectedEmployee?.lastName} ?
            </div>
            <div className="remove-btn-wrp">
              <button
                className="btn btn-secondary cancel-btn"
                onClick={onClose}
              >
                No
              </button>
              <button className="btn btn-primary" onClick={handleConfirmRemove}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemovePopup;
