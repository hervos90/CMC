
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../../components/dashboard/Card'
import { useHistory } from 'react-router-dom'


import { set } from 'date-fns/fp'
function AddTypeMedia() {

    const initialState = {
        libelle: "",
        description: "",
    }
    const dataToPass = { enregistrement: '1' };

    let history = useHistory()
    const [typeMedia, setTypeMedia] = useState(initialState)
    const [errors, setErrors] = useState(initialState)
    const [validated, setValidated] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault()
        validate()
        try {
            if (validate())
                await axios.post('https://localhost:7157/api/TypeMedia', {
                    Libelle: typeMedia.libelle,
                    Code:"",
                })
                    .then((response) => {

                        toast('Enregistré avec succès!', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        //toast.success("Enregistré avec succès", {
                        //    position: toast.POSITION.TOP_RIGHT,
                        //});
                        setTimeout(() => {
                            history.push({ pathname: '/dashboard/type-media-list', state: dataToPass })
                        }, 2000);


                    })
            //.catch((error) => {
            //    console.log("the error has occured: " + error);
            //    toast.error("Une erreur est survenue", {
            //        position: toast.POSITION.TOP_RIGHT,
            //    });
            //});

        } catch (error) {
            //console.log("the error has occured: " + error);
            toast.error("Une erreur est survenue", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }

    }


    const handleInputChange = (event) => {
        const { name, value } = event.target
        const fieldValues = { [name]: value }
        setTypeMedia({ ...typeMedia, [name]: value })
        validate(fieldValues)

        //console.log(typeMedia)
    }

    const validate = (fieldValues = typeMedia) => {
        let valid = true
        let temp = {}
        if ('libelle' in fieldValues)
            temp.libelle = fieldValues.libelle ? "" : "Le libelle est requis!"

        setErrors({ ...temp })
        return Object.values(temp).every(x => x == "")
    }


    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <Card.Header.Title>
                                    <h4 className="card-title">Nouveau type de média</h4>
                                </Card.Header.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col lg="12">
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Form.Group>

                                                {/*<Form.Control name="typeMediaId" value={typeMedia.typeMediaId} type="hidden" placeholder="" />*/}
                                                <Form.Control name="libelle" value={typeMedia.libelle} onChange={handleInputChange} type="text" placeholder="Nom" isInvalid={!!errors.libelle} />

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.libelle}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="form-group">
                                                <Button type="submit" variant=" btn-primary">Soumettre</Button>{' '}
                                                <Button type="reset" variant=" btn-danger">Annuler</Button>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </>
    )
}
export default AddTypeMedia;