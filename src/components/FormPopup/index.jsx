import React, { useState, useEffect } from "react";
import "./style.css";

const FormPopup = (props) => {
  const {
    onClose,
    title,
    employeeDetails,
    updateEmployeeDetails,
    selectedEditId,
  } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    if (selectedEditId) {
      const selectedEmployee = employeeDetails.filter(
        (emp) => emp.id === selectedEditId
      )[0];
      setFirstName(selectedEmployee.firstName);
      setLastName(selectedEmployee.lastName);
      setDesignation(selectedEmployee.designation);
      setContact(selectedEmployee.contact);
    }
    //Disabling because need to run use effect once
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "designation":
        setDesignation(value);
        break;
      case "contact":
        setContact(value);
        break;
      default:
        break;
    }
  };

  const handleValidation = () => {
    const error = {};
    if (!firstName) {
      error["firstName"] = true;
    }
    if (!lastName) {
      error["lastName"] = true;
    }
    if (!designation) {
      error["designation"] = true;
    }
    if (!contact) {
      error["contact"] = true;
    } else if (contact.length !== 10 || !/^\d+$/.test(contact)) {
      error["contact"] = "formatError";
    }
    return error;
  };

  const handleAddClick = () => {
    const error = handleValidation();
    if (Object.keys(error).length) {
      setErrors({ ...error });
    } else {
      const existingEmployeeDetails = [...employeeDetails];
      if (existingEmployeeDetails.length) {
        const id =
          existingEmployeeDetails[existingEmployeeDetails.length - 1].id + 1;
        existingEmployeeDetails.push({
          id,
          firstName,
          lastName,
          designation,
          contact,
        });
      } else {
        existingEmployeeDetails.push({
          id: 1,
          firstName,
          lastName,
          designation,
          contact,
        });
      }
      updateEmployeeDetails(existingEmployeeDetails);
      onClose();
    }
  };

  const handleEditClick = () => {
    const error = handleValidation();
    if (Object.keys(error).length) {
      setErrors({ ...error });
    } else {
      const existingEmployeeDetails = employeeDetails.filter(
        (emp) => emp.id !== selectedEditId
      );
      existingEmployeeDetails.push({
        id: selectedEditId,
        firstName,
        lastName,
        designation,
        contact,
      });
      updateEmployeeDetails(existingEmployeeDetails);
      onClose();
    }
  };

  return (
    <div className="popup-container">
      <div className="overlay">
        <div className="popup-center">
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="btn close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="form-wrp">
              <div className="form-grp">
                <label htmlFor="firstName">First Name*</label>
                <input
                  name="firstName"
                  type="text"
                  value={firstName}
                  placeholder="Enter First Name"
                  onChange={handleChange}
                />
                {errors && errors.hasOwnProperty("firstName") && (
                  <div className="error-text">First Name is required</div>
                )}
              </div>
              <div className="form-grp">
                <label htmlFor="lastName">Last Name*</label>
                <input
                  name="lastName"
                  type="text"
                  value={lastName}
                  placeholder="Enter Last Name"
                  onChange={handleChange}
                />
                {errors && errors.hasOwnProperty("lastName") && (
                  <div className="error-text">Last Name is required</div>
                )}
              </div>
              <div className="form-grp">
                <label htmlFor="designation">Designation*</label>
                <input
                  name="designation"
                  type="text"
                  value={designation}
                  placeholder="Enter Designation"
                  onChange={handleChange}
                />
                {errors && errors.hasOwnProperty("designation") && (
                  <div className="error-text">Designation is required</div>
                )}
              </div>
              <div className="form-grp">
                <label htmlFor="contact">Contact Number*</label>
                <input
                  name="contact"
                  type="text"
                  value={contact}
                  placeholder="Enter Contact Number"
                  onChange={handleChange}
                />
                {errors && errors.hasOwnProperty("contact") && (
                  <div className="error-text">
                    {errors.contact === "formatError"
                      ? "Please enter valid contact number"
                      : "Contact Number is required"}
                  </div>
                )}
              </div>
              <div className="btn-wrp">
                <button
                  type="button"
                  className="btn btn-secondary cancel-btn"
                  onClick={onClose}
                >
                  Cancel
                </button>
                {selectedEditId ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditClick}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddClick}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPopup;
