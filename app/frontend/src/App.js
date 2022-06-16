import logo from './logo.svg';
import './App.css';
import { Button } from './components/atoms/Button/Button.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <Button
          loginregister
        >
          Work In Progress
        </Button>
      </header>
    </div>
  );
}

export default App;
