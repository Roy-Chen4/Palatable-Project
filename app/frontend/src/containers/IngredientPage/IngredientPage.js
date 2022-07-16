import { Divider, Typography, Button } from '@mui/material';
import * as React from 'react';
import IngredientCarousel from '../../components/organisms/Carousel/Carousel';
import IngredientList from '../../components/organisms/IngredientList/IngredientList';
/* import { InputAdornment } from '@mui/material'; 
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search'; */
import './IngredientPage.css';
import SearchBar from './SearchBar';
/* import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material/Autocomplete";
import { Box } from "@mui/system"; */
import { NavLink } from "react-router-dom";





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
      <div className='helper-text1'>
        <Typography>
          SEARCH FOR INGREDIENTS IN THE SEARCHBAR
        </Typography>
      </div>
      <div className='TextInput'>
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
      {/* <div className='IngredientDisplay'>
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
      </div> */}
      <Divider className="or-divider">or</Divider>
      <div className='helper-text'>
        <Typography>
          SELECT INGREDIENTS FROM THE CAROUSEL
        </Typography>
      </div>
      <IngredientCarousel />
      <Divider className="line-divider">YOUR INGREDIENTS</Divider>
      <IngredientList />
      <NavLink to="/recipes" className={"next-page-button"}>
        <Button 
          variant="contained" 
          size="large" 
          sx={{
            backgroundColor: "#df7b84", 
            fontWeight: "700",
            ":hover": {
              backgroundColor: "white",
              color: "#df7b84", 
            }
          }}
          // onclick={() => {}}
        >
          Search
        </Button>
      </NavLink>
    </div>
  );
}

  export default IngredientPage;
  