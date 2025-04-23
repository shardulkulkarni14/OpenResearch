import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import SubredditList from './components/SubredditList';
import PostList from './components/PostList';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff4500', // Reddit orange
    },
    secondary: {
      main: '#1a1a1b', // Reddit dark gray
    },
    background: {
      default: '#030303',
      paper: '#1a1a1b',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SubredditList />} />
          <Route path="/r/:subreddit" element={<PostList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 