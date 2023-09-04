import { useState, useEffect } from "react";
import { Button, Card, Dropdown, Modal } from "react-bootstrap";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "./credentialManagement.css";
import { updateUser } from "../../helpers/userAPIs";
import { fetchBeRoles } from "../../helpers/roleManagementAPIs";
import { ReactComponent as Loading } from "../../assets/svg/Spin-1s-164px.svg";
function EditUser(props: any) {
  //   console.log("single user data in file", props.singleUserData);
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
      creatingUserName: "",
      creatingUserRole: "",
      creatingUserBusinessEntity: "",
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

  useEffect(() => {
    setData(props.singleUserData);
  }, [props.singleUserData]);

  // Handle change function for all the input fields
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

  const bodyData = {
    userName: data.userName,
    userEmail: data.userEmail,
    phoneNumber: data.phoneNumber,
    userPassword: data.userPassword,
    // businessEntity: data.businessEntity,
    // createdBy: data.createdBy,
    loggedInUser: userName,
    userStatus: data.userStatus,
    userRole: data.userRole,
  };

  const handleStatusSelect = (e: any) => {
    console.log(e);
    setData({
      ...data,
      userStatus: e,
    });
  };
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
      console.log(bodyData);
      const getData = async () => {
        const response = await updateUser(props.singleUserData._id, bodyData);
        console.log(response);
        setResponse(response);
      };
      getData();
    } else {
      setErrorMsg("Form data is not valid. Please correct the errors.");
    }
    console.log(bodyData);
    let msg, color;
    if (response === 201) {
      color = "linear-gradient(to right, #00b09b, #96c93d)";
      msg = "Business Entity Added Successfully";
      showToastmsg(msg, color, props);
      // exit();
    } else if (response === 401) {
      color = "blue";
      msg = "Input Field can not be Empty";
      showToastmsg(msg, color, props);
    } else if (response === 409) {
      color = "red";
      msg = "Business Entity Already Exists";
      showToastmsg(msg, color, props);
    } else if (response === 400) {
      color = "red";
      msg = "Something Went Wromg";
      showToastmsg(msg, color, props);
    }
  }

  const showToastmsg = (msg: string, color: string, props: any) => {
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
      onClick: function () {
        props.onHide();
      }, // Callback after click
    }).showToast();
  };

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchBeRoles(userEntity);
      setRoles(fetchedData.data);
      // console.log(fetchedData.data);
    };
    getData();
  }, [props.singleUserData, response, userEntity]);
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
            Edit User
          </Modal.Title>
        </Modal.Header>
        {props.loading ? (
          <Loading />
        ) : (
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
                          disabled={true}
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
                          disabled={true}
                          value={data.userEmail}
                          className="form-control"
                          onChange={handleChange}
                        />
                        {!isValid.userEmail && (
                          <p>Please enter a valid Email</p>
                        )}
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
                          // disabled={true}
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
                          disabled={true}
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
                            disabled={true}
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
                            {data.userStatus
                              ? data.userStatus
                              : "Select Status"}
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
                  <button
                    type="submit"
                    className="btn btn-primary form-control"
                  >
                    Submit
                  </button>
                </form>
              </Card.Body>
            </Card>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser;
