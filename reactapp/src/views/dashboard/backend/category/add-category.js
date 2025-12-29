
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../../components/dashboard/Card'
import { useHistory } from 'react-router-dom'


import { set } from 'date-fns/fp'
function AddCategory() {

    const initialState = {
        libelle: "",
        description: "",
        typeMediaId: 0,
    }
    const dataToPass = { enregistrement: '1' };

    let history = useHistory()
    const [category, setCategory] = useState(initialState)
    const [errors, setErrors] = useState(initialState)
    const [validated, setValidated] = useState(false);


    const [typeMedias, setTypeMedias] = useState([])
    useEffect(() => {
        axios.get("https://localhost:7157/api/TypeMedia").then((response) => {
            setTypeMedias(response.data);
        });
    }, []);

    //const listTypeMedias = typeMedias.map((typeMedia) => (
    //    <option key={typeMedia.typeMediaId}>{typeMedia.libelle} </option>
    //));


    async function handleSubmit(e) {

        e.preventDefault()
        validate()
        try {
            if (validate())
                await axios.post('https://localhost:7157/api/Categorie', {
                    libelle: category.libelle,
                    description: category.description,
                    typeMediaId: category.typeMediaId,
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
                            history.push({ pathname: '/dashboard/category-list', state: dataToPass })

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
        setCategory({ ...category, [name]: value })
        validate(fieldValues)

        //console.log(category)
    }

    const validate = (fieldValues = category) => {
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
                                    <h4 className="card-title">Nouvelle catégorie</h4>
                                </Card.Header.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col lg="12">
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Form.Group>

                                                <Form.Control name="categoryId" value={category.categoryId} type="hidden" placeholder="" />
                                                <Form.Control name="libelle" value={category.libelle} onChange={handleInputChange} type="text" placeholder="Libelle" isInvalid={!!errors.libelle} />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.libelle}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                                <Form.Group>
                                                    <Form.Label htmlFor="exampleFormControlSelect1">Type de média</Form.Label>
                                                    <select name="typeMediaId" className="form-control" id="type-media" onChange={handleInputChange}>
                                                            {/*<option defaultValue disabled>Selectionner le type de média</option>*/}
                                                            {typeMedias.map((typeMedia) => (
                                                                <option value={typeMedia.typeMediaId} key={typeMedia.typeMediaId} >{typeMedia.libelle} </option>
                                                            ))}
                                                    </select>
                                                </Form.Group>
                                            <Form.Group>
                                                <Form.Control as="textarea" name="description" value={category.description} rows="5" placeholder="Description" onChange={handleInputChange} ></Form.Control>

                                                {/*    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                                                {/*    <Form.Control name="description" onChange={handleInputChange} type="textarea" rows={4} cols={40} isInvalid={!!errors.description} placeholder="Description" />*/}
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
export default AddCategory;