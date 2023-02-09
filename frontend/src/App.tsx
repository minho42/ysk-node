import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CurrencyList from "./components/CurrencyList";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CurrencyList />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
