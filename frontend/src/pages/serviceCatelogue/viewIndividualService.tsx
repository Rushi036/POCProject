import { Button, Card, Modal } from "react-bootstrap";
import { ReactComponent as Loading } from "../../assets/svg/Spin-1s-164px.svg";
function ViewServiceCatelogueData(props: any) {
  console.log(props);
  const servicedata = props.apiresponse;
  // console.log(servicedata);

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
            <h3>Service Details</h3>
          </Modal.Title>
        </Modal.Header>
        {props.loading ? (
          <Loading />
        ) : (
          <Modal.Body>
            <Card>
              <Card.Body>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h2>
                      {servicedata.serviceGroupName} : {servicedata.serviceName}
                    </h2>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h3>Product Description: </h3>
                    <p className="fs-5">
                      {servicedata.productDescription?.description}
                    </p>
                    <h4 className="mt-3">The key highlights include -</h4>
                    {servicedata.productDescription?.keyPoints?.map(
                      (result: any, key: any) => (
                        <ul key={key}>
                          <li>{result}</li>
                        </ul>
                      )
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h3>Service Scope </h3>
                    <h4 className="mt-3">The service scope includes -</h4>
                    {servicedata.serviceScope?.map((result: any, key: any) => (
                      <ul key={key}>
                        <li>{result}</li>
                      </ul>
                    ))}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h3>Prerequisite / Dependency </h3>
                    {servicedata.prerequisite_Dependency?.map(
                      (result: any, key: any) => (
                        <ul key={key}>
                          <li>{result}</li>
                        </ul>
                      )
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="row">
                    <h3>Feature List -</h3>
                  </div>
                  <div className="col-md-12">
                    <table>
                      <thead>
                        <tr>
                          <th>Feature Name</th>
                          <th>Deliverables</th>
                        </tr>
                      </thead>
                      <tbody>
                        {servicedata.featureList?.map(
                          (feature: any, index: any) => (
                            <tr key={index}>
                              <td>{feature.featureName}</td>
                              <td>
                                {feature.deliverables.map(
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
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h3>Service Exclusions: </h3>
                    {servicedata.serviceExclusions?.map(
                      (result: any, key: any) => (
                        <ul key={key}>
                          <li>{result}</li>
                        </ul>
                      )
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h3>Service Delivery </h3>
                    <h4 className="mt-3">Service Initiation -</h4>
                    <p className="fs-5">
                      {servicedata.serviceDelivery?.serviceInitiation}
                    </p>
                    <h4 className="mt-3">Service Support -</h4>
                    <p className="fs-5">
                      {servicedata.serviceDelivery?.serviceSupport}
                    </p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="row">
                    <h3>Service Level Specifications -</h3>
                  </div>
                  <div className="col-md-12">
                    <table>
                      <thead>
                        <tr>
                          <th>Service Parameter</th>
                          <th>Service Level Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {servicedata.serviceLevelSpecifications?.map(
                          (specifiactions: any, index: any) => (
                            <tr key={index}>
                              <td>{specifiactions.serviceParameter}</td>
                              <td>
                                {specifiactions.serviceLevelDescription.map(
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
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* <div className="row mb-3 ">
                                <h4 className="col-md-3">Base Cost -</h4>
                                <p className="col-md-3 fs-4">{servicedata.baseCost}</p>
                                <h4 className="col-md-3">Billing Type -</h4>
                                <p className="col-md-3 fs-4">{servicedata.billingType}</p>
                            </div>
                            <div className="row mb-3 ">
                                <h4 className="col-md-3">Service Status -</h4>
                                <p className="col-md-3 fs-4">{servicedata.serviceStatus}</p>
                            </div> */}
              </Card.Body>
            </Card>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewServiceCatelogueData;
