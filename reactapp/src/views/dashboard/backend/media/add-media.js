import React, { useState, useContext, useEffect } from 'react'
//import React from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import Card from '../../../../components/dashboard/Card'
import { useHistory } from 'react-router-dom'

const AddMovie = () => { 

    const initialState = {
        datePublication: "",
        titre: "",
    }
    const dataToPass = { enregistrement: '1' };

    let history = useHistory()
    const [media, setMedia] = useState(initialState)
    const [errors, setErrors] = useState(initialState)
    const [validated, setValidated] = useState(false);


    const [typeMedia, setTypeMedia] = useState([])
    const [categorie, setCategorie] = useState([])
    const [langue, setLangue] = useState([])
    const [orateur, setOrateur] = useState([])
    useEffect(() => {

        axios.get("https://localhost:7157/api/Orateur").then((response) => {
            setOrateur(response.data);
        });
        axios.get("https://localhost:7157/api/Langue").then((response) => {
            setLangue(response.data);
        });
        axios.get("https://localhost:7157/api/Categorie").then((response) => {
            setCategorie(response.data);
        });
        axios.get("https://localhost:7157/api/TypeMedia").then((response) => {
            setTypeMedia(response.data);
        });

    }, []);

    async function handleSubmit(e) {

        e.preventDefault()
        validate()
        try {
            if (validate())
                await axios.post('https://localhost:7157/api/Orateur', {
                    datePublication: typeMedia.datePublication,
                    titre: typeMedia.titre,
                    langueId: typeMedia.langueId,
                    categoryId: typeMedia.categoryId,
                    orateurId: typeMedia.orateur,
                    typeMediaId: typeMedia.typeMedia

                   

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
        setOrateur({ ...orateur, [name]: value })
        validate(fieldValues)

        //console.log(orateur)
    }

    const validate = (fieldValues = orateur) => {
        let valid = true
        let temp = {}
        if ('Nom' in fieldValues)
            temp.Nom = fieldValues.Nom ? "" : "Le nom est requis!"
        if ('Prenom' in fieldValues)
            temp.Prenom = fieldValues.Prenom ? "" : "Le prénom est requis!"
        if ('Pays' in fieldValues)
            temp.Pays = fieldValues.Pays ? "" : "Le pays est requis!"

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
                                        <h4 className="card-title">Ajouter un média</h4>
                                    </Card.Header.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Row>
                                            <Col lg="7">
                                            <Row>
                                                <Form.Group className="col-md-6">
                                                    <select className="form-control" id="exampleFormControlSelect1">
                                                        <option disabled>Type de Media</option>
                                                        {typeMedia.map((typeMd) => (
                                                            <option value={typeMd.typeMediaId} key={typeMd.typeMediaId} >{typeMd.libelle} </option>
                                                        ))}
                                                    </select>
                                                </Form.Group>
                                                <Col sm="6" className="form-group">
                                                    <select className="form-control" id="exampleFormControlSelect2">
                                                        <option disabled>Catégorie</option>
                                                        <option>FULLHD</option>
                                                        <option>HD</option>
                                                    </select>
                                                </Col>

                                                    <Form.Group className="col-12">
                                                        <Form.Control type="text" placeholder="Title"/>
                                                    </Form.Group>
                                                    <div className="col-12 form_gallery form-group">
                                                        <label id="gallery2" htmlFor="form_gallery-upload">Insérer une image</label>
                                                        <input data-name="#gallery2" id="form_gallery-upload" className="form_gallery-upload"
                                                        type="file" accept=".png, .jpg, .jpeg"/>
                                                    </div>
                                                    <Form.Group className="col-12">
                                                    <Form.Control as="textarea" id="text" name="text" rows="5"
                                                        placeholder="Description"></Form.Control>
                                                    </Form.Group>
                                                </Row>
                                            </Col>
                                            <Col lg="5">
                                                <div className="d-block position-relative">
                                                    <div className="form_video-upload">
                                                        <input type="file" accept="video/mp4,video/x-m4v,video/*" multiple/>
                                                        <p>Télécharger une vidéo</p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="6" className="form-group">
                                                <Form.Control type="text" placeholder="Release year"/>
                                            </Col>
                                            <Col sm="6" className="form-group">
                                                <select className="form-control" id="exampleFormControlSelect3">
                                                    <option defaultValue disabled="">Langue d'origine</option>
                                                    <option>English</option>
                                                    <option>Hindi</option>
                                                    <option>Tamil</option>
                                                    <option>Gujarati</option>
                                                </select>
                                            </Col>
                                            <Col sm="12" className="form-group">
                                                <Form.Control type="text" placeholder="Movie Duration"/>
                                            </Col>
                                            <Form.Group className="col-12">
                                                <Button type="button" onClick={()=> history.push('/movie-list')}variant="primary">Soumettre</Button>{' '}
                                                <Button type="reset" variant="danger">Annuler</Button>
                                            </Form.Group>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
export default AddMovie;