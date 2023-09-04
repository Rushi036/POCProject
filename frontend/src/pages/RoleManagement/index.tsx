import React, { useState, useEffect } from "react";
import PageHeading from "../../components/PageHeading.component";
import Form from "react-bootstrap/Form";
import { Button, Card, Col, Row } from "react-bootstrap";
import "./RoleManagement.css";
import PermissionTable from "../../components/PermissionTable.Component";
import AddRole from "./AddRole.modal";
import UpdateRole from "./updateRole.modal";
import { fetchrolesandpermission } from "../../helpers/roleManagementAPIs";
const _ = require("lodash");
const RoleManagement = () => {
  const [addmodalShow, setAddModalShow] = useState(false);
  const [updatemodalShow, setUpdateModalShow] = useState(false);
  const [modalToggle, setModalToggle] = useState("");
  const [roleNameIndex, setRoleNameIndex] = useState({});
  const [roleName, setRoleName] = useState("");
  const [responseData, setResponseData] = useState([]);

  const userDetails = JSON.parse(sessionStorage.getItem("User")!);

  const userEntity = userDetails.verifiedUser.businessEntity;

  const data = {
    businessEntityName: userEntity,
  };
  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchrolesandpermission(data);
      setResponseData(fetchedData.data);
    };
    getData();
  }, []);

  const handleChange = (event: any) => {
    responseData.forEach(function (item, index) {
      if (item["roleName"] === event.target.value) {
        setRoleNameIndex(responseData[index]);
        setRoleName(event.target.value);
      }
    });
  };

  return (
    <>
      <Row>
        <Col>
          <PageHeading title="Role Management" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="d-flex justify_between">
                {/* <Col> */}
                <div className="w-auto">
                  <Form.Select
                    aria-label="Default select example"
                    className="roleName"
                    onChange={handleChange}
                  >
                    <option>Select Role</option>
                    {responseData ? (
                      responseData.map((item: any, index: number) => {
                        return (
                          <option key={index} value={item.roleName}>
                            {item.roleName}
                          </option>
                        );
                      })
                    ) : (
                      <p>{responseData}</p>
                    )}
                  </Form.Select>
                </div>
                {/* </Col>
                <Col> */}
                <div className="d-flex w-auto ">
                  <div className="col-md-2 addButton">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setAddModalShow(true);
                        setModalToggle("add");
                      }}
                    >
                      Add Role
                    </Button>
                  </div>
                  <div className="col-md-2 addButton">
                    <Button
                      variant="primary"
                      disabled={_.isEmpty(roleNameIndex)}
                      onClick={() => {
                        setUpdateModalShow(true);
                        setModalToggle("update");
                      }}
                    >
                      Edit Role
                    </Button>
                  </div>
                </div>
                {/* </Col> */}
              </Row>
              <Row>
                <Col>
                  {modalToggle === "add" ? (
                    <AddRole
                      show={addmodalShow}
                      onHide={() => setAddModalShow(false)}
                    />
                  ) : (
                    <UpdateRole
                      roleNameIndex={roleNameIndex}
                      roleName={roleName}
                      show={updatemodalShow}
                      onHide={() => setUpdateModalShow(false)}
                    />
                  )}
                </Col>
              </Row>
              <br />
              <PermissionTable roleNameIndex={roleNameIndex} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RoleManagement;
