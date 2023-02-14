import React from "react";
import "./style.css";

const EmployeeTable = (props) => {
  const { employeeDetails, openEditPopup, openRemovePopup, setSelectedEditId } =
    props;

  const handleEdit = (id) => {
    openEditPopup();
    setSelectedEditId(id);
  };

  const handleRemove = (id) => {
    openRemovePopup();
    setSelectedEditId(id);
  };

  return (
    <div className="emp-details-container">
      <div className="emp-details-headers">
        <h6>First Name</h6>
        <h6>Last Name</h6>
        <h6>Designation</h6>
        <h6>Contact Number</h6>
        <div></div>
      </div>
      {!employeeDetails?.length ? (
        <div className="no-emp-wrp"> No Employee Found </div>
      ) : (
        employeeDetails.map(
          ({ id, firstName, lastName, designation, contact }) => (
            <div className="emp-details-row" key={id}>
              <span>{firstName}</span>
              <span>{lastName}</span>
              <span>{designation}</span>
              <span>{contact}</span>
              <div className="edit-remove-wrp">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-trans"
                  onClick={() => handleRemove(id)}
                >
                  Remove
                </button>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};
export default EmployeeTable;