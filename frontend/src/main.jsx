import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'  // Import BrowserRouter from react-router-dom
import './index.css'


import  ChatProvider  from './context/chatprovider.jsx'; // Import ChatProvider from context

// Wrap the App component with BrowserRouter to enable routing
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>,
);
