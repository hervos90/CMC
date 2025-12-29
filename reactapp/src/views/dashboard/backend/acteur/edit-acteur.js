import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../../components/dashboard/Card'
import { useHistory } from 'react-router-dom'


import { set } from 'date-fns/fp'
function EditActeur(props) {

    const initialState = {
       personneId: 0,
        acteurId: 0,
        nom: "",
        prenom: "",
        titre: "",
        biographie: "",
        pays: "",
    }


    let history = useHistory()
    const [acteur, setActeur] = useState(initialState)
    const [acteur1, setActeur1] = useState([])
    const [errors, setErrors] = useState(initialState)
    const [validated, setValidated] = useState(false);

    useEffect(() => {

        const { state } = props.location
        axios.get(`https://localhost:7157/api/Acteur/${state}`).then((response) => {
            setActeur(response.data)
            console.log(acteur)
            document.getElementById('personneId').value = response.data.personneId
            document.getElementById('acteurId').value = response.data.acteurId
            document.getElementById('nom').value = response.data.nom
            document.getElementById('prenom').value = response.data.prenom
            document.getElementById('titre').value = response.data.titre
            document.getElementById('biographie').value = response.data.biographie
            document.getElementById('pays').value = response.data.pays
        });



    }, []);
    const dataToPass = { enregistrement: '1' };

  

    async function handleSubmit(e) {
        e.preventDefault()
        validate()
        try {
            if (validate())
                await axios.put(`https://localhost:7157/api/Acteur/${acteur.acteurId}`, {
                   personneId: acteur.personneId,
                    acteurId: acteur.acteurId,
                    nom: acteur.nom,
                    prenom: acteur.prenom,
                    titre: acteur.titre,
                    biographie: acteur.biographie,
                    pays: acteur.pays,

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
        const fieldValues = { [name]: value }
        setActeur({ ...acteur, [name]: value })
        validate(fieldValues)
    }

    const validate = (fieldValues = acteur) => {
        let valid = true
        let temp = {}
        if ('nom' in fieldValues)
            temp.nom = fieldValues.nom ? "" : "Le nom est requis!"
        if ('prenom' in fieldValues)
            temp.prenom = fieldValues.prenom ? "" : "Le prénom est requis!"
        if ('pays' in fieldValues)
            temp.pays = fieldValues.pays ? "" : "Le pays est requis!"

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
                                    <h4 className="card-title">Add Acteur </h4>
                                </Card.Header.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col lg="12">
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Form.Group>
                                                <Form.Control id="personneId" required name="PersonneId" value={acteur.PersonneId} type="hidden" placeholder="" />

                                                <Form.Control id="acteurId" name="acteurId" value={acteur.acteurId} type="hidden" placeholder="" />
                                                <Form.Control id="nom" name="nom" value={acteur.nom} onChange={handleInputChange} type="text" placeholder="nom" isInvalid={!!errors.nom} />

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.nom}
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                <Form.Control id="prenom" name="prenom"  onChange={handleInputChange} type="text" placeholder="prenom" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.prenom}
                                                </Form.Control.Feedback>
                                                <Form.Control id="titre" name="titre" value={acteur.titre} onChange={handleInputChange} type="text" placeholder="titre" />
                                                <Form.Control id="biographie" name="biographie" value={acteur.biographie} onChange={handleInputChange} type="text" placeholder="biographie" />
                                                <Form.Control id="pays" name="pays" value={acteur.pays} onChange={handleInputChange} type="text" isInvalid={!!errors.pays} placeholder="pays" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.pays}
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
export default EditActeur;