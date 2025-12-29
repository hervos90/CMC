import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import Card from '../../../../components/dashboard/Card'
import { useHistory } from 'react-router-dom'


import { set } from 'date-fns/fp'
function AddOrateur() {
    
    const initialState = {
        personneId:0,
        orateurId: 0,
        egliseId:0,
        nom: "",
        prenom: "",
        titre: "",
        biographie: "",
        pays: "",
    }
    const dataToPass = { enregistrement: '1'};
   
    let history = useHistory()
    const [orateur, setOrateur] = useState(initialState)
    const [errors, setErrors] = useState(initialState)
    const [validated, setValidated] = useState(false);


    const [eglise, setEglise] = useState([])
    useEffect(() => {
      
        axios.get("https://localhost:7157/api/Eglise").then((response) => {
            setEglise(response.data);
        });

    }, []);

    async function handleSubmit(e) {
    
        e.preventDefault()
        validate()
        try {
            console.log(orateur)
            if(validate())
            await axios.post('https://localhost:7157/api/Orateur', {
                personneId: orateur.personneId,
                orateurId: orateur.orateurId,
                nom: orateur.nom,
                prenom: orateur.prenom,
                titre: orateur.titre,
                biographie: orateur.biographie,
                pays: orateur.pays,
                nomEglise: orateur.egliseId,

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
                        history.push({ pathname: '/dashboard/orateur-list', state: dataToPass })
                        
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
        setOrateur({ ...orateur, [name]: value })
        validate(fieldValues)

        //console.log(orateur)
    }

    const validate = (fieldValues = orateur) => {
        let valid = true
        let temp = {}
        if('nom' in fieldValues)
        temp.nom = fieldValues.nom ? "" : "Le nom est requis!"
        if ('prenom' in fieldValues)
        temp.prenom = fieldValues.prenom ? "" : "Le prénom est requis!"
        if ('pays' in fieldValues)
        temp.pays = fieldValues.pays ? "" : "Le pays est requis!"

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
                                    <h4 className="card-title">Add Orateur</h4>
                                </Card.Header.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col lg="12">
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Form.Group>
                                                <Form.Control required name="personneId" value={orateur.personneId} type="hidden" placeholder="" />
                                               
                                                <Form.Control name="orateurId" value={orateur.orateurId} type="hidden" placeholder="" />
                                                <Form.Group>
                                                    <Form.Label htmlFor="exampleFormControlSelect1">Eglise</Form.Label>
                                                    <select name="nomEglise" className="form-control" id="nomEglise" onChange={handleInputChange}>
                                                        {/*<option defaultValue disabled>Selectionner le type de média</option>*/}
                                                        {eglise.map((eglise) => (
                                                            <option value={orateur.egliseId} key={eglise.egliseId} >{eglise.nomEglise} </option>
                                                        ))}
                                                    </select>
                                                </Form.Group>
                                                <Form.Control name="nom" value={orateur.nom} onChange={handleInputChange} type="text" placeholder="Nom" isInvalid={!!errors.nom} />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.nom}
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                <Form.Control name="prenom" value={errors.nom} onChange={handleInputChange} type="text" isInvalid={!!errors.prenom} placeholder="Prénom" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.prenom}
                                                </Form.Control.Feedback>
                                                <Form.Control name="titre" value={orateur.titre} onChange={handleInputChange} type="text" placeholder="titre" />

                                                <Form.Control as="textarea" name="biographie" value={orateur.biographie} rows="5" placeholder="biographie" onChange={handleInputChange} ></Form.Control>


                                                <Form.Control name="biographie" value={orateur.biographie} onChange={handleInputChange} type="text" placeholder="biographie" />
                                                <Form.Control name="pays" value={orateur.pays} onChange={handleInputChange} type="text" isInvalid={!!errors.pays} placeholder="pays" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.pays}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="form-group">
                                                {/* <Button type="button" onClick={()=> history.push('/dashboard/orateur')}variant=" btn-primary">Submit</Button>{' '}*/}
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
export default AddOrateur;