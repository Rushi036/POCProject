import { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { ReactComponent as Loading } from "../../assets/svg/Spin-1s-164px.svg";
// Interface for the form values
interface FormValues {
  serviceGroupName: string;
  serviceName: string;
  productDescription: {
    description: string;
    keyPoints: string[];
  };
  serviceScope: string[];
  prerequisite_Dependency: string[];
  serviceExclusions: string[];
  serviceDelivery: {
    serviceInitiation: string;
    serviceSupport: string;
  };
  featureList: {
    featureName: string;
    deliverables: string[];
  }[];
  serviceLevelSpecifications: {
    serviceParameter: string;
    serviceLevelDescription: string[];
  }[];
  baseCost: string;
  billingType: string;
  serviceStatus: string;
}

function EditIndividualService(props: any) {
  // console.log(props)
  const servicedata = props.apiresponse;

  // All states are defined here
  const [formValues, setFormValues] = useState<FormValues>({
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

  // UseEffect to change the form values
  useEffect(() => {
    setFormValues(servicedata);
  }, [servicedata]);
  // console.log(servicedata)

  // Handle change function for all the input fields
  const handleInputChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Function to handle the product description change in the form
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      productDescription: {
        ...prevFormValues.productDescription,
        [name]: value,
      },
    }));
  };

  // Function to handle the product keypoints change in the form
  const handleKeyPointsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newKeyPoints = [...formValues.productDescription.keyPoints];
    newKeyPoints[index] = event.target.value;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      productDescription: {
        ...prevFormValues.productDescription,
        keyPoints: newKeyPoints,
      },
    }));
  };

  // Function to handle the whole product service scope change in the form
  const handleServiceScopeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newServiceScope = [...formValues.serviceScope];
    newServiceScope[index] = event.target.value;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      serviceScope: newServiceScope,
    }));
  };

  // Function to handle the service initiation changes
  const handleServiceInitiationChange = (value: string) => {
    setFormValues({
      ...formValues,
      serviceDelivery: {
        ...formValues.serviceDelivery,
        serviceInitiation: value,
      },
    });
  };

  // Function to handle the service support changes
  const handleServiceSupportChange = (value: string) => {
    setFormValues({
      ...formValues,
      serviceDelivery: {
        ...formValues.serviceDelivery,
        serviceSupport: value,
      },
    });
  };

  // Function to handle the product service scope change in the form
  const handlePrerequisiteDependencyChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newprerequisite_Dependency = [...formValues.prerequisite_Dependency];
    newprerequisite_Dependency[index] = event.target.value;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      prerequisite_Dependency: newprerequisite_Dependency,
    }));
  };

  // Function to handle the product service exclusions change in the form
  const handleserviceExclusionsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newserviceExclusions = [...formValues.serviceExclusions];
    newserviceExclusions[index] = event.target.value;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      serviceExclusions: newserviceExclusions,
    }));
  };

  // Functions to handle the feature list and its inner components
  // Function to add the new deliverables in its correspondence object
  const handleAddDeliverable = (index: number) => {
    setFormValues((prevFormValues) => {
      const newFeatureList = [...prevFormValues.featureList];
      newFeatureList[index].deliverables.push("");
      return {
        ...prevFormValues,
        featureList: newFeatureList,
      };
    });
  };

  // Function to add the new object of both feature name and its deliverables
  const handleAddFeature = () => {
    setFormValues((prevFormValues) => {
      const newFeatureList = [
        ...prevFormValues.featureList,
        { featureName: "", deliverables: [""] },
      ];
      return {
        ...prevFormValues,
        featureList: newFeatureList,
      };
    });
  };

  // Function to add the new feature name in the feature name key in featureList
  const handleFeatureNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setFormValues((prevFormValues) => {
      const newFeatureList = [...prevFormValues.featureList];
      newFeatureList[index].featureName = value;
      return {
        ...prevFormValues,
        featureList: newFeatureList,
      };
    });
  };

  // Function to handle the deliverable changes
  const handleDeliverableChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    featureIndex: number,
    deliverableIndex: number
  ) => {
    const { value } = event.target;
    setFormValues((prevFormValues) => {
      const newFeatureList = [...prevFormValues.featureList];
      newFeatureList[featureIndex].deliverables[deliverableIndex] = value;
      return {
        ...prevFormValues,
        featureList: newFeatureList,
      };
    });
  };

  // Function to handle the service level specification and its inner components
  // Function to add the new service level description
  const handleAddServiceLevelDescription = (index: number) => {
    setFormValues((prevFormValues) => {
      const newServiceLevelSpecifications = [
        ...prevFormValues.serviceLevelSpecifications,
      ];
      newServiceLevelSpecifications[index].serviceLevelDescription.push("");
      return {
        ...prevFormValues,
        serviceLevelSpecifications: newServiceLevelSpecifications,
      };
    });
  };

  // Function to add the whole new service level
  const handleAddServiceLevel = () => {
    setFormValues((prevFormValues) => {
      const newServiceLevelSpecifications = [
        ...prevFormValues.serviceLevelSpecifications,
        { serviceParameter: "", serviceLevelDescription: [""] },
      ];
      return {
        ...prevFormValues,
        serviceLevelSpecifications: newServiceLevelSpecifications,
      };
    });
  };

  // Function to handle the change the service parameter
  const handleServiceParameterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setFormValues((prevFormValues) => {
      const newServiceLevelSpecifications = [
        ...prevFormValues.serviceLevelSpecifications,
      ];
      newServiceLevelSpecifications[index].serviceParameter = value;
      return {
        ...prevFormValues,
        serviceLevelSpecifications: newServiceLevelSpecifications,
      };
    });
  };

  // Function to handle the change in the service level description
  const handleServiceLevelDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    serviceLevelIndex: number,
    serviceLevelDescriptionIndex: number
  ) => {
    const { value } = event.target;
    setFormValues((prevFormValues) => {
      const newServiceLevelSpecifications = [
        ...prevFormValues.serviceLevelSpecifications,
      ];
      newServiceLevelSpecifications[serviceLevelIndex].serviceLevelDescription[
        serviceLevelDescriptionIndex
      ] = value;
      return {
        ...prevFormValues,
        serviceLevelSpecifications: newServiceLevelSpecifications,
      };
    });
  };

  // Function for the handle submission of the form
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(formValues);
  }

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
            Update Service Details
          </Modal.Title>
        </Modal.Header>
        {props.loading ? (
          <Loading />
        ) : (
          <Modal.Body>
            <Card>
              <Card.Body>
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Service Group Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Service Group Name"
                          name="serviceGroupName"
                          value={formValues.serviceGroupName}
                          className="form-control"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Service Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Service Name"
                          name="serviceName"
                          value={formValues.serviceName}
                          className="form-control"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-12">
                        <label className="form-label">
                          Product Description
                        </label>
                        <textarea
                          required
                          placeholder="Product Description"
                          name="description"
                          value={formValues.productDescription.description}
                          className="form-control"
                          onChange={handleDescriptionChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label"> Service Scope </label>
                        {formValues.serviceScope.map((scope, index) => (
                          <textarea
                            className="form-label form-control"
                            placeholder="Service Scope"
                            key={index}
                            value={scope}
                            onChange={(event) =>
                              handleServiceScopeChange(event, index)
                            }
                          />
                        ))}{" "}
                        <br />
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            setFormValues((prevFormValues) => ({
                              ...prevFormValues,
                              serviceScope: [
                                ...prevFormValues.serviceScope,
                                "",
                              ],
                            }))
                          }
                        >
                          Add Scope
                        </button>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Key Points</label>
                        {formValues.productDescription.keyPoints.map(
                          (keyPoint, index) => (
                            <textarea
                              className="form-label form-control"
                              placeholder="Product Key Points"
                              key={index}
                              value={keyPoint}
                              onChange={(event) =>
                                handleKeyPointsChange(event, index)
                              }
                            />
                          )
                        )}{" "}
                        <br />
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            setFormValues((prevFormValues) => ({
                              ...prevFormValues,
                              productDescription: {
                                ...prevFormValues.productDescription,
                                keyPoints: [
                                  ...prevFormValues.productDescription
                                    .keyPoints,
                                  "",
                                ],
                              },
                            }))
                          }
                        >
                          Add Key Point
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-12">
                        {formValues.featureList.map((feature, featureIndex) => (
                          <div className="row" key={featureIndex}>
                            <div className="col-md-6">
                              {/* Add Feature Name here */}
                              <label className="form-label">Feature Name</label>
                              <input
                                type="text"
                                required
                                placeholder="Feature Name"
                                className="form-control"
                                value={feature.featureName}
                                onChange={(event) =>
                                  handleFeatureNameChange(event, featureIndex)
                                }
                              />{" "}
                              <br />
                            </div>

                            {/* Add Deliverables here */}
                            {feature.deliverables.map(
                              (deliverable, deliverableIndex) => (
                                <div
                                  className="col-md-6 mt-auto"
                                  key={deliverableIndex}
                                >
                                  <input
                                    type="text"
                                    required
                                    placeholder="Add Deliverable"
                                    className="form-control"
                                    value={deliverable}
                                    onChange={(event) =>
                                      handleDeliverableChange(
                                        event,
                                        featureIndex,
                                        deliverableIndex
                                      )
                                    }
                                  />{" "}
                                  <br />
                                </div>
                              )
                            )}

                            {/* Button to add new deliverables in a single feature */}
                            <button
                              className="btn btn-primary mb-1"
                              onClick={() => handleAddDeliverable(featureIndex)}
                            >
                              Add New Deliverables
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Button to add whole new feature */}
                      <button
                        className="btn btn-primary mt-1"
                        onClick={handleAddFeature}
                      >
                        Add New Feature
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Service Initiation</label>
                        <input
                          type="text"
                          required
                          placeholder="Service Initiation"
                          name="serviceInitiation"
                          value={formValues.serviceDelivery.serviceInitiation}
                          className="form-control"
                          onChange={(event) =>
                            handleServiceInitiationChange(event.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Service Support</label>
                        <input
                          type="text"
                          required
                          placeholder="Service Support"
                          name="serviceSupport"
                          value={formValues.serviceDelivery.serviceSupport}
                          className="form-control"
                          onChange={(event) =>
                            handleServiceSupportChange(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">
                          Prerequisite Dependency
                        </label>
                        {formValues.prerequisite_Dependency.map(
                          (prerequisite, index) => (
                            <input
                              className="form-label form-control"
                              placeholder="Prerequisite / Dependency"
                              required
                              key={index}
                              type="text"
                              value={prerequisite}
                              onChange={(event) =>
                                handlePrerequisiteDependencyChange(event, index)
                              }
                            />
                          )
                        )}{" "}
                        <br />
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            setFormValues((prevFormValues) => ({
                              ...prevFormValues,
                              prerequisite_Dependency: [
                                ...prevFormValues.prerequisite_Dependency,
                                "",
                              ],
                            }))
                          }
                        >
                          Add Prerequisite Dependency
                        </button>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
                          {" "}
                          Service Exclusions{" "}
                        </label>
                        {formValues.serviceExclusions.map(
                          (Exclusions, index) => (
                            <input
                              className="form-label form-control"
                              required
                              placeholder="Service Exclusions"
                              key={index}
                              type="text"
                              value={Exclusions}
                              onChange={(event) =>
                                handleserviceExclusionsChange(event, index)
                              }
                            />
                          )
                        )}{" "}
                        <br />
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            setFormValues((prevFormValues) => ({
                              ...prevFormValues,
                              serviceExclusions: [
                                ...prevFormValues.serviceExclusions,
                                "",
                              ],
                            }))
                          }
                        >
                          Add Service Exclusions
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-12">
                        {/* Render service level specifications */}
                        {formValues.serviceLevelSpecifications.map(
                          (serviceLevel, serviceLevelIndex) => (
                            <div className="row" key={serviceLevelIndex}>
                              <div className="col-md-6">
                                {/* Render service parameter input */}
                                <label className="form-label">
                                  Service Parameter
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Service Parameter"
                                  className="form-control"
                                  value={serviceLevel.serviceParameter}
                                  onChange={(event) =>
                                    handleServiceParameterChange(
                                      event,
                                      serviceLevelIndex
                                    )
                                  }
                                />{" "}
                                <br />
                              </div>

                              {/* Render service level descriptions */}
                              {serviceLevel.serviceLevelDescription.map(
                                (
                                  serviceLevelDescription,
                                  serviceLevelDescriptionIndex
                                ) => (
                                  <div
                                    className="col-md-6 mt-auto"
                                    key={serviceLevelDescriptionIndex}
                                  >
                                    <input
                                      type="text"
                                      required
                                      placeholder="Add Service Level Description"
                                      className="form-control"
                                      value={serviceLevelDescription}
                                      onChange={(event) =>
                                        handleServiceLevelDescriptionChange(
                                          event,
                                          serviceLevelIndex,
                                          serviceLevelDescriptionIndex
                                        )
                                      }
                                    />{" "}
                                    <br />
                                  </div>
                                )
                              )}

                              {/* Render add service level description button */}
                              <button
                                className="btn btn-primary mb-1"
                                onClick={() =>
                                  handleAddServiceLevelDescription(
                                    serviceLevelIndex
                                  )
                                }
                              >
                                Add Service Level Description
                              </button>
                            </div>
                          )
                        )}
                      </div>
                      {/* Button to add whole new service level specification */}
                      <button
                        className="btn btn-primary mt-1"
                        onClick={handleAddServiceLevel}
                      >
                        Add New Service Specification
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="form-label">Base Cost</label>
                        <input
                          type="number"
                          required
                          placeholder="Base Cost"
                          name="baseCost"
                          value={formValues.baseCost}
                          className="form-control"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Billing Type</label>
                        <input
                          type="text"
                          required
                          placeholder="Billing Type"
                          name="billingType"
                          value={formValues.billingType}
                          className="form-control"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Service Status</label>
                        <select
                          name="serviceStatus"
                          className="form-select"
                          value={formValues.serviceStatus}
                          onChange={handleInputChange}
                        >
                          <option value="active">Active</option>
                          <option value="deactive">Deactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary form-control"
                  >
                    Update Service
                  </button>
                </form>
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

export default EditIndividualService;
