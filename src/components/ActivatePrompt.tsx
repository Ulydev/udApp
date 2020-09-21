import { useWeb3React } from "@web3-react/core"
import React from "react"
import { injected } from "../web3/connectors"
import Container from "./Container"

const ActivatePrompt = () => {
    const { activate } = useWeb3React()
    return (
        <Container>
            <div className="flex flex-col space-y-4 items-center">
                <img src="/logo192.png" className="w-24 h-24 rounded-full" />
                <span className="text-black-700 font-bold text-lg text-center">Please connect your wallet before proceeding.</span>
                <button
                    className="flex-1 p-2 px-4 border hover:text-black hover:bg-white bg-black text-white font-bold rounded-full w-full"
                    onClick={() => activate(injected)}>
                    Connect with Metamask
                </button>
            </div>
        </Container>
    )
}

export default ActivatePrompt