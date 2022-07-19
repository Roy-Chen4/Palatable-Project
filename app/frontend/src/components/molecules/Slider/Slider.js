/* eslint-disable no-unused-vars */
import React from "react";
import {
  Card,
  Typography,
  Grid,
  ButtonBase
} from "@mui/material";
import PropTypes from 'prop-types';
import CategoryModal from "../Modal/CategoryModal";
import './Slider.css'
import { styled } from '@mui/material/styles';

function Banner(props) {
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;

    const [categoryModalOpen, setCategoryModalOpen] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState('');

    const ImageButton = styled(ButtonBase)(({theme}) => ({
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('sm')]: {
        //   width: '100% !important',
          height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zindex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        },
      }));
      
    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 10,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        borderRadius: '2vw',
    });
      
      const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 10,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
      }));
      
    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 10,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundColor: theme.palette.common.black,
        opacity: 0.5,
        borderRadius: '2vw',
        transition: theme.transitions.create('opacity'),
    }));
      
    const ImageMarked = styled('span')(({ theme }) => ({
        height: 0,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));

    const [ingredientList, setIngredientList] = React.useState([]);

    function generateList(category) {
        let list = []
        if (category === 'Meats') {
            return (list = [
                {
                    name: "Bacon"
                },
                {
                    name: "Beef"
                },
                {
                    name: "Chicken"
                },
                {
                    name: "Crab"
                },
                {
                    name: "Goat"
                },
                {
                    name: "Lamb"
                },
                {
                    name: "Lobster"
                },
                { 
                    name: "Pork"
                },
                {
                    name: "Salmon"
                },
                {
                    name: "Turkey"
                },
            ])
        }
        else if (category === 'Vegetables') {
            return (list = [
                {
                    name: "Beetroot"
                },
                {
                    name: "Broccoli"
                },
                {
                    name: "Celery"
                },
                {
                    name: "Cucumber"
                },
                {
                    name: "Garlic"
                },
                { 
                    name: "Lettuce"
                },
                {
                    name: "Onion"
                },
                {
                    name: "Potato"
                },
                {
                    name: "Pumpkin"
                },
                {
                    name: "Shallot"
                },
            ])
        }
        else if (category === 'Seasoning') {
            return (list = [
                {
                    name: "Basil"
                },
                {
                    name: "Chilli Flakes"
                },
                {
                    name: "Cumin"
                },
                {
                    name: "Ground Cinnamon"
                },
                {
                    name: "Ground Ginger"
                },
                {
                    name: "Organo"
                },
                {
                    name: "Pepper"
                },
                {
                    name: "Paprika"
                },
                { 
                    name: "Salt"
                },
                {
                    name: "Thyme"
                },
            ])
        }
        else if (category === 'Condiments') {
            return (list = [
                {
                    name: "BBQ Sauce"
                },
                {
                    name: "Chilli Sauce"
                },
                {
                    name: "Garlic Sauce"
                },
                {
                    name: "Honey"
                },
                {
                    name: "Mayo"
                },
                {
                    name: "Mustard"
                },
                {
                    name: "Soy Sauce"
                },
                {
                    name: "Sweet Chilli"
                },
                { 
                    name: "Tomato Sauce"
                },
                {
                    name: "Vinegar"
                },
            ])
        }
        else if (category === 'Carbohydrates') {
            return (list = [
                { 
                    name: "Bread"
                },
                {
                    name: "Dough"
                },
                {
                    name: "Penne"
                },
                {
                    name: "Rice"
                },
                {
                    name: "Spaghetti"
                },
                {
                    name: "Tortillas"
                },
            ])
        }
        else if (category === 'Fruits') {
            return (list = [
                { 
                    name: "Apple"
                },
                {
                    name: "Banana"
                },
                {
                    name: "Bittermelon"
                },
                {
                    name: "Lemon"
                },
                {
                    name: "Orange"
                },
                {
                    name: "Pear"
                },
                {
                    name: "Pomegranate"
                },
                {
                    name: "Rockmelon"
                },
                {
                    name: "Strawberries"
                },
                {
                    name: "Watermelon"
                },
            ])
        }
        else if (category === 'Grains') {
            return (list = [
                {
                    name: "Barley"
                },
                {
                    name: "Maize"
                },
                {
                    name: "Oats"
                },
                { 
                    name: "Wheat"
                },
            ])
        }
        else if (category === 'Fats and Oils') {
            return (list = [
                { 
                    name: "Butter"
                },
                {
                    name: "Coconut Oil"
                },
                {
                    name: "Ghee"
                },
                {
                    name: "Grapeseed Oil"
                },
                {
                    name: "Margarine"
                },
                {
                    name: "Olive Oil"
                },
                {
                    name: "Seasame Oil"
                },
            ])
        }
        else if (category === 'Miscellaneous') {
            return (list = [
                {
                    name: "Dark Chocolate"
                },
                { 
                    name: "Ice"
                },
                {
                    name: "Paper"
                },
                {
                    name: "Sugar"
                },
            ])
        }
        return list;
    }

    let items = [];
    const content = (
        <Grid item xs={12 / totalItems} key="content">
            <ImageButton
                focusRipple
                key={props.ingredient.name}
                onClick={() => {
                    setSelectedCategory(props.ingredient.name);
                    setCategoryModalOpen(true);
                }}
                style={{
                    width: props.ingredient.width,
                    borderRadius: '2vw',
                }}
            >
                <ImageSrc style={{ backgroundImage: `url(${props.ingredient.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                        component="span"
                        variant="h5"
                        color="inherit"
                        sx={{"&&":{
                            position: 'relative',
                            fontSize: '1.4rem', 
                            fontWeight: '700', 
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}}
                    >
                        {props.ingredient.name}
                        <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                </Image>
            </ImageButton>
        </Grid>
    );

    for (let i = 0; i < mediaLength; i++) {
        const ingredient = props.ingredient.items[i];

        const media = (
            <Grid item xs={12 / totalItems} key={ingredient.name}>
                <ImageButton
                    focusRipple
                    key={ingredient.title}
                    onClick={() => {
                        setSelectedCategory(ingredient.name);
                        setCategoryModalOpen(true);
                    }}
                    style={{
                        width: ingredient.width,
                        borderRadius: '2vw',
                    }}
                >
                    <ImageSrc style={{ backgroundImage: `url(${ingredient.url})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        <Typography
                            component="span"
                            variant="h5"
                            color="inherit"
                            sx={{"&&":{
                                position: 'relative',
                                fontSize: '1.4rem',
                                fontWeight: '700', 
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}}
                        >
                            {ingredient.name}
                            <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                </ImageButton>
            </Grid>
        );

        items.push(media);
    }

    items.unshift(content);

    return (
        <div className="slider">
            <Card raised className="Banner">
                <Grid container spacing={0} className="BannerGrid">
                    {items}
                </Grid>
            </Card>
            <CategoryModal 
                open={categoryModalOpen}
                onClose={()=>{setCategoryModalOpen(false)}}
                category={selectedCategory}
                list={generateList(selectedCategory)}
                ingredientList={ingredientList}
                setIngredientList={()=>setIngredientList()}
            />
        </div>
    );
}

export default Banner;

Banner.propTypes = {
    contentPosition: PropTypes.string,
    length: PropTypes.number,
    ingredient: PropTypes.func,
}