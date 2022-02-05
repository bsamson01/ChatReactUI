import  { NavBarComponent, FooterComponent } from './components'
import { Home } from './routes'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBarComponent />
        <main className="Content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
