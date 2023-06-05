import { useState, useEffect } from "react";

import styled from "styled-components";
import { InputGroup, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAppSettings, selectAppSettingByName, updateAppSetting } from "./settingSlice";

const SettingsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAppSettings());
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const saleTaxRedux = useSelector((state) =>
    selectAppSettingByName(state, "sales_tax")
  );
  const markUpPercentRedux = useSelector((state) =>
    selectAppSettingByName(state, "mark_up_percent")
  );

  const [editState, setEditState] = useState(false);
  const [saleTax, setSaleTax] = useState(saleTaxRedux);
  const [markUpPercent, setMarkUpPercent] = useState(markUpPercentRedux);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setSaleTax(saleTaxRedux);
    setMarkUpPercent(markUpPercentRedux);
  }, []);

  const editButton = () => {
    setEditState(!editState);
  };

  const handleSaleTaxChange = (e) => {
    const { name, value } = e.target;
    setSaleTax({ ...saleTax, [name]: value });
    // console.log(value);
  };

  const handleMarkUpPercentChange = (e) => {
    const { name, value } = e.target;
    setMarkUpPercent({ ...markUpPercent, [name]: value });
    // console.log(value);
  };

  const handleEdit = async (clickFrom) => {
    switch (clickFrom) {
      case "mark_up_percent":
        try {
          await dispatch(updateAppSetting(markUpPercent)).unwrap();
          alert("The mark up price was edited correctly");
        } catch (error) {
          alert("Error has ocurred when editing mark up percent");
        } finally {editButton();}
        break;
      case "sales_tax":
        try {
          await dispatch(updateAppSetting(saleTax)).unwrap();
          alert("The sales tax was edited correctly");
        } catch (error) {
          alert("Error has ocurred when editing sales tax");
        } finally {editButton()}
        break;
      default:
        alert("Error ocurred");
        break;
    }
  };

  return (
    <div className="container-fluid">
      <div className="col-12 m-2">
        <h1>Setting</h1>
      </div>

      <div className="row" style={{ marginTop: "60px" }}>
        <h2 className="col-6">Setting configuration</h2>
        <Button className="col-3" onClick={editButton}>
          Edit Settings
        </Button>
      </div>

      <div style={{ marginTop: "60px" }} className="col-8">
        <Row className="mb-3">
          <Form.Group>
            <Form.Label>Sales Tax</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="setting_value"
                value={saleTax.setting_value}
                onChange={handleSaleTaxChange}
                aria-describedby="basic-addon2"
                disabled={!editState}
              />
              {editState && (
                <Button
                  variant="warning"
                  id="button-addon2"
                  onClick={()=>handleEdit("sales_tax")}
                >
                  Edit
                </Button>
              )}
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label>Mark up percent on Materials</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="setting_value"
                value={markUpPercent.setting_value}
                onChange={handleMarkUpPercentChange}
                aria-describedby="basic-addon2"
                disabled={!editState}
              />
              {editState && (
                <Button
                  variant="warning"
                  id="button-addon2"
                  onClick={()=>handleEdit("mark_up_percent")}
                >
                  Edit
                </Button>
              )}
            </InputGroup>
          </Form.Group>
        </Row>
      </div>
    </div>
  );
};

export default SettingsPage;
