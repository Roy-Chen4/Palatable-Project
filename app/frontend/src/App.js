import * as React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import Layout from './config/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngredientPage from './containers/IngredientPage/IngredientPage';
import RecipePage from './containers/RecipePage/RecipePage'

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IngredientPage />} />
          <Route path="recipes" element={<RecipePage />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
