import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Addition from './pages/Addition';
import CryptoConvert from './pages/CryptoConvert';
import StringManagment from './pages/StringsManagment'
import IsPositif from './pages/IsPositif';
import Parity from './pages/Parity';
import ArrayManagment from './pages/ArrayManagment';
import Rectangle from './pages/Rectangle';
import Payment from './pages/Payment';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path= "/" element= {<Home/>}/>
          <Route path= "/exercice/1" element={<Addition/>}/>
          <Route path= "/exercice/2" element={<CryptoConvert/>}/>
          <Route path= "/exercice/3" element={<StringManagment/>}/>
          <Route path= "/exercice/4" element={<IsPositif/>}/>
          <Route path= "/exercice/5" element={<Parity/>}/>
          <Route path= "/exercice/6" element={<ArrayManagment/>}/>
          <Route path= "/exercice/7" element={<Rectangle/>}/>
          <Route path= "/exercice/8" element={<Payment/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
