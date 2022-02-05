import  { NavBarComponent, FooterComponent } from './components'
import { Home, Chat } from './routes'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ReactSession } from 'react-client-session'
import './App.css';

function App() {
  
  ReactSession.setStoreType('sessionStorage');

  return (
    <Router>
      <div className="App">
        <NavBarComponent />
        <main className="Content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
