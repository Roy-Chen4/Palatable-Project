import * as React from 'react';
/* import { InputAdornment } from '@mui/material'; 
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search'; */
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import './IngredientPage.css';
import SearchBar from './SearchBar';
/* import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material/Autocomplete";
import { Box } from "@mui/system"; */



const button_disp = [
  {
    url: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    title: 'Meats',
    width: '16.6%',
  },
  {
    url: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    title: 'Vegetables',
    width: '16.6%'
  },
  {
    url: 'https://images.unsplash.com/photo-1564149504298-00c351fd7f16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    title: 'Seasoning',
    width: '16.6%',
  },
  {
    url: 'https://images.unsplash.com/photo-1546622653-c4c1d0035acd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    title: 'Condiments',
    width: '16.6%'
  },
  {
    url: 'https://images.unsplash.com/photo-1600626335465-0038a1ddcc2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    title: 'Carbohydrates',
    width: '16.6%'
  },
  {
    url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    title: 'Fruits',
    width: '16.6%'
  },
]

const ImageButton = styled(ButtonBase)(({theme}) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
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
    /*'& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
    */
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

/* const [jsonResults, setJsonResults] = useState([]);

useEffect(() => {
  fetch("https://www.balldontlie.io/api/v1/players")
  .then((response) => response.json())
  .then((json) => setJsonResults(json.data))
}, []) */

/* const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
  return items.filter(ingredient => ingredient.name.includes(query))
}

const [query, setQuery] = useState("");

const {ingredients} = IngredientList;

/* const {items} = ingredients;

const filteredItems = getFilteredItems(query, items);
 */

/* const data = [
  "apple",
];

const SearchBar = ({setSearchQuery}) => (
  <form>
    <TextField
      id="searchbar"
      className="text"
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Enter ingredient"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
);

const filterData = (query, data) => {
  if (!query) {
    return data;
  }
  else {
    return data.filter((d) => d.toLowerCase().includes(query));
  }
};

const [searchQuery, setSearchQuery] = useState("");
const dataFiltered = filterData(searchQuery, data); */ 

function IngredientPage() {
  
  return (
    <div className="IngredientPage">
      <div className='TextInput'>
          {/* <TextField
          variant='outlined'
          margin='normal'
          sx={{position: "relative", display: "flex", justifyContent: "center", alignContent: "center", width: "30%", backgroundColor: "white"}}
          InputProps={{
              endAdornment: (
                  <InputAdornment>
                      <SearchIcon/>
                  </InputAdornment>
              )
          }}
          /> */}
        <SearchBar/>
      </div>
        {/* <div
      style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 20
      }}
    >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div style={{ padding: 3 }}>
        {dataFiltered.map((d) => (
          <div
              className="text"
              style={{
              padding: 5,
              justifyContent: "normal",
              fontSize: 20,
              color: "blue",
              margin: 1,
              width: "250px",
              BorderColor: "green",
              borderWidth: "10px"
            }}
            key={d.id}
          >
            {d}
          </div>
        ))}
      </div>
    </div> */}
      <div className='IngredientDisplay'>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%'}}>
          {button_disp.map((image) => (
            <ImageButton
              focusRipple
              key={image.title}
              style={{
                width: image.width,
                borderRadius: '2vw',
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    /*
                    p: 4,
                    pt: 2,
                    */
                    fontSize: '1.25vw',
                    fontWeight: 'bold', 
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>
      </div>
    </div>
  );
}

  export default IngredientPage;
  