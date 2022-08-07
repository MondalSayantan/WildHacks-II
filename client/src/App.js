import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Submit from "./pages/Submit";
import ProvideHelp from "./pages/ProvideHelp";
import HelpPage from "./pages/HelpPage";
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from "@mui/material/CircularProgress";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import InformationPage from "./pages/InformationPage";

export const endpoint = "http://localhost:6060";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full mt-5">
        <CircularProgress color="success" />
      </div>
    );
  }
  return (
    <div className="bg-blue-100 body">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/provide-help" element={<ProvideHelp />} />
        <Route path="/provide-help/:postID" element={<HelpPage />} />
        <Route path="/information" element={<InformationPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
