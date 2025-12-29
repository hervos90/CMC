import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../../components/dashboard/Card'
import { useHistory } from 'react-router-dom'


import { set } from 'date-fns/fp'
function EditLangue(props) {

    const initialState = {
        langueId: 0,
        libelle: "",
    }


    let history = useHistory()
    const [langue, setLangue] = useState(initialState)
    const [langue1, setLangue1] = useState([])
    const [errors, setErrors] = useState(initialState)
    const [validated, setValidated] = useState(false);

    useEffect(() => {

        const { state } = props.location
        axios.get(`https://localhost:7157/api/Langue/${state}`).then((response) => {
            setLangue(response.data)
            document.getElementById('langueId').value = response.data.langueId
            document.getElementById('libelle').value = response.data.libelle
        });

    }, []);
    const dataToPass = { enregistrement: '1' };



    async function handleSubmit(e) {
        e.preventDefault()
        validate()
        try {
            if (validate())
                await axios.put(`https://localhost:7157/api/Langue/${langue.langueId}`, {
                    langueId: langue.langueId,
                    libelle: langue.libelle,
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
                            history.push({ pathname: '/dashboard/langue-list', state: dataToPass })

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
        setLangue({ ...langue, [name]: value })
        validate(fieldValues)
    }

    const validate = (fieldValues = langue) => {
        let valid = true
        let temp = {}
        if ('nom' in fieldValues)
            temp.libelle = fieldValues.libelle ? "" : "Le nom de l'église est requis!"

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
                                    <h4 className="card-title">Modifier la langue </h4>
                                </Card.Header.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col lg="12">
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Form.Group>
                                                <Form.Control id="langueId" required name="langueId" value={langue.langueId} type="hidden" placeholder="" />

                                                <Form.Control id="libelle" name="libelle" value={langue.libelle} onChange={handleInputChange} type="text" placeholder="Libelle" isInvalid={!!errors.libelle} />

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.libelle}
                                                </Form.Control.Feedback>

                                            </Form.Group>

                                            <Form.Group className="form-group">
                                                {/* <Button type="button" onClick={()=> history.push('/dashboard/langue')}variant=" btn-primary">Submit</Button>{' '}*/}
                                                <Button type="submit" variant=" btn-primary">Submit</Button>{' '}
                                                {/*<ToastContainer />*/}
                                                <Button type="reset" variant=" btn-danger">Cancel</Button>
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
export default EditLangue;