import { exit } from "process";
import { useState, useEffect } from "react";
import { Button, Card, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "./credentialManagement.css";
import { config } from "../../config";
import { addUser } from "../../helpers/userAPIs";
import { fetchBeRoles } from "../../helpers/roleManagementAPIs";
function AddUser(props: any) {
  const userDetails = JSON.parse(sessionStorage.getItem("User")!);
  const userEntity = userDetails.verifiedUser.businessEntity;
  const userRole = userDetails.verifiedUser.userRole;
  const userName = userDetails.verifiedUser.userName;
  // All the initial values for the form are defined here
  const initialvalues = {
    userName: "",
    userEmail: "",
    userPassword: "",
    phoneNumber: 0,
    businessEntity: "",
    createdBy: {
      creatingUserName: userName,
      creatingUserRole: userRole,
      creatingUserBusinessEntity: userEntity,
    },
    userStatus: "",
    userRole: "",
  };
  // All states are defined here
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState(initialvalues);
  const [roles, setRoles] = useState([]);
  const [isValid, setIsValid] = useState({
    userName: true,
    userEmail: true,
    userPassword: true,
    phoneNumber: true,
    businessEntity: true,
    userStatus: true,
    userRole: true,
  });
  const [response, setResponse] = useState(0);

  // Handle change function for all the input fields
  // Regular expression for validation
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const phoneRegex = /^[0-9]+$/;
    const text = /^[A-Za-z\s]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValiduserName =
      name === "userName" ? text.test(value) : isValid.userName;
    const isValiduserEmail =
      name === "userEmail" ? emailRegex.test(value) : isValid.userEmail;
    const isValiduserPassword =
      name === "userPassword"
        ? passwordRegex.test(value)
        : isValid.userPassword;
    const isValidphoneNumber =
      name === "phoneNumber" ? phoneRegex.test(value) : isValid.phoneNumber;
    const isValidbusinessEntity =
      name === "businessEntity" ? text.test(value) : isValid.businessEntity;

    setIsValid({
      ...isValid,
      userPassword: isValiduserPassword,
      phoneNumber: isValidphoneNumber,
      businessEntity: isValidbusinessEntity,
      userEmail: isValiduserEmail,
      userName: isValiduserName,
    });
  };

  //destructuring the form data to send it to  body
  const bodyData = {
    userName: data.userName,
    userEmail: data.userEmail,
    userPassword: data.userPassword,
    phoneNumber: data.phoneNumber,
    businessEntity: data.businessEntity,
    createdBy: data.createdBy,
    userStatus: data.userStatus,
    userRole: data.userRole.toLowerCase(),
  };

  // function to handle the status input
  const handleStatusSelect = (e: any) => {
    console.log(e);
    setData({
      ...data,
      userStatus: e,
    });
  };

  // funtion to handle role input
  const handleRoleSelect = (e: any) => {
    setData({
      ...data,
      userRole: e,
    });
  };

  // form handle submission function
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(isValid);
    if (
      isValid.userName &&
      isValid.userEmail &&
      isValid.userPassword &&
      isValid.phoneNumber &&
      isValid.userStatus &&
      isValid.businessEntity &&
      isValid.userRole
    ) {
      const getData = async () => {
        const response = await addUser(bodyData);
        setResponse(response);
      };
      getData();
    } else {
      setErrorMsg("Form data is not valid. Please correct the errors.");
    }
    console.log(bodyData);
  }

  const showToastmsg = (msg: string, color: string) => {
    Toastify({
      text: msg,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: color,
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  };

  //function to fetch roles according to entity name
  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchBeRoles(userEntity);
      setRoles(fetchedData.data);
      // console.log(fetchedData.data);
    };
    getData();
    let msg, color;
    if (response === 201) {
      color = "linear-gradient(to right, #00b09b, #96c93d)";
      msg = "Business Entity Added Successfully";
      showToastmsg(msg, color);
      // exit();
    } else if (response === 401) {
      color = "blue";
      msg = "Input Field can not be Empty";
      showToastmsg(msg, color);
    } else if (response === 409) {
      color = "red";
      msg = "Business Entity Already Exists";
      showToastmsg(msg, color);
    }
  }, [response]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">User Name</label>
                      <input
                        type="text"
                        required
                        placeholder="User Name"
                        name="userName"
                        value={data.userName}
                        className="form-control"
                        onChange={handleChange}
                      />
                      {!isValid.userName && (
                        <p>
                          User Name Cannot contain numbers and special
                          character.
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">User Email</label>
                      <input
                        type="email"
                        required
                        placeholder="User Email"
                        name="userEmail"
                        value={data.userEmail}
                        className="form-control"
                        onChange={handleChange}
                      />
                      {!isValid.userEmail && <p>Please enter a valid Email</p>}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">User Password</label>
                      <input
                        type="password"
                        required
                        placeholder="User Password"
                        name="userPassword"
                        value={data.userPassword}
                        className="form-control"
                        onChange={handleChange}
                      />
                      {!isValid.userPassword && (
                        <div>
                          <p>Enter Password according to the conditions :</p>
                          <ul>
                            <li>Minimum length must be of 8 characters</li>
                            <li>Must contain UpperCase letter</li>
                            <li>Must contain LowerCase letter</li>
                            <li>Must contain number</li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="number"
                        required
                        placeholder="Phome Number"
                        name="phoneNumber"
                        value={data.phoneNumber}
                        className="form-control"
                        onChange={handleChange}
                      />
                      {!isValid.phoneNumber && (
                        <p>Please enter a valid Phone Number.</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row">
                    {userRole === "Application Super Admin" && (
                      <div className="col-md-6">
                        <label className="form-label">Business Entity</label>
                        <input
                          type="text"
                          required
                          placeholder="Business Entity"
                          name="businessEntity"
                          value={data.businessEntity}
                          className="form-control"
                          onChange={handleChange}
                        />
                        {!isValid.businessEntity && (
                          <p>Please enter a valid Business Entity.</p>
                        )}
                      </div>
                    )}
                    <div className="col-md-6">
                      <label className="form-label">User Status</label>
                      <Dropdown
                        onSelect={handleStatusSelect}
                        className="form-control"
                      >
                        <Dropdown.Toggle
                          id="dropdown-status"
                          className="dropdown_form"
                        >
                          {data.userStatus ? data.userStatus : "Select Status"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="Active">
                            Active
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="InActive">
                            In-Active
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div
                      className={
                        userRole === "Application Super Admin"
                          ? "col-md-6 mt-3"
                          : "col-md-6"
                      }
                    >
                      <label className="form-label">User Role</label>
                      <Dropdown
                        onSelect={handleRoleSelect}
                        className="form-control"
                      >
                        <Dropdown.Toggle
                          // variant="danger"
                          id="dropdown-role"
                          className="dropdown_form"
                        >
                          {data.userRole ? data.userRole : "Select Role"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {roles.map((item: any, index: number) => {
                            return (
                              <Dropdown.Item
                                key={index}
                                eventKey={item.roleName}
                              >
                                {item.roleName}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row">
                    {/* <div className="col-md-6">
                      <label className="form-label">User Role</label>
                      <Dropdown
                        onSelect={handleStatusSelect}
                        className="form-control"
                      >
                        <Dropdown.Toggle
                          // variant="danger"
                          id="dropdown-role"
                          className="dropdown_form"
                        >
                          {data.userRole ? data.userRole : "Select Role"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu></Dropdown.Menu>
                      </Dropdown>
                    </div> */}
                  </div>
                </div>
                {errorMsg.length !== 0 && <p>{errorMsg}</p>}
                <button type="submit" className="btn btn-primary form-control">
                  Add User
                </button>
              </form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUser;
