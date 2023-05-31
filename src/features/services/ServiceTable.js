import { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getServices, selectorSortedServices } from "./serviceSlice";

const ServiceTable = () => {
  const headers = [
    { title: "Service Name", value: "service_name" },
    { title: "Is Service Per Hour", value: "is_per_hour" },
    { title: "Price", value: "price" }
  ];

  const dispatch = useDispatch();

  const link = "/service/";
  const serviceList = useSelector(selectorSortedServices);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getServices());
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  return (
    <div>
      {serviceList && (
        <Table striped bordered hover>
          <thead>
            <tr>
              {headers && headers.map((item) => <th key={item.value}>{item.title}</th>)}
              <th className="text-center" scope="col">
                Details
              </th>
              <th className="text-center" scope="col">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {serviceList.map((service) => (
              <tr key={service.service_id}>
                {headers &&
                  headers.map((head) => (
                    <td key={head.value}>{service[head.value]}</td>
                  ))}
                  <td className="text-center">
                  <Link to={link + service.service_id + '?mode=view'}>
                    <Button variant="success">
                      <i className="bi bi-binoculars"></i>
                    </Button>
                  </Link>{" "}
                </td>
                <td className="text-center">
                  <Link to={link + service.service_id + '/edit?mode=edit'}>
                    <Button style={{ background: "orange", border: "none" }}>
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!serviceList && <h2>No services exist</h2>}
    </div>
  );
};

export default ServiceTable;