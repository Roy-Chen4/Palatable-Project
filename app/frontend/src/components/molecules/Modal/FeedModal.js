/* eslint-disable no-unused-vars */
/* import React from "react";
import { 
    DialogContent, 
    DialogTitle, 
    DialogActions, 
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogContentText,
    makeStyles,
    Typography,
} 
from '@mui/material';
import { Dialog } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { dietChange } from "../../../reducers/isLogged";
import PropTypes from 'prop-types';
import './Modal.css';
import ScrollTopButton from "./ScrollTopButton";
import { useEffect, useState, useRef } from 'react';
import IconButton from "@mui/material/IconButton";
import { Grid, Card, CardContent } from '@material-ui/core';

export default function FeedModal(props) {

    const getIngredientCard = (jsonResultsId) => {
        const {id, first_name} = jsonResults[`${jsonResultsId}`];
        return (
            <Grid item xs={4} sm={4} key={jsonResultsId}>
                <Card>
                    <CardContent>
                        <Typography>{`${id}. ${first_name}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    const [jsonResults, setJsonResults] = useState([]);

    const [ingredientName, setIngredientName] = useState([]);

    useEffect(() => {
        fetch("https://www.balldontlie.io/api/v1/players")
        .then((response) => response.json())
        .then((json) => setJsonResults(json.data))
        }, [])
        console.log(jsonResults);


    return (
        <div>
        <Dialog open={props.open} onClose={() => props.onClose()} fullScreen='true' maxWidth='md' >
            <Grid container spacing={2}>
                {Object.keys(ingredientName).map((jsonResultsId) => 
                    getIngredientCard(jsonResultsId)
                )}
            </Grid>
            <Button 
                onClick={() => props.onClose()}
                variant="contained"
                theme={props.secondaryTheme}
            > 
                Close 
            </Button>
            <ScrollTopButton/>
        </Dialog>
        </div>
    )







}

FeedModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    primaryTheme: PropTypes.func,
    secondaryTheme: PropTypes.func,
} */



import React from "react";
import { 
    DialogContent, 
    DialogTitle, 
    DialogActions, 
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogContentText,
    makeStyles,
    Typography,
} 
from '@mui/material';
import { Dialog } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { dietChange } from "../../../reducers/isLogged";
import PropTypes from 'prop-types';
import './Modal.css';
import ScrollTopButton from "./ScrollTopButton";
import { useEffect, useState, useRef } from 'react';
import IconButton from "@mui/material/IconButton";
import { Grid, Card, CardContent } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Container } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { CircularProgress } from '@mui/material'

export default class FeedModal extends React.Component {
    
/*     const [ingredientName, setIngredientName] = useState([]);

    useEffect(() => {
        fetch("https://www.balldontlie.io/api/v1/players")
        .then((response) => response.json())
        .then((data) => setIngredientName(data))
        }, [])

        
    const getIngredientCard = (ingredientId) => {
        console.log(ingredientName[`${ingredientId}`])
        const {id, first_name} = ingredientName[`${ingredientId}`]
        return (
        <Grid item xs={4} key={ingredientId}>
            <Card>
                <CardContent>
                    <Typography>{ingredientName.first_name}</Typography>
                </CardContent>
            </Card>
        </Grid>
        )
    }


    return (
        <Container>
            {ingredientName ? (
                <Grid container spacing={2} xs={12} md={6} lg={4}>
                    {Object.keys(ingredientName).map(ingredientId => 
                        getIngredientCard(ingredientId)
                        )}
                </Grid>
            ) : (
                <CircularProgress/>
            )}
            <ScrollTopButton/>
        </Container>
    ); */











    
/*     state = {
        loading: true,
        position:[],
        player: []
    }

    async componentDidMount () {
        const url = 'https://manutd-players.herokuapp.com/players'
        const response = await fetch(url)
        const data = await response.json()

        const {
            players = [],
            positionList = players.slice(0,4).map(item => item.position).flat(),
            memberList = players.slice(0,4).map(item => item.members).flat()
        } = data

        this.setState({ player: memberList, position: positionList, loading: false })
    }

    render() {
        if (this.state.loading) {
            return <div>Loading</div>
        }

        if (!this.state.player.length) {
            return <div>No</div>
        }

        return (
            <div>
                <h1>Hi</h1>
                {this.state.position.map((place, index) => {
                    return (
                        <Grid key={index}>
                            <Grid container spacing={2} style={{paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px"}}>
                                {this.state.player.map((item, key) => {
                                    if (place === item.position) {
                                        return (
                                            <Grid item xs={3} key={key}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography><b>{item.name}</b></Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        )
                                    }
                                })}
                            </Grid>
                        </Grid>
                    )
                })}
            </div>
        )

    } */


