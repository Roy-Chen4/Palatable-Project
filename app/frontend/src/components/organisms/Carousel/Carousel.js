/* eslint-disable no-unused-vars */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import 
{ 
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button 
} from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import Banner from '../../molecules/Banner/Banner';



function IngredientCarousel() {


    const ingredients = [
        {
            url: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            name: 'Meats',
            width: '100%',
            items: [
                {
                    url: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                    name: 'Vegetables',
                    width: '100%'
                },
                {
                    url: 'https://images.unsplash.com/photo-1564149504298-00c351fd7f16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                    name: 'Seasoning',
                    width: '100%',
                },
            ]
        },
        {
            url: 'https://images.unsplash.com/photo-1546622653-c4c1d0035acd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            name: 'Condiments',
            width: '100%',
            items: [
                {
                    url: 'https://images.unsplash.com/photo-1600626335465-0038a1ddcc2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                    name: 'Carbohydrates',
                    width: '100%'
                },
                {
                    url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                    name: 'Fruits',
                    width: '100%'
                },
            ]
        },
        
        {
            url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            name: 'Vegetables',
            width: '100%',
            items: [
                {
                    url: 'https://images.unsplash.com/photo-1600626335465-0038a1ddcc2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                    name: 'Fats and Oils',
                    width: '100%'
                },
                {
                    url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                    name: 'Grains',
                    width: '100%'
                },
            ]
        },
      ]
      

  return ( 
    <div className='IngredientDisplay'>
        <Carousel
            sx={{width:"100vw"}}
            className="ingredient-carousel"
            animation="slide" 
            interval={8000}
            cycleNavigation
            navButtonsAlwaysVisible
        >
            {ingredients.map((item, index) => {
                return (
                    <Banner
                        ingredient={item}
                        key={index}
                    />
                );
            })}
        </Carousel>
    </div>
  );
}

export default IngredientCarousel;