import React from 'react';
import './App.css';

import { StoreProvider } from "easy-peasy"
import store from "./state/store"

import { useEagerConnect } from './hooks/useEagerConnect';
import { useInactiveListener } from './hooks/useInactiveListener';
import { useWeb3React } from '@web3-react/core';
import ActivatePrompt from './components/ActivatePrompt';
import GlobalModal from './components/GlobalModal';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from './components/Home'

const ActiveApp = () => <>
    <h1 className="text-2xl text-white font-bold mb-4">udApp starter</h1>
    <Router>
        <Route path="/" exact component={Home} />
    </Router>
    <GlobalModal />
</>

function App() {

    const { active } = useWeb3React()
    const triedEager = useEagerConnect()
    useInactiveListener(!triedEager)

    return (
        <StoreProvider store={store}>
            <div className="relative w-full min-h-full overflow-x-hidden overflow-y-auto flex flex-col items-center justify-center py-4 bg-black">
                { active ? (
                    <ActiveApp />
                ) : (
                    <ActivatePrompt />
                ) }
            </div>
        </StoreProvider>
    );
}

export default App;
