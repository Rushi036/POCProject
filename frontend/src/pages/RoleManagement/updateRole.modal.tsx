import { useState, useEffect } from "react";
import { Button, Card, Modal, Form, Row, Col, Table } from "react-bootstrap";
import { entityModule } from "../../constants/data";
import { updateRolePermission } from "../../helpers/roleManagementAPIs";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function UpdateRole(props: any) {
  // console.log("role props", props.roleNameIndex.roleName);
  const userDetails = JSON.parse(sessionStorage.getItem("User")!);
  const userRole = userDetails.verifiedUser.userRole;
  // const userEntity = userDetails.verifiedUser.businessEntity;
  const [checked, setChecked] = useState({});
  const [isAbg, setIsAbg] = useState("Yes");
  // const [entityNameValue, setEntityNameValue] = useState("");
  // const [entityNames, setEntityNames] = useState([]);
  const [response, setResponse] = useState(0);
  const [roleDetails, setRoleDetails] = useState<any>({
    roleName: "",
    permissions: [
      {
        moduleName: "",
        modulePermission: [],
      },
    ],
    createdBy: userRole,
    createdOn: new Date().toLocaleDateString(),
    associatedBusinessEntity: "",
  });
  const [updateRole, setUpdateRole] = useState<any>(props.roleNameIndex);
  // console.log(updateRole);

  useEffect(() => {
    setRoleDetails({
      ...roleDetails,
      roleName: props.roleNameIndex.roleName,
    });
    // setUpdateRole({ ...props.roleNameIndex });
  }, [props.roleNameIndex]);

  const data = {
    roleName: updateRole.roleName,
    permissions: updateRole.permissions,
    createdBy: updateRole.createdBy,
    associatedBusinessEntity: updateRole.associatedBusinessEntity,
  };

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

  // form handle submission function
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // data.permissions.shift();
    const getData = async () => {
      const response = await updateRolePermission(
        props.roleNameIndex._id,
        data
      );
      console.log(response);
      setResponse(response);
    };
    getData();

    let msg, color;
    if (response === 201) {
      color = "linear-gradient(to right, #00b09b, #96c93d)";
      msg = "Role and Permission Updated Successfully";
      showToastmsg(msg, color);
      // exit();
    } else if (response === 401) {
      color = "blue";
      msg = "You don't have access to update this role!";
      showToastmsg(msg, color);
    } else if (response === 400) {
      color = "red";
      msg = "Something Went Wromg";
      showToastmsg(msg, color);
    }

    console.log("final details", data);
  };

  const handlecheckChange = (event: any, item: any, index: any) => {
    let checkName = "";
    setChecked({
      [event.target.name]: event.target.checked,
    });
    // console.log(checked);
    if (checked) {
      checkName = event.target.name;
    }
    setUpdateRole((prevState: { permissions: any[] }) => {
      const permissionIndex = prevState.permissions.findIndex(
        (p: { moduleName: string[] }) => p.moduleName === item
      );
      if (permissionIndex >= 0) {
        // moduleName already exists, so add/remove permission to/from modulePermission array
        const modulePermissionIndex =
          prevState.permissions[permissionIndex].modulePermissions.indexOf(
            checkName
          );
        if (modulePermissionIndex >= 0) {
          // permission already exists, so remove it
          const updatedModulePermission = [
            ...prevState.permissions[permissionIndex].modulePermissions,
          ];
          updatedModulePermission.splice(modulePermissionIndex, 1);
          const updatedPermissions = [...prevState.permissions];
          if (updatedModulePermission.length > 0) {
            // update modulePermission array
            updatedPermissions[permissionIndex] = {
              ...updatedPermissions[permissionIndex],
              modulePermissions: updatedModulePermission,
            };
          } else {
            // remove object from permissions array
            updatedPermissions.splice(permissionIndex, 1);
          }
          return { ...prevState, permissions: updatedPermissions };
        } else {
          // permission not present, so add it to modulePermission array
          const updatedPermissions = [...prevState.permissions];
          const updatedModulePermission = [
            ...updatedPermissions[permissionIndex].modulePermissions,
            checkName,
          ];
          updatedPermissions[permissionIndex] = {
            ...updatedPermissions[permissionIndex],
            modulePermissions: updatedModulePermission,
          };
          return { ...prevState, permissions: updatedPermissions };
        }
      } else {
        // moduleName not present, so add new object to permissions array
        const newPermission = {
          moduleName: item,
          modulePermissions: [checkName],
        };
        const updatedPermissions = [...prevState.permissions, newPermission];
        return { ...prevState, permissions: updatedPermissions };
      }
    });

    // console.log("checkedItems: ", checked, checkName, item);
    // console.log("updateROle: ", updateRole);
  };

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    // console.log(value);
    setRoleDetails({ ...roleDetails, roleName: value });
  };

  // const handleChange = (event: any) => {
  //   setEntityNameValue(event.target.value);
  //   isAbg &&
  //     setRoleDetails({
  //       ...roleDetails,
  //       roleName: event.target.value + "_SUPER_ADMIN",
  //       associatedBusinessEntity: event.target.value,
  //     });
  // };

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
            Update Role
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* ------------------Radio button for ABG------------------ */}
          {/* {userEntity === "ABG" && (
            <Row>
              <p className="col-md-2">Role for ABG? - </p>
              <div
                className="col-md-1"
                onClick={() => {
                  setIsAbg("Yes");
                }}
              >
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="isABG"
                    value="Yes"
                    className="radio checked:bg-blue-500"
                    checked={isAbg === "Yes"}
                  />
                  <span className="label-text">Yes</span>
                </label>
              </div>
              <div
                className="col-md-1"
                onClick={() => {
                  setIsAbg("No");
                }}
              >
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="isABG"
                    value="No"
                    className="radio checked:bg-red-500"
                    checked={isAbg === "No"}
                  />
                  <span className="label-text">No</span>
                </label>
              </div>
            </Row>
          )} */}
          {/* ------------------End of Radio button for ABG------------------ */}

          {/* ------------------Input elements for role and entity------------------ */}

          <Form.Group as={Row} className="mb-3">
            <Col md={6}>
              <Form.Label htmlFor="simpleinput" className="">
                Role Name -
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  id="simpleinput"
                  placeholder="Role Name"
                  name="roleName"
                  disabled={true}
                  value={roleDetails.roleName}
                  onChange={handleInputChange}
                />
              </Col>
            </Col>
            {/* {isAbg !== "Yes" && (
              <Col md={6}>
                <Form.Label htmlFor="simpleinput" className="">
                  Select Entity Name
                </Form.Label>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    className="roleName"
                    onChange={handleChange}
                  >
                    <option>Select Role</option>
                    {entityNames.map((item: any, index: number) => {
                      return (
                        <option value={item.companyName}>
                          {item.companyName}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Col>
            )} */}
          </Form.Group>
          {/* ------------------End of input elements for role and entity------------------ */}
          <Card>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                {isAbg === "Yes" ? (
                  <div className="table-responsive">
                    <Table className="mb-0" bordered>
                      <thead>
                        <tr>
                          <th scope="col">Module Name</th>
                          <th scope="col">View</th>
                          <th scope="col">Add</th>
                          <th scope="col">Update</th>
                          <th scope="col">Download</th>
                          <th scope="col">Upload</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(props.roleNameIndex.permissions || []).map(
                          (item: any, index: number) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{item.moduleName}</th>
                                <td>
                                  <label>
                                    <input
                                      type="checkbox"
                                      value="view"
                                      name="view"
                                      defaultChecked={item.modulePermissions.includes(
                                        "view"
                                      )}
                                      onChange={(e) =>
                                        handlecheckChange(
                                          e,
                                          item.moduleName,
                                          index
                                        )
                                      }
                                    />
                                  </label>
                                </td>
                                <td>
                                  <label>
                                    <input
                                      type="checkbox"
                                      value="add"
                                      name="add"
                                      defaultChecked={item.modulePermissions.includes(
                                        "add"
                                      )}
                                      onChange={(e) =>
                                        handlecheckChange(
                                          e,
                                          item.moduleName,
                                          index
                                        )
                                      }
                                    />
                                  </label>
                                </td>
                                <td>
                                  <label>
                                    <input
                                      type="checkbox"
                                      value="update"
                                      name="update"
                                      defaultChecked={item.modulePermissions.includes(
                                        "update"
                                      )}
                                      onChange={(e) =>
                                        handlecheckChange(
                                          e,
                                          item.moduleName,
                                          index
                                        )
                                      }
                                    />
                                  </label>
                                </td>
                                <td>
                                  <label>
                                    <input
                                      type="checkbox"
                                      value="download"
                                      name="download"
                                      defaultChecked={item.modulePermissions.includes(
                                        "download"
                                      )}
                                      onChange={(e) =>
                                        handlecheckChange(
                                          e,
                                          item.moduleName,
                                          index
                                        )
                                      }
                                    />
                                  </label>
                                </td>
                                <td>
                                  <label>
                                    <input
                                      type="checkbox"
                                      value="upload"
                                      name="upload"
                                      defaultChecked={item.modulePermissions.includes(
                                        "upload"
                                      )}
                                      onChange={(e) =>
                                        handlecheckChange(
                                          e,
                                          item.moduleName,
                                          index
                                        )
                                      }
                                    />
                                  </label>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table className="mb-0" bordered>
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">View</th>
                          <th scope="col">Add</th>
                          <th scope="col">Update</th>
                          <th scope="col">Download</th>
                          <th scope="col">Upload</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(entityModule || []).map(
                          (item: any, index: number) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{item}</th>
                                <td>
                                  <label>
                                    <input
                                      type="checkbox"
                                      value="view"
                                      name="view"
                                      onChange={(e) =>
                                        handlecheckChange(e, item, index)
                                      }
                                    />
                                  </label>
                                </td>
                                <td>
                                  <label>
                                    <input
                                      type="checkbox"
                                      value="add"
                                      name="add"
                                      onChange={(e) =>
                                        handlecheckChange(e, item, index)
                                      }
                                    />
                                  </label>
                                </td>
                                <td>
                                  <label>
                                    <input
                                      type="checkbox"
                                      value="update"
                                      name="update"
                                      onChange={(e) =>
                                        handlecheckChange(e, item, index)
                                      }
                                    />
                                  </label>
                                </td>
                                <td>
                                  <label>
                                    <input
                                      type="checkbox"
                                      value="download"
                                      name="download"
                                      onChange={(e) =>
                                        handlecheckChange(e, item, index)
                                      }
                                    />
                                  </label>
                                </td>
                                <td>
                                  <label>
                                    <input
                                      type="checkbox"
                                      value="upload"
                                      name="upload"
                                      onChange={(e) =>
                                        handlecheckChange(e, item, index)
                                      }
                                    />
                                  </label>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  </div>
                )}
                <Button
                  type="submit"
                  className="bubmitButton"
                  onClick={handleSubmit}
                >
                  Submit form
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default UpdateRole;
