import { configureWeb3Modal } from "./connection";
import '@radix-ui/themes/styles.css';
import Header from './components/Header'
import Register from "./components/Register";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messages from "./components/messages";

configureWeb3Modal();
function App() {
    return (
    <>
    <Header />
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}/>
          <Route path="/" element={<Messages />} />
      </Routes>
    </BrowserRouter>
    
    <ToastContainer 
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
     />
     
    </>
  );
}

export default App
