/* eslint-disable no-unused-vars */
import { Divider, Typography, Button } from '@mui/material';
import * as React from 'react';
import IngredientCarousel from '../../components/organisms/Carousel/Carousel';
import IngredientList from '../../components/organisms/IngredientList/IngredientList';
/* import { InputAdornment } from '@mui/material'; 
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search'; */
import './IngredientPage.css';
import SearchBar from '../../components/molecules/SearchBar/SearchBar';
/* import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material/Autocomplete";
import { Box } from "@mui/system"; */
import { NavLink } from "react-router-dom";

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
      <Divider className="or-divider">or</Divider>
      <div className='helper-text'>
        <Typography>
          SELECT INGREDIENTS FROM THE CAROUSEL
        </Typography>
      </div>
      <IngredientCarousel />
      <Divider className="line-divider">YOUR INGREDIENTS</Divider>
      <IngredientList />
      <NavLink 
        to={{
          pathname: "/recipes",
        }}
        state= {{
          feed: false,
          // loading: {isSubmitting},
          filter: [],
        }}
        className={"next-page-button"}
      >
        <Button 
          variant="contained" 
          size="large" 
          sx={{"&&":{
            backgroundColor: "#df7b84", 
            fontWeight: "700",
            ":hover": {
              backgroundColor: "white",
              color: "#df7b84", 
            }
          }}}
          // onClick={() => console.log()}
        >
          Search
        </Button>
      </NavLink>
    </div>
  );
}

  export default IngredientPage;
  