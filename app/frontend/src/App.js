import * as React from 'react';
import ReactDOM from "react-dom";
import Layout from './config/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngredientPage from './containers/IngredientPage/IngredientPage';
import RecipePage from './containers/RecipePage/RecipePage'
import { Provider } from "react-redux";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import userReducer from './reducers/isLogged';
import ingredientReducer from './reducers/userIngredients';
import FavouritePage from './containers/FavouritePage/FavouritePage'
import favouriteReducer from './reducers/isFavourited';
import CreatorPage from './containers/CreatorPage/CreatorPage';
import CommunityPage from './containers/CommunityPage/CommunityPage';

export default function App() {
  // Create redux store

  const reducers = combineReducers ({
    user: userReducer,
    ingredients: ingredientReducer,
    favourited: favouriteReducer,
  })


  const persistConfig = {
    key: 'root',
    storage
  };

  const persistedReducer = persistReducer(persistConfig, reducers);
  const store = configureStore({
    reducer: persistedReducer
  },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
    
  let persistor = persistStore(store);

  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IngredientPage />} />
              <Route path="recipes" element={<RecipePage />} />
              <Route path="creator" element={<CreatorPage />} />
              <Route path="community" element={<CommunityPage />} />
              <Route path="favourites" element={<FavouritePage />} />
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