    state = {
        loading: true,
        title: [],
        ingredient: []
    }

    async componentDidMount () {
        const url = 'https://manutd-players.herokuapp.com/players'
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '8176d37892msh319090cdc777d8ap1e4f8djsn0b7472bf3694',
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        };
        
        fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?limitLicense=false&offset=0&number=10&minIron=0&minCalcium=0&maxVitaminB2=1000&maxMagnesium=1000&minPotassium=0&maxVitaminB6=1000&intolerances=peanut%2C%20shellfish&maxVitaminB5=1000&minFolicAcid=0&minVitaminA=0&maxSodium=1000&maxSugar=1000&maxVitaminA=5000&maxFluoride=1000&minFluoride=0&minVitaminB1=0&minCholine=0&ranking=2&minFat=5&maxVitaminB1=1000&minVitaminB12=0&maxSelenium=1000&minZinc=0&minFolate=0&maxManganese=1000&maxVitaminB12=1000&maxPotassium=1000&maxIron=1000&minSelenium=0&minVitaminK=0&maxFiber=1000&minSodium=0&maxCopper=1000&minCalories=150&maxCholine=1000&minCholesterol=0&maxVitaminE=1000&minProtein=5&minVitaminB3=0&minVitaminB6=0&maxIodine=1000&excludeIngredients=coconut%2C%20mango&maxProtein=100&minMagnesium=0&minCarbs=5&cuisine=american&maxCaffeine=1000&maxSaturatedFat=50&maxVitaminK=1000&minAlcohol=0&minIodine=0&query=burger&minSaturatedFat=0&includeIngredients=onions%2C%20lettuce%2C%20tomato&minVitaminE=0&maxCalcium=1000&minFiber=0&minVitaminC=0&maxZinc=1000&maxCalories=1500&maxAlcohol=1000&minPhosphorus=0&minVitaminD=0&minVitaminB2=0&minSugar=0&maxFolate=1000&type=main%20course&maxCholesterol=1000&maxVitaminB3=1000&minCaffeine=0&minVitaminB5=0&maxFolicAcid=1000&maxCarbs=100&maxVitaminD=1000&equipment=pan&maxFat=100&minCopper=0&maxVitaminC=1000&maxPhosphorus=1000&minManganese=0', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        const {
            results = [],
            titleList = results.slice(0,4).map(item => item.title).flat()
        } = data

        this.setState({ title: titleList, loading: false })
    }

    render() {
        if (this.state.loading) {
            return <div>Loading</div>
        }

        /* if (!this.state.ingredient.length) {
            return <div>No</div>
        } */

        return (
            <div>
                <h1>Hi</h1>
                {/* {this.state.likes.map((place, index) => {
                    return (
                        <Grid key={index}>
                            <Grid container spacing={2} style={{paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px"}}>
                                {this.state.usedIngredientCount.map((item, key) => {
                                    if (place === item.likes) {
                                        return (
                                            <Grid item xs={3} key={key}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography><b>{item.title}</b></Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        )
                                    }
                                })}
                            </Grid>
                        </Grid>
                    )
                })} */}
                {this.state.title.map((item,key) => {
                    return (
                        <Grid key={key}>
                            <Grid container spacing={2} style={{paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px"}}>
                                <Card>
                                    <CardContent>
                                        <Typography><b>{item.title}</b></Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    )
                })}
            </div>
        )

    }
}
/* 
export default FeedModal; */