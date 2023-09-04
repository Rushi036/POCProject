import React, { useEffect, useState, useMemo } from "react";
import { Row, Col, Dropdown, Button, Card } from "react-bootstrap";
import {
  Column,
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import "../react-table/table.css";
import Maintable from "../react-table/mainTable";
import Pagination from "../react-table/pagination";
import GlobalSearch from "../react-table/globalSearch";
import AwsOrder from "./awsOrder";
import AwsData from "./awsData";
import { config } from "../../config";

function AwsTable() {
  useEffect(() => {
    fetch(`${config.API_URL}/getawsorders`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data.data);
      });
  }, []);

  // Interface for the table columns
  interface Data {
    _id: String;
    cloud: String;
    ami: String;
    instance_type: String;
    name: String;
    key_name: String;
    monitoring: String;
    vpc_security_group_ids: String;
    subnet_id: String;
    cpu_core_count: String;
    cpu_threads_per_core: String;
    cpu_credits: String;
    disable_api_termination: String;
    kms_key_id: String;
    snapshot_id: String;
    source_dest_check: String;
    create_spot_instance: String;
    iam_instance_profile: String;
    ebs_optimized: String;
    enable_volume_tags: String;
    hibernation: String;
    ipv6_address_count: String;
    ipv6_addresses: String;
    launch_template: String;
    private_ip: String;
    tenancy: String;
    Environment: String;
    device_name: String;
    volume_type: String;
    volume_size: String;
    delete_on_termination: String;
    encrypted: String;
    iops: String;
    role_name: String;
    availability_zone: String;
    associate_public_ip_address: String;
    ApplicationName: String;
    ApplicationOwner: String;
    EmailID: String;
    Business: String;
    target_group_arn: String;
    target_id: String;
    port: String;
    status: String;
    approved: Boolean;
    provisioned: Boolean;
    order_created_at: String;
    provisioned_at: String;
    ec2_instance_id: String;
    ec2_public_ip: String;
    ec2_pem_path: String;
  }

  //  States for the different usages are defined here
  const [data, setData] = useState([]);
  let idvalue = "";
  const [apiResponse, setApiResponse] = useState({});
  // Below these are states for the models
  const [addOrder, setAddOrder] = useState(false);
  const [viewOrder, setViewOrder] = useState(false);

  // Function to view all the data inside the model
  function handleViewMore(e: any, cell: any) {
    setViewOrder(true);
    idvalue = cell.value;
    // console.log("idvalue is- ", idvalue)
    fetch(`http://localhost:5000/api/getsingleawsorder/${idvalue}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data.data)
        setApiResponse(data.data);
      });
  }

  // Column defines here and the properties of the headers
  const columns = useMemo<Column<Data>[]>(
    () => [
      {
        Header: "Cloud",
        accessor: "cloud",
        sort: true,
      },
      {
        Header: "Instance Type",
        accessor: "instance_type",
        sort: true,
      },
      {
        Header: "Name",
        accessor: "name",
        sort: true,
      },
      {
        Header: "Status",
        accessor: "status",
        sort: true,
      },
      {
        Header: "Approved",
        accessor: "approved",
        sort: true,
      },
      {
        Header: "Provisioned",
        accessor: "provisioned",
        sort: true,
      },
      {
        Header: "Order received",
        accessor: "order_created_at",
        sort: true,
      },
      {
        Header: "View",
        accessor: "_id",
        Cell: ({ cell }: any) => (
          <div>
            <button
              onClick={(e) => {
                handleViewMore(e, cell);
              }}
              className="btn btn-primary"
            >
              <i className="bi bi-eye"> View More</i>
            </button>
          </div>
        ),
      },
      {
        Header: "Provision",
        Cell: ({ cell }: any) => (
          <div>
            <button
              onClick={(e) => {
                handleSubmit(e, cell);
              }}
              className="btn btn-primary"
            >
              <i className="bi bi-eye"> Provision Now</i>
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

  // Api call is done here to get all the new orders of aws
  useEffect(() => {
    fetch("http://localhost:5000/api/getawsorders")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data.data)
        setData(data.data);
      });
  }, []);

  // Function to provision the new order immediately
  function handleSubmit(e: any, cell: any) {
    fetch("http://13.235.134.121:8000/terraform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cloud: "AWS" }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // setApiResponse(data.data)
      });
  }

  return (
    <>
      <Row>
        <Col>
          <div className="page-title-box">
            <h4 className="page-title">Aws Service Order</h4>
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
                  <Dropdown className="me-2">
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
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
                  <Button variant="primary" onClick={() => setAddOrder(true)}>
                    Add Aws Order
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <AwsOrder show={addOrder} onHide={() => setAddOrder(false)} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <AwsData
                    apiresponse={apiResponse}
                    show={viewOrder}
                    onHide={() => setViewOrder(false)}
                  />
                </Col>
              </Row>

              {/* Main table is called here */}
              <Maintable tableInstance={tableInstance} />

              {/* Pagination for the table is called here */}
              <Pagination tableInstance={tableInstance} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AwsTable;
