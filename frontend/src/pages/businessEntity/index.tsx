import React, { useEffect, useState, useMemo } from "react";
import { Row, Col, Dropdown, Button, Card } from "react-bootstrap";
import {
  Column,
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import AddBusinessEntity from "./addBusinessEntity";
import "../react-table/table.css";
import * as XLSX from "xlsx";
import Maintable from "../react-table/mainTable";
import Pagination from "../react-table/pagination";
import GlobalSearch from "../react-table/globalSearch";
import EditBusinessEntity from "./editBusinessEntity";
import { fetchSingleBE, fetchallBE } from "../../helpers/businessEntityAPIs";

function BusinessEntity() {
  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchallBE();
      setData(fetchedData.data);
      // console.log(fetchedData);
    };
    getData();
  }, []);

  // Interface for the table columns
  interface Data {
    _id: string;
    companyName: string;
    companyAddress: string;
    city: string;
    state: string;
    pincode: number;
    country: string;
    contactPersonName: string;
    contactPersonPhoneNumber: number;
    contactPersonEmailAddress: string;
  }

  //  States for the different usages are defined here
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const [viewData, setViewData] = useState(false);
  let id = "";

  // Function to edit the business entity details
  function handleUpdate(e: any, cell: any) {
    setViewData(true);
    id = cell.value;
    const getData = async () => {
      const fetchedData = await fetchSingleBE(id);
      // console.log(fetchedData.data);
      setApiResponse(fetchedData.data);
    };
    getData();
  }

  // Column defines here and the properties of the headers
  const columns = useMemo<Column<Data>[]>(
    () => [
      {
        Header: "Company Name",
        accessor: "companyName",
        sort: true,
      },
      {
        Header: "Company Address",
        accessor: "companyAddress",
        sort: true,
      },
      {
        Header: "City",
        accessor: "city",
        sort: true,
      },
      {
        Header: "State",
        accessor: "state",
        sort: true,
      },
      // {
      //     Header: "Pincode",
      //     accessor: 'pincode',
      //     sort: true
      // },
      // {
      //     Header: "Country",
      //     accessor: 'country',
      //     sort: true
      // },
      {
        Header: "Contact Person Name",
        accessor: "contactPersonName",
        sort: true,
      },
      {
        Header: "Contact Person Number",
        accessor: "contactPersonPhoneNumber",
        sort: true,
      },
      // {
      //     Header: "Contact Person Email",
      //     accessor: 'contactPersonEmailAddress',
      //     sort: true
      // },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ cell }: any) => (
          <div>
            <button
              onClick={(e) => {
                handleUpdate(e, cell);
              }}
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
          <div className="page-title-box">
            <h4 className="page-title">Business Entity</h4>
          </div>
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
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                    Add Business Entity
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <AddBusinessEntity
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <EditBusinessEntity
                    apiresponse={apiResponse}
                    show={viewData}
                    onHide={() => setViewData(false)}
                  />
                </Col>
              </Row>

              {/* Main table is called here */}
              {tableInstance.page ? (
                <Maintable tableInstance={tableInstance} />
              ) : (
                <h3>No Data Found</h3>
              )}

              {/* Pagination for the table is called here */}
              <Pagination tableInstance={tableInstance} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default BusinessEntity;
