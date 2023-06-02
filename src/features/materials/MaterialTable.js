import { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getMaterials, selectorSortedMaterials } from "./materialSlice";

const MaterialTable = () => {
  const headers = [
    { title: "Material Name", value: "material_name" },
    { title: "Description", value: "description" },
    { title: "Unit Type", value: "unit" },
  ];

  const dispatch = useDispatch();

  const link = "/service/material/";
  const materialList = useSelector(selectorSortedMaterials);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getMaterials());
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  return (
    <div>
      {materialList && (
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
            {materialList.map((material) => (
              <tr key={material.material_id}>
                {headers &&
                  headers.map((head) => (
                    <td key={head.value}>{material[head.value] || 'N/A'}</td>
                  ))}
                <td className="text-center">
                  <Link to={link + material.material_id + '?mode=view'}>
                    <Button variant="success">
                      <i className="bi bi-binoculars"></i>
                    </Button>
                  </Link>{" "}
                </td>
                <td className="text-center">
                  <Link to={link + material.material_id + '/edit?mode=edit'}>
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
       {materialList === [] && <h3>No materials exist.</h3>}
    </div>
  );
};

export default MaterialTable;