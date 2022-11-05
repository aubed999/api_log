import React from "react";
import './App.css';
import Home from './pages/home.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from "./components/Layout";
import DataGrid from "./components/DataGrid"
import FastTable from "./components/FastTable"
import FullTable from "./components/FullTable"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Box } from "@mui/material";



export default function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<FastTable/>} />  
              <Route path=":id" element={<FullTable/>}/>
            <Route/>
            <Route path="/update" element={<Home/>} />  
          </Routes>
        </Layout>
      </Router>
  );
}