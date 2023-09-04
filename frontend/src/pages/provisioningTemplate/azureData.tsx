import { Button, Card, Modal } from 'react-bootstrap';

function AzureData(props: any) {
    // console.log(props)
    const orderdata = props.apiresponse
    console.log(orderdata)

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
                        AZURE Order Details
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
                                    <th>Resource Group Name</th>
                                    <td>{orderdata.resource_group_name}</td>
                                </tr>
                                <tr>
                                    <th>Location</th>
                                    <td>{orderdata.location}</td>
                                </tr>
                                <tr>
                                    <th>Virtual Network Name</th>
                                    <td>{orderdata.virtual_network_name}</td>
                                </tr>
                                <tr>
                                    <th>Virtual Network Address Space</th>
                                    <td>
                                        {orderdata.virtual_network_address_space?.map(
                                            (items: any, index: any) => {
                                                return (
                                                    <ul key={index}>
                                                        <li>{items}</li>
                                                    </ul>
                                                );
                                            }
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Subnet Name</th>
                                    <td>{orderdata.subnet_name}</td>
                                </tr>
                                <tr >
                                    <th>Subnet Address Prefixes</th>
                                    {orderdata.subnet_address_prefixes?.map((result: string) => (
                                        <td>{result}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th>Public Ip Name</th>
                                    <td>{orderdata.public_ip_name}</td>
                                </tr>
                                <tr>
                                    <th>Network Interface Name</th>
                                    <td>{orderdata.network_interface_name}</td>
                                </tr>
                                <tr>
                                    <th>Vm Name</th>
                                    <td>{orderdata.vm_name}</td>
                                </tr>
                                <tr>
                                    <th>Vm Admin Username</th>
                                    <td>{orderdata.vm_admin_username}</td>
                                </tr>
                                <tr>
                                    <th>Vm Admin Password</th>
                                    <td>{orderdata.vm_admin_password}</td>
                                </tr>
                                <tr>
                                    <th>Image Publisher</th>
                                    <td>{orderdata.image_publisher}</td>
                                </tr>
                                <tr>
                                    <th>Image Offer</th>
                                    <td>{orderdata.image_offer}</td>
                                </tr>
                                <tr>
                                    <th>Image Sku</th>
                                    <td>{orderdata.image_sku}</td>
                                </tr>
                                <tr>
                                    <th>Image Version</th>
                                    <td>{orderdata.image_version}</td>
                                </tr>
                                <tr>
                                    <th>Os Disk Name</th>
                                    <td>{orderdata.os_disk_name}</td>
                                </tr>
                                <tr>
                                    <th>Os Disk Caching</th>
                                    <td>{orderdata.os_disk_caching}</td>
                                </tr>
                                <tr>
                                    <th>Os Disk Create Option</th>
                                    <td>{orderdata.os_disk_create_option}</td>
                                </tr>
                                <tr>
                                    <th>Os Disk Managed Disk Type</th>
                                    <td>{orderdata.os_disk_managed_disk_type}</td>
                                </tr>
                                <tr>
                                    <th>Size</th>
                                    <td>{orderdata.size}</td>
                                </tr>
                                <tr>
                                    <th>Key Name</th>
                                    <td>{orderdata.key_name}</td>
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
                                    <th>Order Created At</th>
                                    <td>{orderdata.order_created_at}</td>
                                </tr>
                                <tr>
                                    <th>Provisioned At</th>
                                    <td>{orderdata.provisioned_at}</td>
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

export default AzureData;