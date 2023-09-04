import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Button, Card, Dropdown } from "react-bootstrap";
import PageHeading from "../../components/PageHeading.component";
import GlobalSearch from "../react-table/globalSearch";
import Maintable from "../react-table/mainTable";
import "../react-table/table.css";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import * as XLSX from "xlsx";
import AddUser from "./addUser.modal";
import { fetchbeUsers, fetchsingleUsers } from "../../helpers/userAPIs";
import EditUser from "./editUser.modal";
import { ReactComponent as Loading } from "../../assets/svg/Spin-1s-164px.svg";
const CredentialManagement = () => {
  const userDetails = JSON.parse(sessionStorage.getItem("User")!);
  // const permission = userDetails.permissions.permissions[0].modulePermissions;
  const userEntity = userDetails.verifiedUser.businessEntity;
  const userRole = userDetails.verifiedUser.userRole;
  const userName = userDetails.verifiedUser.userName;
  interface Data {
    _id: string;
    userName: string;
    userEmail: string;
    phoneNumber: number;
    businessEntity: string;
    userStatus: number;
    userRole: string;
  }

  //  States for the different usages are defined here
  const [data, setData] = useState([]);
  const [beUsersLoading, setBeUsersLoading] = useState(true);
  const [singleUserLoading, setSingleUsersLoading] = useState(true);
  const [AddmodalShow, setAddModalShow] = useState(false);
  const [EditmodalShow, setEditModalShow] = useState(false);
  const [singleUserData, setSingleUSerData] = useState({
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
  });

  //Function to fetch all the user according to BE
  useEffect(() => {
    const getData = async () => {
      await fetchbeUsers(userEntity).then((fetchData) => {
        setBeUsersLoading(false);
        setData(fetchData.data);
      });
    };
    getData();
  }, [userEntity, EditmodalShow, AddmodalShow]);

  //Edit function to fetch single user detail
  const handleEdit = (e: any, cell: any) => {
    setEditModalShow(true);
    const getData = async () => {
      await fetchsingleUsers(cell.value).then((userData) => {
        setSingleUSerData(userData.data);
        console.log(userData.data);
        setSingleUsersLoading(false);
      });
    };
    getData();
  };

  // Column defines here and the properties of the headers
  const columns = useMemo<Column<Data>[]>(
    () => [
      {
        Header: "User Name",
        accessor: "userName",
        sort: true,
      },
      {
        Header: "Email",
        accessor: "userEmail",
        sort: true,
      },
      {
        Header: "Mobile Number",
        accessor: "phoneNumber",
        sort: true,
      },
      {
        Header: "Business Entity",
        accessor: "businessEntity",
        sort: true,
      },
      {
        Header: "Status",
        accessor: "userStatus",
        sort: true,
      },
      {
        Header: "Role",
        accessor: "userRole",
        sort: true,
      },
      {
        Header: "Edit",
        accessor: "_id",
        sort: true,
        Cell: ({ cell }: any) => (
          <div>
            <button
              onClick={(e) => {
                console.log(cell);
                handleEdit(e, cell);
              }}
              disabled={cell.row.values.userName === userName ? true : false}
              className="btn btn-primary"
            >
              <i className="bi bi-pencil-square"> Edit</i>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Table instance and its properties are called here
  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Taking out some properties and methods from the table instance
  const { allColumns } = tableInstance;

  // Download xlsx file function is defined here
  const handleDownload = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "FileName.xlsx");
  };
  return (
    <>
      <Row>
        <Col>
          <PageHeading title="Business Entity" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className="mb-2">
                {/* Global Search for the main table is called here */}
                <GlobalSearch tableInstance={tableInstance} />

                <Col className="d-flex justify-content-end">
                  <Button
                    className="me-2"
                    disabled={tableInstance.page ? false : true}
                    variant="primary"
                    onClick={handleDownload}
                  >
                    Download <i className="bi bi-arrow-down"></i>
                  </Button>
                  <Dropdown className="me-2">
                    <Dropdown.Toggle
                      variant="primary"
                      id="dropdown-basic"
                      disabled={tableInstance.page ? false : true}
                    >
                      Select Columns
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {allColumns.map((column) => (
                        // console.log(column)
                        <Dropdown.Item key={column.id}>
                          <label>
                            <input
                              type="checkbox"
                              {...column.getToggleHiddenProps()}
                            />{" "}
                            {column.Header}
                          </label>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button
                    variant="primary"
                    onClick={() => setAddModalShow(true)}
                  >
                    Add User
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <AddUser
                    show={AddmodalShow}
                    onHide={() => {
                      setAddModalShow(false);
                      // getData();
                    }}
                  />
                </Col>
                <Col>
                  <EditUser
                    singleUserData={singleUserData}
                    show={EditmodalShow}
                    loading={singleUserLoading}
                    onHide={() => {
                      setEditModalShow(false);
                      // getData();
                    }}
                  />
                </Col>
              </Row>
              {beUsersLoading ? (
                <Loading />
              ) : tableInstance.page ? (
                <Maintable tableInstance={tableInstance} />
              ) : (
                <h3>No Data Found</h3>
              )}
              {/* Pagination for the table is called here */}
              {/* <Pagination tableInstance={tableInstance} /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CredentialManagement;
