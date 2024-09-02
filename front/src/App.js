import React from "react";
import { Route, Routes } from "react-router-dom";
import AssetList from "./components/Asset/AssetList";
import AssetCreate from "./components/Asset/AssetCreate";
import AssetDetail from "./components/Asset/AssetDetail";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<AssetList/>}/>
            <Route path="/assets/new" element={<AssetCreate />} />
            <Route path="/assets/:id" element={<AssetDetail />}/>
        </Routes>
    </div>
  );
};

export default App;
