import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../../components/dashboard/Card'
import { useHistory } from 'react-router-dom'


import { set } from 'date-fns/fp'
function EditEglise(props) {

    const initialState = {
       egliseId: 0,
        nomEglise: "",
        descriptionEglise: "",
    }


    let history = useHistory()
    const [eglise, setEglise] = useState(initialState)
    const [eglise1, setEglise1] = useState([])
    const [errors, setErrors] = useState(initialState)
    const [validated, setValidated] = useState(false);

    useEffect(() => {

        const { state } = props.location
        axios.get(`https://localhost:7157/api/Eglise/${state}`).then((response) => {
            setEglise(response.data)
            document.getElementById('egliseId').value = response.data.eglseId
            document.getElementById('nomEglise').value = response.data.nomEglise
            document.getElementById('descriptionEglise').value = response.data.descriptionEglise
        });

    }, []);
    const dataToPass = { enregistrement: '1' };

  

    async function handleSubmit(e) {
        e.preventDefault()
        validate()
        try {
            if (validate())
                await axios.put(`https://localhost:7157/api/Eglise/${eglise.egliseId}`, {
                    egliseId: eglise.egliseId,
                    nomEglise: eglise.nomEglise,
                    descriptionEglise: eglise.descriptionEglise,
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
                            history.push({ pathname: '/dashboard/eglise-list', state: dataToPass })

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
        setEglise({ ...eglise, [name]: value })
        validate(fieldValues)
    }

    const validate = (fieldValues = eglise) => {
        let valid = true
        let temp = {}
        if ('nom' in fieldValues)
            temp.nomEglise = fieldValues.nomEglise ? "" : "Le nom de l'église est requis!"
       
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
                                    <h4 className="card-title">Add Eglise </h4>
                                </Card.Header.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col lg="12">
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Form.Group>
                                                <Form.Control id="egliseId" required name="egliseId" value={eglise.egliseId} type="hidden" placeholder="" />

                                                <Form.Control id="nomEglise" name="nomEglise" value={eglise.nomEglise} onChange={handleInputChange} type="text" placeholder="nom" isInvalid={!!errors.nomEglise} />

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.nom}
                                                </Form.Control.Feedback>
                                                <Form.Control as="textarea" id="descriptionEglise" name="descriptionEglise" value={eglise.descriptionEglise} rows="5" placeholder="Description" onChange={handleInputChange} ></Form.Control>


                                            </Form.Group>

                                            <Form.Group className="form-group">
                                                {/* <Button type="button" onClick={()=> history.push('/dashboard/eglise')}variant=" btn-primary">Submit</Button>{' '}*/}
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
export default EditEglise;