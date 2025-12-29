import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import Card from '../../../../components/dashboard/Card'
import { useHistory } from 'react-router-dom'


import { set } from 'date-fns/fp'
function AddActeur() {
    
    const initialState = {
        PersonneId:0,
        ActeurId: 0,
        Nom: "",
        Prenom: "",
        Titre: "",
        Biographie: "",
        Pays: "",
    }
    const dataToPass = { enregistrement: '1'};
   
    let history = useHistory()
    const [acteur, setActeur] = useState(initialState)
    const [errors, setErrors] = useState(initialState)
    const [validated, setValidated] = useState(false);

    async function handleSubmit(e) {
    
        e.preventDefault()
        validate()
        try {
            if(validate())
            await axios.post('https://localhost:7157/api/Acteur', {
                PersonneId: acteur.PersonneId,
                ActeurId: acteur.ActeurId,
                Nom: acteur.Nom,
                Prenom: acteur.Prenom,
                Titre: acteur.Titre,
                Biographie: acteur.Biographie,
                Pays: acteur.Pays,

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
                        history.push({ pathname: '/dashboard/acteur-list', state: dataToPass })
                        
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
        const fieldValues = {[name]:value}
        setActeur({ ...acteur, [name]: value })
        validate(fieldValues)

        //console.log(acteur)
    }

    const validate = (fieldValues = acteur) => {
        let valid = true
        let temp = {}
        if('Nom' in fieldValues)
        temp.Nom = fieldValues.Nom ? "" : "Le nom est requis!"
        if ('Prenom' in fieldValues)
        temp.Prenom = fieldValues.Prenom ? "" : "Le prénom est requis!"
        if ('Pays' in fieldValues)
        temp.Pays = fieldValues.Pays ? "" : "Le pays est requis!"

        setErrors({ ...temp })
        return Object.values(temp).every(x => x== "")
    }


    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <Card.Header.Title>
                                    <h4 className="card-title">Add Acteur {errors.Nom}</h4>
                                </Card.Header.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col lg="12">
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Form.Group>
                                                <Form.Control required name="PersonneId" value={acteur.PersonneId} type="hidden" placeholder="" />
                                               
                                                <Form.Control name="ActeurId" value={acteur.ActeurId} type="hidden" placeholder="" />
                                                <Form.Control name="Nom" value={acteur.Nom} onChange={handleInputChange} type="text" placeholder="Nom" isInvalid={!!errors.Nom} />

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.Nom}
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                <Form.Control name="Prenom" value={errors.nom} onChange={handleInputChange} type="text" isInvalid={!!errors.Prenom} placeholder="Prenom" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.Prenom}
                                                </Form.Control.Feedback>
                                                <Form.Control name="Titre" value={acteur.Titre} onChange={handleInputChange} type="text" placeholder="Titre" />
                                                <Form.Control name="Biographie" value={acteur.Biographie} onChange={handleInputChange} type="text" placeholder="Biographie" />
                                                <Form.Control name="Pays" value={acteur.Pays} onChange={handleInputChange} type="text" isInvalid={!!errors.Pays} placeholder="Pays" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.Pays}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="form-group">
                                                {/* <Button type="button" onClick={()=> history.push('/dashboard/acteur')}variant=" btn-primary">Submit</Button>{' '}*/}
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
export default AddActeur;