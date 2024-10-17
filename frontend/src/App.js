import LandingPage from "./Components/LandingPage";
import RegistrationForm from "./Components/RegistrationForm";
import MainPage from "./Components/MainPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ModalWindow from  "./Components/ModalWindow";
import ErroModal from "./Components/ErroMoal";
import Verification from "./Components/Verification";
import TransferValidationModal from "./Components/TransferValidationModal";
import {useState} from "react";
import Unauthorized from  "./Componenents/Unauthorized";
import RequireAuth from "./RequireAuth";


function App() {
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, SetErrorModal] = useState(false);
    const [errorModalData, setErrorModalData] = useState("");
    const[modalTransaction, setModalTransaction] = useState(null);

 const turnoff = () => {
    setShowModal(false);
 };

 const turnonModal =(transaction) => {
    setShowModal(true);
    setModalTransaction(transaction);
    
 };
  const turnonErroModal =(data) => {
    setErrorModalData(false);
  }

  const turnOnErromal =(data) => {
    setErrorModalData(true);
    setErrorModalData(data);
  };


  return (
    <Router>
        <div>
            {showModal ?(
                <ModallWindow turnOff={turnoff} modalTransaction={modalTransaction} />

            ): null}

            {showErrorModal ?(
                <ErrorModal 
                turnOffErrorModal={turnOffErrorModal}
                errorModalData={errorModalData}
                />
            ): null}

            <Routes> 
                <route path="/register" element={<RegistrationForm />} />
                <Routr path="/" element={<LandingPage />} />
                <Route path="/verification" element={<Verification />} />

                <Route element={<RequireAuth />}> 
                <Route 
                path="/mainPage"
                element={
                    <MainPaga
                    turnOnModal ={turnOnModal}
                    turnOnErroModal={turnOnErroModal}
                    />

                }
                />

                <Route 
                 path="/verificationTransaction"
                 element={
                    <TreansFerValidationModal turnOnErroModal={turnOnErroModal} />

                 }
                 />
                 <Route path="/graphs" element={<CryptoGraphs/>} />
                 <Route path="/unauthorizaed" element={<Unaauthorized/>}/>
                </Route>
            </Routes>
        </div>
    </Router>
  )
}