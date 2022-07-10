/* eslint-disable no-unused-vars */
import React from "react";
import {
  Card,
  Typography,
  Grid,
  ButtonBase
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CategoryModal from "../Modal/CategoryModal";
import './Slider.css'

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


    function generateList(category) {
        let list = []
        if (category === 'Meats') {
            return (list = [
                { 
                    name: "Pork"
                },
                {
                    name: "Beef"
                },
                {
                    name: "Goat"
                },
                {
                    name: "Lamb"
                },
                {
                    name: "Chicken"
                },
                {
                    name: "Turkey"
                },
                {
                    name: "Bacon"
                },
                {
                    name: "Lobster"
                },
                {
                    name: "Crab"
                },
                {
                    name: "Salmon"
                },
            ])
        }
        else if (category === 'Vegetables') {
            return (list = [
                { 
                    name: "Lettuce"
                },
                {
                    name: "Beetroot"
                },
                {
                    name: "Potato"
                },
                {
                    name: "Broccoli"
                },
                {
                    name: "Onion"
                },
                {
                    name: "Garlic"
                },
                {
                    name: "Shallot"
                },
                {
                    name: "Celery"
                },
                {
                    name: "Cucumber"
                },
                {
                    name: "Pumpkin"
                },
            ])
        }
        else if (category === 'Seasoning') {
            return (list = [
                { 
                    name: "Salt"
                },
                {
                    name: "Pepper"
                },
                {
                    name: "Basil"
                },
                {
                    name: "Cumin"
                },
                {
                    name: "Ground Ginger"
                },
                {
                    name: "Chilli Flakes"
                },
                {
                    name: "Ground Cinnamon"
                },
                {
                    name: "Paprika"
                },
                {
                    name: "Thyme"
                },
                {
                    name: "Organo"
                },
            ])
        }
        else if (category === 'Condiments') {
            return (list = [
                { 
                    name: "Tomato Sauce"
                },
                {
                    name: "BBQ Sauce"
                },
                {
                    name: "Mustard"
                },
                {
                    name: "Mayo"
                },
                {
                    name: "Sweet Chilli Sauce"
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
                    name: "Vinegar"
                },
                {
                    name: "Soy Sauce"
                },
            ])
        }
        else if (category === 'Carbohydrates') {
            return (list = [
                { 
                    name: "Bread"
                },
                {
                    name: "Rice"
                },
                {
                    name: "Penne"
                },
                {
                    name: "Cumin"
                },
                {
                    name: "Spaghetti"
                },
                {
                    name: "Tortillas"
                },
                {
                    name: "Dough"
                },
            ])
        }
        else if (category === 'Fruits') {
            return (list = [
                { 
                    name: "Apple"
                },
                {
                    name: "Orange"
                },
                {
                    name: "Banana"
                },
                {
                    name: "Pomegranate"
                },
                {
                    name: "Watermelon"
                },
                {
                    name: "Rockmelon"
                },
                {
                    name: "Bittermelon"
                },
                {
                    name: "Pear"
                },
                {
                    name: "Lemon"
                },
                {
                    name: "Strawberries"
                },
            ])
        }
        else if (category === 'Grains') {
            return (list = [
                { 
                    name: "Wheat"
                },
                {
                    name: "Oats"
                },
                {
                    name: "Maize"
                },
                {
                    name: "Barley"
                },
            ])
        }
        else if (category === 'Fats and Oils') {
            return (list = [
                { 
                    name: "Butter"
                },
                {
                    name: "Margarine"
                },
                {
                    name: "Ghee"
                },
                {
                    name: "Olive Oil"
                },
                {
                    name: "Grapeseed Oil"
                },
                {
                    name: "Coconut Oil"
                },
                {
                    name: "Seasame Oil"
                },
            ])
        }
        else if (category === 'Miscellaneous') {
            return (list = [
                { 
                    name: "Ice"
                },
                {
                    name: "Dark Chocolate"
                },
                {
                    name: "Sugar"
                },
                {
                    name: "Paper"
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
                        sx={{
                            position: 'relative',
                            fontSize: '1.4rem', 
                            fontWeight: '700', 
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
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
                            sx={{
                                position: 'relative',
                                fontSize: '1.4rem',
                                fontWeight: '700', 
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}
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