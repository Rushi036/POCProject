import React from "react";
import { Card, Table } from "react-bootstrap";

const PermissionTable = (props: any) => {
  return (
    <>
      <Card>
        <Card.Body>
          {props.roleNameIndex.permissions ? (
            <div className="table-responsive">
              <Table className="mb-0" bordered>
                <thead>
                  <tr>
                    <th scope="col">Module Name</th>
                    <th scope="col">View</th>
                    <th scope="col">Add</th>
                    <th scope="col">Update</th>
                    <th scope="col">Download</th>
                    <th scope="col">Upload</th>
                  </tr>
                </thead>
                <tbody>
                  {(props.roleNameIndex.permissions || [])
                    .sort()
                    .map((item: any, index: number) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{item.moduleName}</th>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                value="view"
                                // defaultChecked={item.modulePermissions.includes(
                                //   "view"
                                // )}
                                checked={item.modulePermissions.includes(
                                  "view"
                                )}
                              />
                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                value="add"
                                // defaultChecked={item.modulePermissions.includes(
                                //   "add"
                                // )}
                                checked={item.modulePermissions.includes("add")}
                              />
                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                value="update"
                                // defaultChecked={item.modulePermissions.includes(
                                //   "update"
                                // )}
                                checked={item.modulePermissions.includes(
                                  "update"
                                )}
                              />
                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                value="download"
                                // defaultChecked={item.modulePermissions.includes(
                                //   "download"
                                // )}
                                checked={item.modulePermissions.includes(
                                  "download"
                                )}
                              />
                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                value="upload"
                                // defaultChecked={item.modulePermissions.includes(
                                //   "upload"
                                // )}
                                checked={item.modulePermissions.includes(
                                  "upload"
                                )}
                              />
                            </label>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          ) : (
            <h3>No Data Found</h3>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default PermissionTable;
