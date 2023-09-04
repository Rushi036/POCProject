import React, { useEffect, useState, useMemo } from "react";
import { Row, Col, Dropdown, Button, Card } from 'react-bootstrap';
import { Column, useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import '../react-table/table.css';
import Maintable from "../react-table/mainTable";
import Pagination from "../react-table/pagination";
import GlobalSearch from "../react-table/globalSearch";
import AwsOrder from "./awsOrder";
import AzureData from "./azureData";

function AzureTable() {

    // Interface for the table columns
    interface Data {
        _id: String,
        cloud: String,
        resource_group_name: String,
        location: String,
        virtual_network_name: String,
        virtual_network_address_space: [String],
        subnet_name: String,
        subnet_address_prefixes: [String],
        public_ip_name: Boolean,
        network_interface_name: String,
        vm_name: String,
        vm_admin_username: String,
        vm_admin_password: String,
        image_publisher: String,
        image_offer: String,
        image_sku: String,
        image_version: String,
        os_disk_name: String,
        os_disk_caching: String,
        os_disk_create_option: String,
        os_disk_managed_disk_type: String,
        size: String,
        key_name: String,
        status: String,
        approved: String,
        provisioned: String,
        order_created_at: String,
        provisioned_at: String
    };

    //  States for the different usages are defined here
    const [data, setData] = useState([]);
    let idvalue = '';
    const [apiResponse, setApiResponse] = useState({});
    // Below these are states for the models
    const [addOrder, setAddOrder] = useState(false);
    const [viewOrder, setViewOrder] = useState(false)

    // Function to view all the data inside the model
    function handleViewMore(e: any, cell: any) {
        setViewOrder(true)
        idvalue = cell.value
        // console.log("idvalue is- ", idvalue)
        fetch(`http://localhost:5000/api/getsingleazureorder/${idvalue}`)
            .then((res) => { return res.json() })
            .then((data) => {
                // console.log(data.data)
                setApiResponse(data.data)
            })
    };

    // Column defines here and the properties of the headers
    const columns = useMemo<Column<Data>[]>(() =>
        [
            {
                Header: "Cloud",
                accessor: 'cloud',
                sort: true
            },
            {
                Header: "Vm Name",
                accessor: 'vm_name',
                sort: true
            },
            {
                Header: "Image",
                accessor: 'image_offer',
                sort: true
            },
            {
                Header: "Image Sku",
                accessor: 'image_sku',
                sort: true
            },
            {
                Header: "Status",
                accessor: 'status',
                sort: true
            },
            {
                Header: "Approved",
                accessor: 'approved',
                sort: true
            },
            {
                Header: "Provisioned",
                accessor: 'provisioned',
                sort: true
            },
            {
                Header: "Order received",
                accessor: 'order_created_at',
                sort: true
            },
            {
                Header: 'View',
                accessor: "_id",
                Cell: ({ cell }: any) => (
                    <div>
                        <button onClick={(e) => { handleViewMore(e, cell) }} className="btn btn-primary"><i className="bi bi-eye"> View More</i></button>
                    </div>
                )
            },
            {
                Header: 'Provision',
                Cell: <button className="btn btn-primary"><i className="bi bi-cloud-upload"> Provision Now</i></button>,
            },
        ], []
    );

    // Table instance and its properties are called here
    const tableInstance = useTable({
        columns: columns,
        data: data,
    },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    // Taking out some properties and methods from the table instance
    const {
        allColumns,
    } = tableInstance

    // Api call is done here to get all the new orders of azure
    useEffect(() => {
        fetch('http://localhost:5000/api/getazureorders')
            .then((res) => { return res.json() })
            .then((data) => {
                // console.log(data.data)
                setData(data.data)
            })
    }, []);

    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <h4 className="page-title">Azure Service Order</h4>
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
                                            {
                                                allColumns.map((column) => (
                                                    // console.log(column)
                                                    <Dropdown.Item key={column.id}>
                                                        <label >
                                                            <input type="checkbox" {...column.getToggleHiddenProps()} />
                                                            {' '}{column.Header}
                                                        </label>
                                                    </Dropdown.Item>
                                                ))
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Button variant="primary" onClick={() => setAddOrder(true)}>Add Azure Order</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <AwsOrder show={addOrder} onHide={() => setAddOrder(false)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <AzureData apiresponse={apiResponse} show={viewOrder} onHide={() => setViewOrder(false)} />
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

export default AzureTable;