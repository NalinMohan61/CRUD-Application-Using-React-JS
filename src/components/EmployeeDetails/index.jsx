import React, { useState } from "react";
import { EmployeeTable, FormPopup, RemovePopup } from "../../components";
import "./style.css";

const EmployeeDetails = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [isPopupOpen, setPopup] = useState(false);
  const [selectedEditId, setEditId] = useState(null);
  const [isRemovePopupOpen, setRemovePopup] = useState(false);

  const handlePopupClose = () => {
    setPopup(false);
    setEditId(null);
  };

  const handleRemoveClose = () => {
    setRemovePopup(false);
    setEditId(null);
  };

  const modalTitle = selectedEditId ? "Edit Employee" : "Add Employee";

  return (
    <div className="emp-container">
      <div className="emp-info-wrp">
        <h3>Employee Information</h3>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setPopup(true)}
        >
          Add
        </button>
      </div>
      <EmployeeTable
        employeeDetails={employeeDetails}
        openEditPopup={() => setPopup(true)}
        setSelectedEditId={(id) => setEditId(id)}
        openRemovePopup={() => setRemovePopup(true)}
      />
      {!!isPopupOpen && (
        <FormPopup
          onClose={handlePopupClose}
          title={modalTitle}
          employeeDetails={employeeDetails}
          selectedEditId={selectedEditId}
          updateEmployeeDetails={(updatedEmployeeDetails) =>
            setEmployeeDetails(updatedEmployeeDetails)
          }
        />
      )}
      {!!isRemovePopupOpen && (
        <RemovePopup
          onClose={handleRemoveClose}
          selectedEmployee={
            employeeDetails.filter((emp) => emp.id === selectedEditId)[0]
          }
          updateEmployeeDetails={(updatedEmployeeDetails) =>
            setEmployeeDetails(updatedEmployeeDetails)
          }
          employeeDetails={employeeDetails}
        />
      )}
    </div>
  );
};

export default EmployeeDetails;
