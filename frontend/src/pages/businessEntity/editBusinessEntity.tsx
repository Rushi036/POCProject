import { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";

// Interface for the business entity is defined here
interface BusinessEntity {
    companyName: string;
    companyAddress: string;
    city: string;
    state: string;
    pincode: number;
    country: string;
    contactPersonName: string;
    contactPersonPhoneNumber: number;
    contactPersonEmailAddress: string;
};

function EditBusinessEntity(props: any) {
    const bedata = props.apiresponse;

    // All states are defined here
    const [data, setData] = useState<BusinessEntity>({
        companyName: "",
        companyAddress: "",
        city: "",
        state: "",
        pincode: 0,
        country: "",
        contactPersonName: "",
        contactPersonPhoneNumber: 0,
        contactPersonEmailAddress: "",
    });

    // UseEffect if there is a change in the business entity data
    useEffect(() => {
        setData(bedata)
    }, [bedata])
    // console.log(data)


    // Handle change function for all the input fields
    const handleChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // form handle submission function
    function handleSubmit(e: any) {
        e.preventDefault();
        const bodyData = data
        console.log(bodyData)
    };

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
                        Edit Business Entity Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <form onSubmit={(e) => { handleSubmit(e) }}>
                                <div className='mb-3'>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className='form-label'>Business Entity Name</label>
                                            <input type='text'
                                                required
                                                placeholder='Business Entity Name'
                                                name='companyName'
                                                value={data.companyName}
                                                className='form-control'
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className='form-label'>Business Entity Address</label>
                                            <input type='text'
                                                required
                                                placeholder='Business Entity Address'
                                                name='companyAddress'
                                                value={data.companyAddress}
                                                className='form-control'
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className='form-label'>City</label>
                                            <input type='text'
                                                required
                                                placeholder='City'
                                                name='city'
                                                value={data.city}
                                                className='form-control'
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className='form-label'>State</label>
                                            <input type='text'
                                                required
                                                placeholder='State'
                                                name='state'
                                                value={data.state}
                                                className='form-control'
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className='form-label'>Pincode</label>
                                            <input type='number'
                                                required
                                                placeholder='Pincode'
                                                name='pincode'
                                                value={data.pincode}
                                                className='form-control'
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className='form-label'>Country</label>
                                            <input type='text'
                                                required
                                                placeholder='Country'
                                                name='country'
                                                value={data.country}
                                                className='form-control'
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className='form-label'>Contact Person Name</label>
                                            <input type='text'
                                                required
                                                placeholder='Contact Person Name'
                                                name='contactPersonName'
                                                value={data.contactPersonName}
                                                className='form-control'
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className='form-label'>Contact Person Number</label>
                                            <input type='number'
                                                required
                                                placeholder='Contact Person Number'
                                                name='contactPersonPhoneNumber'
                                                value={data.contactPersonPhoneNumber}
                                                className='form-control'
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className='form-label'>Contact Person Email Address</label>
                                            <input type='email'
                                                required
                                                placeholder='Contact Person Email Address'
                                                name='contactPersonEmailAddress'
                                                value={data.contactPersonEmailAddress}
                                                className='form-control'
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type='submit' className='btn btn-primary form-control'>Update Business Entity</button>
                            </form>
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

export default EditBusinessEntity;
