import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Active from './static/fonts/Active/active/webfonts/active.ttf';
import Merriweather from './static/fonts/Merriweather/Merriweather-Regular.ttf';


import "./index.css";
import "./index.js";
import './App.css';

import NavBar from "./components/NavBar";
import Logo from "./components/Logo";

import Shop from './pages/Shop';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Newsletter from './pages/Newsletter';
import ItemDetail from './pages/ItemDetail';


const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: 'Merriweather',
    body: {
      fontSize: 20
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [Active],
        'color': 'white',
      },
      styleOverrides: `
        @font-face {
          font-family: 'Merriweather';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Adventurer'), url(${Merriweather}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        `,
    },
  },
});



function App() {
  const headerLinks = [
    {"name": "about",  "nav": "crypted-hoard", "href": "/about"},
    {"name": "shop", "nav": "ancient-scroll", "href": "/shop"},
    {"name": "gallery", "nav": "stakepool", "href": "/gallery"},
    {"name": "contact", "nav": "about", "href": "/contact"},
  ];

  const footerLinks = [
    {"name": "contact",  "nav": "crypted-hoard", "spacer": true, "href": "/contact"},
    {"name": "faq", "nav": "ancient-scroll", "spacer": true, "href": "/faq"},
    {"name": "newsletter", "nav": "stakepool", "href": "/newsletter"},
  ];

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App-body" >
          <Logo/>
          <NavBar 
            scale={1.7}
            links={headerLinks}
          />
          <Box component="div" className="brush-hr" sx={{ width: '85%' }} />
          <Routes>
            <Route path="/" element={<About/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/shop/item" element={<ItemDetail/>}>
              <Route path=":productId" />
            </Route>
            <Route path="/gallery" element={<Gallery/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/newsletter" element={<Newsletter/>} />
          </Routes>
          <NavBar 
            scale={.85}
            links={footerLinks}
          />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
