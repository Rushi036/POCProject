import React, { useState, useEffect } from 'react';
import { Row, Col, Toast, } from 'react-bootstrap';
import AwsTable from './awsTable';
import AzureTable from './azureTable';

type ComponentType = 'select' | 'aws' | 'azure';

function ProvisioningTemplate() {
    const [show, setShow] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState<ComponentType>('select');

    const handleComponentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log(selectedComponent)
        // console.log(event.target.value)
        setSelectedComponent(event.target.value as ComponentType);
    };
    // async function handleSubmit(e: any) {
    //     e.preventDefault()
    //     setShow(true);
    //     console.log(cloud)

    //     if (cloud === "AWS") {
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");

    //         var aws = JSON.stringify({
    //             "cloud": "AWS",
    //             "terraform_data": {
    //                 "ami": "ami-0f8ca728008ff5af4",
    //                 "instance_type": "t2.micro",
    //                 "name": "single-instance",
    //                 "key_name": "user1",
    //                 "monitoring": "true",
    //                 "vpc_security_group_ids": "sg-0a6a237fd75a777a9",
    //                 "subnet_id": "subnet-0caff162e254ea794",
    //                 "cpu_core_count": "",
    //                 "cpu_threads_per_core": "",
    //                 "cpu_credits": "",
    //                 "disable_api_termination": "",
    //                 "kms_key_id": "",
    //                 "snapshot_id": "",
    //                 "source_dest_check": "",
    //                 "create_spot_instance": "",
    //                 "iam_instance_profile": "",
    //                 "ebs_optimized": "",
    //                 "enable_volume_tags": "",
    //                 "hibernation": "",
    //                 "ipv6_address_count": "",
    //                 "ipv6_addresses": "",
    //                 "launch_template": "",
    //                 "private_ip": "",
    //                 "tenancy": "",
    //                 "Environment": "Test",
    //                 "device_name": "/dev/sda1",
    //                 "volume_type": "gp3",
    //                 "volume_size": "8",
    //                 "delete_on_termination": "true",
    //                 "encrypted": "false",
    //                 "iops": "100",
    //                 "role-name": "testing",
    //                 "availability_zone": "ap-south-1a",
    //                 "associate_public_ip_address": "true",
    //                 "ApplicationName": "ABG",
    //                 "ApplicationOwner": "ME",
    //                 "EmailID": "xys.om",
    //                 "Business": "None of ur",
    //                 "target_group_arn": "null",
    //                 "target_id": "null",
    //                 "port": "0"
    //             },
    //             "status": "new",
    //             "approved": false
    //         });

    //         var requestOptions: any = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: aws,
    //             redirect: 'follow'
    //         };

    //         await fetch("http://13.233.97.237:8000/terraform", requestOptions)
    //             .then(response => response.json())
    //             .then(result => console.log(result))
    //             .catch(error => console.log('error', error));

    //     } else if (cloud === "Azure") {
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");

    //         var azure = JSON.stringify({
    //             "cloud": "AZURE",
    //             "terraform_data": {
    //                 "resource_group_name": "Demo-ABG1",
    //                 "location": "East US",
    //                 "virtual_network_name": "Demo-ABG",
    //                 "virtual_network_address_space": ["10.0.0.0/16"],
    //                 "subnet_name": "Demo-ABG",
    //                 "subnet_address_prefixes": ["10.0.1.0/24"],
    //                 "public_ip_name": "true",
    //                 "network_interface_name": "Demo-ABG",
    //                 "vm_name": "Demo-ABG",
    //                 "vm_admin_username": "testadmin",
    //                 "vm_admin_password": "Password1234!",
    //                 "image_publisher": "Canonical",
    //                 "image_offer": "UbuntuServer",
    //                 "image_sku": "16.04-LTS",
    //                 "image_version": "latest",
    //                 "os_disk_name": "my-vm-os-disk",
    //                 "os_disk_caching": "ReadWrite",
    //                 "os_disk_create_option": "FromImage",
    //                 "os_disk_managed_disk_type": "Standard_LRS",
    //                 "size": "Standard_DS1_v2",
    //                 "key_name": "user1"
    //             }
    //         })
    //         var requestOptions: any = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: azure,
    //             redirect: 'follow'
    //         };

    //         await fetch("http://13.127.246.43:8000/terraform", requestOptions)
    //             .then(response => response.json())
    //             .then(result => console.log(result))
    //             .catch(error => console.log('error', error));
    //     }
    // }

    return (
        <>
            <div className="container-fluid">
                <Row className='text-center toast-container position-absolute p-3'>
                    <Col xs={8}>
                        <Toast className="toast" role="alert" onClose={() => setShow(false)} show={show} delay={9000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">Provisioning started</strong>
                                <small>at now</small>
                            </Toast.Header>
                            <Toast.Body>Your provisioning has been started. You will receive a mail once provisioned.</Toast.Body>
                        </Toast>
                    </Col>
                </Row>
                <Row className='text-center mt-3'>
                    <Col>
                        <h3>You can provision the template from here!</h3>
                    </Col>
                </Row>
            </div>
            <div className='container-fluid text-center mt-3'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-6 text-center align-center '>
                        <label htmlFor="component-select" className='form-label'>Please select the cloud</label>
                        <select className='form-select text-center' id="component-select" value={selectedComponent} onChange={(event) => { handleComponentChange(event) }}>
                            <option value="select">Select</option>
                            <option value="aws">Aws</option>
                            <option value="azure">Azure</option>
                        </select>
                    </div>
                </div>
            </div>
            {selectedComponent === 'aws' && <AwsTable />}
            {selectedComponent === 'azure' && <AzureTable />}
        </>
    );
}

export default ProvisioningTemplate;