import moment from 'moment';
import React, { useState, useContext, useEffect } from 'react'

import axios from 'axios';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Collapse, OverlayTrigger, Tooltip, Button, Modal } from 'react-bootstrap'
import Card from '../../../../components/dashboard/Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryList = () => { 


    const [show6, setShow6] = useState(false);
    const handleClose6 = () => setShow6(false);
    const handleShow6 = () => setShow6(true);

    const [category, setCategory] = useState([])

    useEffect(() => {
        axios.get("https://localhost:7157/api/Categorie").then((response) => {
            setCategory(response.data);
        });
    }, []);

    const [counter, setCounter] = useState(0)
    const listCategory = category.map((category) => (
        <tr key={category.Id}>
            <td>  </td>
            <td> {category.typeMediaNom} </td>
            <td> {category.libelle} </td>
            <td> {category.description} </td>
            <td>
                <div className="flex align-items-center list-user-action">
                    <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
                        <Link className="iq-bg-warning" to="#"><i className="lar la-eye"></i></Link>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                        <Link className="iq-bg-success" to={{ pathname: '/dashboard/edit-category', state: category.id }}><i className="ri-pencil-line"></i></Link>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                        <Link variant="danger" className="iq-bg-primary" type="button" to="#"><i onClick={handleShow6} className="ri-delete-bin-line"></i></Link>
                    </OverlayTrigger>
                </div>
            </td>
        </tr>
    ));


    return (
            <> 
                <Container fluid>
                    <Row>
                        <Col sm="12">
                            <Card>
                                <Card.Header className="d-flex justify-content-between">
                                    <Card.Header.Title>
                                        <h4 className="card-title">Liste des catégories</h4>
                                    </Card.Header.Title>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <Link to="/dashboard/add-category" className="btn btn-primary">Add Category</Link>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <div className="table-view">
                                        <table className="data-tables table movie_table " style={{width:"100%"}}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width:"10%" }}>No</th>
                                                    <th style={{ width:"20%" }}>Type média</th>
                                                    <th style={{ width:"20%" }}>Nom</th>
                                                    <th style={{ width:"30%" }}>Description</th>
                                                    <th style={{ width:"20%" }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listCategory}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </>
    )
}
export default CategoryList;