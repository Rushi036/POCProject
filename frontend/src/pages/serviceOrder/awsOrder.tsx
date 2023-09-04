import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";

function AwsOrder(props: any) {
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
            Add AWS Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <form>
                <div className="mb-4">
                  <label htmlFor="field1" className="block text-gray-600">
                    Field 1
                  </label>
                  <input
                    type="text"
                    id="field1"
                    name="field1"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter Field 1"
                  />

                  <label htmlFor="field2" className="block text-gray-600">
                    Field 2
                  </label>
                  <input
                    type="text"
                    id="field2"
                    name="field2"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter Field 2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="field1" className="block text-gray-600">
                    Field 1
                  </label>
                  <input
                    type="text"
                    id="field1"
                    name="field1"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter Field 1"
                  />

                  <label htmlFor="field2" className="block text-gray-600">
                    Field 2
                  </label>
                  <input
                    type="text"
                    id="field2"
                    name="field2"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter Field 2"
                  />
                </div>
                {/* Repeat the above two div blocks for the remaining fields */}
                {/* Total 22 fields */}
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
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

export default AwsOrder;
