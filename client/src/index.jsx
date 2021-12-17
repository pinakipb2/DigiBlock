/* eslint comma-dangle: ["error", "never"] */
import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { store, persistor } from './redux/store';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer
            position="bottom-right"
            theme="colored"
            limit={7}
            autoClose={6000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </PersistGate>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);
