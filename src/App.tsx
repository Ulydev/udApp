import React from 'react';
import './App.css';
import GridView from './components/GridView';

import { StoreProvider } from "easy-peasy"
import store from "./state/store"
import MenuBar from './components/MenuBar';
import GlobalModal from './components/GlobalModal';

function App() {
    return (
        <StoreProvider store={store}>
            <div className="relative w-full h-full overflow-x-hidden overflow-y-hidden">
                <GridView />
                <MenuBar />
                <GlobalModal />
            </div>
        </StoreProvider>
    );
}

export default App;
