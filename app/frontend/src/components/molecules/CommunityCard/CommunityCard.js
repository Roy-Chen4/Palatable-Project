/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
/* import * as React from 'react'; */
import {
    Button, Card, CardActions, CardContent,
    CardMedia, createTheme
} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import React, { useState } from "react";
import CommunityModal from '../Modal/CommunityModal';


export default function CommunityCard(props) {
     
  
    
    
    // const userEmail = useSelector((state) => state.user.value.email)
    
    const [recipeOpen, setRecipeOpen] = useState(false);

    // useEffect(() => {
    //     axios
    //     .get("/community/")
    //     .then((res) => {
    //         setRecipe([...res.data.data])
    //     })
    //     .catch((err) => {
    //         console.log(err.request);
    // });

    // }, [])

    const primaryTheme = createTheme({
        palette: {
          primary: {
            main: '#df7b84',
          },
        },
      });

    function handleOnClick(){
        const recipeValues = {
            "title": props.recipe.title, 
            "image": props.recipe.image, 
            "ingredients": props.recipe.ingredients,
            "instructions": props.recipe.instructions,
        }
    }

    const [instructions, setInstructions] = React.useState([])
    const [ingredients, setIngredients] = React.useState([])
    React.useEffect(()=> {
            setInstructions(props.recipe.instructions
                .replace(/<[^>]+>/g, '')
                .split(",")
                .filter(function(e){return e}));
            setIngredients(props.recipe.ingredients
                .replace(/<[^>]+>/g, '')
                .split(",")
                .filter(function(e){return e}));
    }, [])


    return (
        <div className="recipe-cards">
            <Card classname="recipe-container" variant="outlined" sx={{ width: "48vw" }} >
                <CardHeader
                    title={props.recipe.title}
                    /* action={
                        <IconButton 
                        aria-label="add to favorites"
                        onClick = {() => {handleOnClick()}}
                        >
                            <FavoriteIcon/>
                        </IconButton>
                    } */
                    sx={{textAlign: "center", }}
                />
                <CardContent>
                <CardMedia
                    component="img"
                    width="48vw"
                    image={props.recipe.image ? props.recipe.image : ''}
                />
                </CardContent>
                {/* <div className = "explore-button"> */}
                <CardActions className = "explore-button">
                    <Button size="small" onClick={()=>{setRecipeOpen(true)}} >Explore</Button>
                </CardActions>
            </Card>
            <CommunityModal 
                open={recipeOpen}
                recipe={props.recipe}
                title={props.recipe.title}
                type={"redux"}
                id={props.recipe.id}
                image={props.recipe.image}
                ingredients={ingredients}
                instructions={instructions}
                onClose={() => setRecipeOpen(false)} 
                primaryTheme={primaryTheme} 
            />
        </div>
    )

}

CommunityCard.propTypes = {
    key: PropTypes.number,
    recipe: PropTypes.any,
    id: PropTypes.any,
}



        /* setIsSubmitting(true); */
        /* if (colour !== "red") {
            setText("added to")
            setOpen(true);
            dispatch(add({favourited: [recipeValues]}));
            const allFaves = [...faves, recipeValues]
            const values = {email: userEmail, new_favourite: JSON.stringify(allFaves)}
            setColour("red");
            axios
            .post("/favourites/", values)
            .then((res) => {
                console.log(res)
            }).then(()=> {
                setTimeout(function() { 
                    setOpen(false);
                }.bind(this), 1000)
            })
            .catch((err) => {
                console.log(err.request);
            }); 
        } else {
            setText("removed from")
            setOpen(true);
            setColour("rgba(0, 0, 0, 0.54)");
            dispatch(remove({favourited: [recipeValues]}))
            const newFaves = faves.filter(i => i.id !== props.recipe.id);
            const values = {email: userEmail, new_favourite: JSON.stringify(newFaves)}
            axios
                .post("/favourites/", values)
                .then((res) => {
                    console.log(res)
                }).then(()=> {
                    setTimeout(function() { 
                        setOpen(false);
                    }.bind(this), 1000)
                })
                .catch((err) => {
                    console.log(err.request);
            }); 
        }
    } */

   /*  React.useEffect(()=> {
        setHeartColour();
        if (props.type === "feed") {
            setInstructions(props.recipe.instructions
                .replace(/<[^>]+>/g, '')
                .split(".")
                .filter(function(e){return e}));
            setIngredients(props.recipe.extendedIngredients);
        } else if (props.type === "redux") {
            setInstructions(props.recipe.instructions)
        }
        else {
            setIngredients([...props.recipe.missedIngredients, ...props.recipe.usedIngredients, ...props.recipe.unusedIngredients])
            retrieveInstructions();
        } 
    }, []) */
    
/* 
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/'+props.recipe.id+'/information',
        headers: {
            'X-RapidAPI-Key': '8176d37892msh319090cdc777d8ap1e4f8djsn0b7472bf3694',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    }; */
    /* function retrieveInstructions() {
        axios.request(options).then(function (response) {
            console.log(response.data);
            setInstructions(response.data.instructions
                .replace(/<[^>]+>/g, '')
                .split(".")
                .filter(function(e){return e}));
        }).catch(function (error) {
            console.error(error);
            setInstructions([]);
        });
    } */
/* 
    function getIngredients() {
        // check if from redux
        if (props.type === "redux") {
            return props.recipe.ingredients;
            // check if feed 
        } else if (props.type === "feed") {
            return props.recipe.extendedIngredients;
        } else {
            return [...props.recipe.missedIngredients, ...props.recipe.usedIngredients, ...props.recipe.unusedIngredients]
        }
    } */