import { Button, Card, Modal } from 'react-bootstrap';

function AwsData(props: any) {
    // console.log(props)
    const orderdata = props.apiresponse


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
                        AWS Order Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <table>
                                <tr>
                                    <th>Cloud</th>
                                    <td>{orderdata.cloud}</td>
                                </tr>
                                <tr>
                                    <th>Ami-id</th>
                                    <td>{orderdata.ami}</td>
                                </tr>
                                <tr>
                                    <th>Instance Type</th>
                                    <td>{orderdata.instance_type}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{orderdata.name}</td>
                                </tr>
                                <tr>
                                    <th>Key Name</th>
                                    <td>{orderdata.key_name}</td>
                                </tr>
                                <tr>
                                    <th>Monitoring</th>
                                    <td>{orderdata.monitoring}</td>
                                </tr>
                                <tr>
                                    <th>VPC Security Group Ids</th>
                                    <td>{orderdata.vpc_security_group_ids}</td>
                                </tr>
                                <tr>
                                    <th>Subnet Id</th>
                                    <td>{orderdata.subnet_id}</td>
                                </tr>
                                <tr>
                                    <th>CPU Core Count</th>
                                    <td>{orderdata.cpu_core_count}</td>
                                </tr>
                                <tr>
                                    <th>CPU Threads Per Core</th>
                                    <td>{orderdata.cpu_threads_per_core}</td>
                                </tr>
                                <tr>
                                    <th>CPU Credits</th>
                                    <td>{orderdata.cpu_credits}</td>
                                </tr>
                                <tr>
                                    <th>Disable Api Termination</th>
                                    <td>{orderdata.disable_api_termination}</td>
                                </tr>
                                <tr>
                                    <th>Kms Key Id</th>
                                    <td>{orderdata.kms_key_id}</td>
                                </tr>
                                <tr>
                                    <th>Snapshot Id</th>
                                    <td>{orderdata.snapshot_id}</td>
                                </tr>
                                <tr>
                                    <th>Source Dest Check</th>
                                    <td>{orderdata.source_dest_check}</td>
                                </tr>
                                <tr>
                                    <th>Create Spot Instance</th>
                                    <td>{orderdata.create_spot_instance}</td>
                                </tr>
                                <tr>
                                    <th>IAM Instance Profile</th>
                                    <td>{orderdata.iam_instance_profile}</td>
                                </tr>
                                <tr>
                                    <th>Ebs Optimized</th>
                                    <td>{orderdata.ebs_optimized}</td>
                                </tr>
                                <tr>
                                    <th>Enable Volume Tags</th>
                                    <td>{orderdata.enable_volume_tags}</td>
                                </tr>
                                <tr>
                                    <th>Hibernation</th>
                                    <td>{orderdata.hibernation}</td>
                                </tr>
                                <tr>
                                    <th>Ipv6 Address Count</th>
                                    <td>{orderdata.ipv6_address_count}</td>
                                </tr>
                                <tr>
                                    <th>Ipv6 Addresses</th>
                                    <td>{orderdata.ipv6_addresses}</td>
                                </tr>
                                <tr>
                                    <th>Launch Template</th>
                                    <td>{orderdata.launch_template}</td>
                                </tr>
                                <tr>
                                    <th>Private Ip</th>
                                    <td>{orderdata.private_ip}</td>
                                </tr>
                                <tr>
                                    <th>Tenancy</th>
                                    <td>{orderdata.tenancy}</td>
                                </tr>
                                <tr>
                                    <th>Environment</th>
                                    <td>{orderdata.Environment}</td>
                                </tr>
                                <tr>
                                    <th>Device Name</th>
                                    <td>{orderdata.device_name}</td>
                                </tr>
                                <tr>
                                    <th>Volume Type</th>
                                    <td>{orderdata.volume_type}</td>
                                </tr>
                                <tr>
                                    <th>Volume Size</th>
                                    <td>{orderdata.volume_size}</td>
                                </tr>
                                <tr>
                                    <th>Delete on Termination</th>
                                    <td>{orderdata.delete_on_termination}</td>
                                </tr>
                                <tr>
                                    <th>Encrypted</th>
                                    <td>{orderdata.encrypted}</td>
                                </tr>
                                <tr>
                                    <th>Iops</th>
                                    <td>{orderdata.iops}</td>
                                </tr>
                                <tr>
                                    <th>Role Name</th>
                                    <td>{orderdata.role_name}</td>
                                </tr>
                                <tr>
                                    <th>Availability Zone</th>
                                    <td>{orderdata.availability_zone}</td>
                                </tr>
                                <tr>
                                    <th>Associate Public Ip Address</th>
                                    <td>{orderdata.associate_public_ip_address}</td>
                                </tr>
                                <tr>
                                    <th>Application Name</th>
                                    <td>{orderdata.ApplicationName}</td>
                                </tr>
                                <tr>
                                    <th>Application Owner</th>
                                    <td>{orderdata.ApplicationOwner}</td>
                                </tr>
                                <tr>
                                    <th>EmailId</th>
                                    <td>{orderdata.EmailID}</td>
                                </tr>
                                <tr>
                                    <th>Business</th>
                                    <td>{orderdata.Business}</td>
                                </tr>
                                <tr>
                                    <th>Target Group Arn</th>
                                    <td>{orderdata.target_group_arn}</td>
                                </tr>
                                <tr>
                                    <th>Target Id</th>
                                    <td>{orderdata.target_id}</td>
                                </tr>
                                <tr>
                                    <th>Port</th>
                                    <td>{orderdata.port}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{orderdata.status}</td>
                                </tr>
                                <tr>
                                    <th>Approved</th>
                                    <td>{orderdata.approved}</td>
                                </tr>
                                <tr>
                                    <th>Provisioned</th>
                                    <td>{orderdata.provisioned}</td>
                                </tr>
                                <tr>
                                    <th>Order Received At</th>
                                    <td>{orderdata.order_created_at}</td>
                                </tr>
                                <tr>
                                    <th>Order Provisioned At</th>
                                    <td>{orderdata.provisioned_at}</td>
                                </tr>
                                <tr>
                                    <th>Ec2 Instance Id</th>
                                    <td>{orderdata.ec2_instance_id}</td>
                                </tr>
                                <tr>
                                    <th>Ec2 Public Ip</th>
                                    <td>{orderdata.ec2_public_ip}</td>
                                </tr>
                                <tr>
                                    <th>Pem Path</th>
                                    <td>{orderdata.ec2_pem_path}</td>
                                </tr>
                            </table>
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

export default AwsData;