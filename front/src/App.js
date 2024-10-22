import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AssetList from "./components/Asset/AssetList";
import AssetCreate from "./components/Asset/AssetCreate";
import AssetDetail from "./components/Asset/AssetDetail";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import UserList from "./components/User/UserList";
import UserCreate from "./components/User/UserCreate";
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/assets/" element={<PrivateRoute>
              <AssetList />
            </PrivateRoute>}/>
            <Route path="/assets/new" element={<AssetCreate />} />
            <Route path="/assets/:id" element={<AssetDetail />}/>
            <Route path="/users" element={<PrivateRoute roleRequired="admin">
              <UserList />
            </PrivateRoute>}/>
            <Route path="/users/new" element={<UserCreate />}/>
        </Routes>
    </div>
  );
};

export default App;
