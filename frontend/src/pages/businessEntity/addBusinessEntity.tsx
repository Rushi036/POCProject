import { exit } from "process";
import { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { config } from "../../config";
import { addBE } from "../../helpers/businessEntityAPIs";
function AddBusinessEntity(props: any) {
  // console.log(props);
  // All the initial values for the form are defined here
  const initialvalues = {
    companyName: "",
    companyAddress: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    contactPersonName: "",
    contactPersonPhoneNumber: "",
    contactPersonEmailAddress: "",
  };
  // All states are defined here
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState(initialvalues);
  const [isValid, setIsValid] = useState({
    companyName: true,
    companyAddress: true,
    city: true,
    state: true,
    pincode: true,
    country: true,
    contactPersonName: true,
    contactPersonPhoneNumber: true,
    contactPersonEmailAddress: true,
  });
  const [response, setResponse] = useState(0);

  // Handle change function for all the input fields
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const phoneRegex = /^[0-9]+$/;
    const text = /^[A-Za-z\s]+$/;
    const address = /^[A-Za-z0-9\s.,'-]+$/;
    const pincode = /^\d{6}$/;
    const isValidcontactPersonEmailAddress =
      name === "contactPersonEmailAddress"
        ? emailRegex.test(value)
        : isValid.contactPersonEmailAddress;
    const isValidcontactPersonPhoneNumber =
      name === "contactPersonPhoneNumber"
        ? phoneRegex.test(value)
        : isValid.contactPersonPhoneNumber;
    const isValidcompanyName =
      name === "companyName" ? text.test(value) : isValid.companyName;
    const isValidcity = name === "city" ? text.test(value) : isValid.city;
    const isValidstate = name === "state" ? text.test(value) : isValid.state;
    const isValidcountry =
      name === "country" ? text.test(value) : isValid.country;
    const isValidcompanyAddress =
      name === "companyAddress" ? address.test(value) : isValid.companyAddress;
    const isValidcontactPersonName =
      name === "contactPersonName"
        ? text.test(value)
        : isValid.contactPersonName;
    const isValidpincode =
      name === "pincode" ? pincode.test(value) : isValid.pincode;

    setIsValid({
      ...isValid,
      companyName: isValidcompanyName,
      companyAddress: isValidcompanyAddress,
      city: isValidcity,
      state: isValidstate,
      pincode: isValidpincode,
      country: isValidcountry,
      contactPersonName: isValidcontactPersonName,
      contactPersonPhoneNumber: isValidcontactPersonPhoneNumber,
      contactPersonEmailAddress: isValidcontactPersonEmailAddress,
    });
  };

  const bodyData = {
    companyName: data.companyName,
    companyAddress: data.companyAddress,
    city: data.city,
    state: data.state,
    pincode: data.pincode,
    country: data.pincode,
    contactPersonName: data.contactPersonName,
    contactPersonPhoneNumber: data.contactPersonPhoneNumber,
    contactPersonEmailAddress: data.contactPersonEmailAddress,
  };

  const showToastmsg = (msg: string, color: string) => {
    Toastify({
      text: msg,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: color,
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  };

  // form handle submission function
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(isValid);
    if (
      isValid.companyName &&
      isValid.city &&
      isValid.companyAddress &&
      isValid.contactPersonEmailAddress &&
      isValid.contactPersonName &&
      isValid.contactPersonPhoneNumber &&
      isValid.country &&
      isValid.pincode &&
      isValid.state
    ) {
      const getData = async () => {
        const response = await addBE(bodyData);
        console.log("in file", response);
        setResponse(response);
      };
      getData();
    } else {
      setErrorMsg("Form data is not valid. Please correct the errors.");
    }
    let msg, color;
    if (response === 201) {
      color = "linear-gradient(to right, #00b09b, #96c93d)";
      msg = "Business Entity Added Successfully";
      showToastmsg(msg, color);
    } else if (response === 401) {
      color = "blue";
      msg = "Input Field can not be Empty";
      showToastmsg(msg, color);
    } else if (response === 409) {
      color = "red";
      msg = "Business Entity Already Exists";
      showToastmsg(msg, color);
    }
    console.log(bodyData);
  }

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
            Add Business Entity
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
                    <div className="col-md-12">
                      <label className="form-label">Business Entity Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Business Entity Name"
                        name="companyName"
                        value={data.companyName}
                        className="form-control"
                        onChange={handleChange}
                      />
                      {!isValid.companyName && (
                        <p>
                          Entity Name Cannot contain numbers and special
                          character.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col-md-12">
                      <label className="form-label">
                        Business Entity Address
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Business Entity Address"
                        name="companyAddress"
                        value={data.companyAddress}
                        className="form-control"
                        onChange={handleChange}
                      />
                      {!isValid.companyAddress && (
                        <p>Please enter a valid Entity Adddress.</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        required
                        placeholder="City"
                        name="city"
                        value={data.city}
                        className="form-control"
                        onChange={handleChange}
                      />
                      {!isValid.city && (
                        <p>
                          City Name Cannot contain numbers and special
                          character.
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        required
                        placeholder="State"
                        name="state"
                        value={data.state}
                        className="form-control"
                        onChange={handleChange}
                      />
                      {!isValid.state && (
                        <p>
                          State Name Cannot contain numbers and special
                          character..
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Pincode</label>
                      <input
                        type="number"
                        required
                        placeholder="Pincode"
                        name="pincode"
                        value={data.pincode}
                        className="form-control"
                        onChange={handleChange}
                      />
                      {!isValid.pincode && <p>Please enter a valid Pincode.</p>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Country</label>
                      <input
                        type="text"
                        required
                        placeholder="Country"
                        name="country"
                        value={data.country}
                        className="form-control"
                        onChange={handleChange}
                      />
                      {!isValid.country && (
                        <p>
                          Country Name Cannot contain numbers and special
                          character.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Contact Person Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Contact Person Name"
                        name="contactPersonName"
                        value={data.contactPersonName}
                        className="form-control"
                        onChange={handleChange}
                      />
                      {!isValid.contactPersonName && (
                        <p>
                          Person Name Cannot contain numbers and special
                          character.
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Contact Person Number
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="Contact Person Number"
                        name="contactPersonPhoneNumber"
                        value={data.contactPersonPhoneNumber}
                        className="form-control"
                        onChange={handleChange}
                      />
                      {!isValid.contactPersonPhoneNumber && (
                        <p>Please enter a valid Phone Number.</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col-md-12">
                      <label className="form-label">
                        Contact Person Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Contact Person Email Address"
                        name="contactPersonEmailAddress"
                        value={data.contactPersonEmailAddress}
                        className="form-control"
                        onChange={handleChange}
                      />
                      {!isValid.contactPersonEmailAddress && (
                        <p>Please enter a valid Email.</p>
                      )}
                    </div>
                  </div>
                </div>
                {errorMsg.length !== 0 && <p>{errorMsg}</p>}
                <button type="submit" className="btn btn-primary form-control">
                  Add Business Entity
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

export default AddBusinessEntity;
