import moment from 'moment';
import React, { useState, useContext, useEffect } from 'react'

import axios from 'axios';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Collapse, OverlayTrigger, Tooltip, Button, Modal } from 'react-bootstrap'
import Card from '../../../../components/dashboard/Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrateurList = (props) => { 

    const [show6, setShow6] = useState(false)
    const handleClose6 = () => setShow6(false)
    const handleShow6 = () => setShow6(true)
    const [orateurs, setOrateurs] = useState([])
    useEffect(() => {
        axios.get("https://localhost:7157/api/Orateur").then((response) => {
            setOrateurs(response.data);
        });   
    },[]);

    const [counter, setCounter] = useState(0)
    const listOrateurs = orateurs.map((orateur) => (
        <tr key={orateur.orateurId}>
            <td>  </td>
            <td> {orateur.titre} </td>
            <td> {orateur.nom} </td>
            <td> {orateur.prenom} </td>
            <td>
                <div className="flex align-items-center list-user-action">
                    <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
                        <Link className="iq-bg-warning" to="#"><i className="lar la-eye"></i></Link>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                        <Link className="iq-bg-success" to={{ pathname: '/dashboard/edit-orateur', state: orateur.orateurId }}><i className="ri-pencil-line"></i></Link>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                        <Link variant="danger" className="iq-bg-primary" type="button" to="#"><i onClick={handleShow6} className="ri-delete-bin-line"></i></Link>
                    </OverlayTrigger>
                </div>
            </td>
        </tr>
    ));

    //console.log(listOrateurs)







    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <Card.Header.Title>
                                    <h4 className="card-title">Liste des Orateurs</h4>
                                </Card.Header.Title>
                                <div className="iq-card-header-toolbar d-flex align-items-center">
                                    <Link to="/dashboard/add-orateur" className="btn btn-primary">Nouvel Orateur</Link>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-view">
                                    <table className="data-tables table movie_table  " style={{ width: "100%" }}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: "10%" }}>No</th>
                                                <th style={{ width: "20%" }}>Titre</th>
                                                <th style={{ width: "20%" }}>Nom</th>
                                                <th style={{ width: "20%" }}>Prenom</th>
                                                <th style={{ width: "30%" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listOrateurs}
                                         
                                        </tbody>
                                    </table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />



            <Modal show={show6} onHide={handleClose6} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title as="h5">Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ...
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose6}>Close</Button>
                    <Button variant="primary" onClick={handleClose6}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )    
}
export default OrateurList;