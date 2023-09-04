import React, { useEffect, useState, useMemo } from "react";
import { Row, Col, Dropdown, Button, Card } from "react-bootstrap";
import {
  Column,
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import AddServiceCatelogue from "./addServiceCatelogue";
import ViewServiceCatelogueData from "./viewIndividualService";
import "../react-table/table.css";
import * as XLSX from "xlsx";
import Maintable from "../react-table/mainTable";
import Pagination from "../react-table/pagination";
import GlobalSearch from "../react-table/globalSearch";
import EditIndividualService from "./editIndividualService";
import {
  fetchServices,
  fetchSingleService,
} from "../../helpers/serviceCatalogueAPIs";
import { ReactComponent as Loading } from "../../assets/svg/Spin-1s-164px.svg";

// Interface for the table columns
interface Data {
  _id: string;
  serviceGroupName: string;
  serviceName: string;
  productDescription: {
    description: string;
    keyPoints: string[];
  };
  serviceScope: string[];
  baseCost: string;
  billingType: string;
  serviceDelivery: {
    serviceInitiation: string;
    serviceSupport: string;
  };
  prerequisite_Dependency: string[];
  serviceExclusions: string[];
  featureList: {
    featureName: string;
    deliverables: string[];
  }[];
  serviceLevelSpecifications: {
    serviceParameter: string;
    serviceLevelDescription: string[];
  }[];
  serviceStatus: string;
}

function ServiceCatelogue() {
  // Function to call all the services
  useEffect(() => {
    const getData = async () => {
      await fetchServices().then((fetchData) => {
        setAllServiceLoading(false);
        setData(fetchData.data);
      });
    };
    getData();
  }, []);

  //  States for the different usages are defined here
  const [data, setData] = useState([]);
  const [allServiceloading, setAllServiceLoading] = useState(true);
  const [singleServiceloading, setSingleServiceLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState({
    serviceGroupName: "",
    serviceName: "",
    productDescription: { description: "", keyPoints: [] },
    serviceScope: [],
    prerequisite_Dependency: [],
    serviceExclusions: [],
    serviceDelivery: {
      serviceInitiation: "",
      serviceSupport: "",
    },
    featureList: [
      {
        featureName: "",
        deliverables: [],
      },
    ],
    serviceLevelSpecifications: [
      {
        serviceParameter: "",
        serviceLevelDescription: [],
      },
    ],
    baseCost: "",
    billingType: "",
    serviceStatus: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [editData, setEditData] = useState(false);
  let idvalue = "";

  // Function to view all the data inside the model
  function handleViewMore(e: any, cell: any) {
    setViewData(true);
    idvalue = cell.value;
    // console.log(idvalue)
    // console.log("idvalue is- ", idvalue)

    const getData = async () => {
      await fetchSingleService(idvalue).then((fetchData) => {
        setSingleServiceLoading(false);
        setApiResponse(fetchData.data);
      });
    };
    getData();
  }

  // Function to edit the service
  function handleEdit(e: any, cell: any) {
    setEditData(true);
    // console.log(e, cell)
    idvalue = cell.value;
    // console.log(idvalue)
    // console.log("idvalue is- ", idvalue)
    const getData = async () => {
      const fetchedData = await fetchSingleService(idvalue);
      console.log(fetchedData.data);
      setApiResponse(fetchedData.data);
    };
    getData();
  }

  // Column defines here and the properties of the headers
  const columns = useMemo<Column<Data>[]>(
    () => [
      {
        Header: "Service Group Name",
        accessor: "serviceGroupName",
      },
      {
        Header: "Service Name",
        accessor: "serviceName",
      },
      {
        Header: "Base Cost",
        accessor: "baseCost",
      },
      {
        Header: "Billing Type",
        accessor: "billingType",
      },
      {
        Header: "Service Status",
        accessor: "serviceStatus",
      },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ cell }: any) => (
          <div className="btn-group">
            <button
              onClick={(e) => {
                handleViewMore(e, cell);
              }}
              className="btn btn-primary me-1"
            >
              <i className="bi bi-eye"> View</i>
            </button>
            <button
              onClick={(e) => {
                handleEdit(e, cell);
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
            <h4 className="page-title">Service Catelogue</h4>
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
                    variant="primary"
                    disabled={tableInstance.page ? false : true}
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
                    Add Service Catelogue
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <AddServiceCatelogue
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <ViewServiceCatelogueData
                    apiresponse={apiResponse}
                    loading={singleServiceloading}
                    show={viewData}
                    onHide={() => setViewData(false)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <EditIndividualService
                    apiresponse={apiResponse}
                    loading={singleServiceloading}
                    show={editData}
                    onHide={() => setEditData(false)}
                  />
                </Col>
              </Row>

              {/* Main table is called here */}
              {allServiceloading ? (
                <Loading />
              ) : tableInstance.page ? (
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

export default ServiceCatelogue;
