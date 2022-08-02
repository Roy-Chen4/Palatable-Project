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

    const [recipeOpen, setRecipeOpen] = useState(false);
    const [instructions, setInstructions] = React.useState([])
    const [ingredients, setIngredients] = React.useState([])
    const [tags, setTags] = React.useState([])

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

    React.useEffect(()=> {
            setInstructions(props.recipe.instructions
                .replace(/<[^>]+>/g, '')
                .split(",")
                .filter(function(e){return e}));
            setIngredients(props.recipe.ingredients
                .replace(/<[^>]+>/g, '')
                .split(",")
                .filter(function(e){return e}));
            setTags(props.recipe.tags);
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
                tags={tags}
                genre={props.recipe.genre}
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
