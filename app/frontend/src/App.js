import * as React from 'react';
import ReactDOM from "react-dom";
import Layout from './config/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngredientPage from './containers/IngredientPage/IngredientPage';
import RecipePage from './containers/RecipePage/RecipePage'
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/isLogged';
import ingredientReducer from './reducers/userIngredients';

export default function App() {
  // Create redux store
  const store = configureStore({
    reducer: {
      user: userReducer,
      ingredients: ingredientReducer,
    }},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    
  return(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IngredientPage />} />
            <Route path="recipes" element={<RecipePage />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
