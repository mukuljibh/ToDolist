import React from "react";
import App from "./components/dashboard/App";
import { createRoot } from 'react-dom/client';
import store from "./redux/store";
import { Provider } from 'react-redux'
// router are here to link the react application 
const root = createRoot(document.getElementById('root'))

root.render
    (
        <Provider store={store}>
            <App />
        </Provider>
    );
