import React from 'react';
import './App.css';

import { StoreProvider } from "easy-peasy"
import store from "./state/store"

import ContractEditor from './components/ContractEditor';
import { useEagerConnect } from './hooks/useEagerConnect';
import { useInactiveListener } from './hooks/useInactiveListener';
import { useWeb3React } from '@web3-react/core';
import ActivatePrompt from './components/ActivatePrompt';

function App() {

    const { active } = useWeb3React()
    const triedEager = useEagerConnect()
    useInactiveListener(!triedEager)

    return (
        <StoreProvider store={store}>
            <div className="relative w-full h-full overflow-x-hidden overflow-y-auto flex flex-col items-center py-4">
                <h1 className="text-2xl text-blue-500 font-bold mb-4">Contract Admin</h1>
                { active ? (
                    <ContractEditor />
                ) : (
                    <ActivatePrompt />
                ) }
            </div>
        </StoreProvider>
    );
}

export default App;
