import { useState, useEffect } from "react";

import styled from "styled-components";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const SettingsPage = () =>{

    return(
        <div className="container-fluid">
            <div className="col-6">
                <h1>Setting Page</h1>
            </div>
            
            <div className="col-6">
                <button>Edit settings</button>
            </div>
            <div>

            </div>
        </div>
    )
}

export default SettingsPage;