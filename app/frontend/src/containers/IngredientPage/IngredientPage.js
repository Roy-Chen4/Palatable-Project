/* eslint-disable no-unused-vars */
import { Button, Divider, Typography } from '@mui/material';
import * as React from 'react';
import IngredientCarousel from '../../components/organisms/Carousel/Carousel';
import IngredientList from '../../components/organisms/IngredientList/IngredientList';
import SearchBar from '../../components/molecules/SearchBar/SearchBar';
import './IngredientPage.css';
import { NavLink } from "react-router-dom";
import SuggestionBar from '../../components/molecules/SuggestionBar/SuggestionBar';

/** 
* Ingredient page container
*/
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
      <div className='TextInput'>
        <SuggestionBar visible/>
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
            },
            position: "fixed",
            bottom: "1vh",
            right: "1vw",
          }}}
        >
          Search
        </Button>
      </NavLink>
    </div>
  );
}

  export default IngredientPage;
  