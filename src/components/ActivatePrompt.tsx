import { useWeb3React } from "@web3-react/core"
import React from "react"
import { injected } from "../web3/connectors"
import Container from "./Container"

const ActivatePrompt = () => {
    const { activate } = useWeb3React()
    return (
        <Container>
            <div className="flex flex-col space-y-4">
                <span className="text-gray-700 font-bold text-lg text-center">Please connect your wallet before proceeding.</span>
                <button
                    className="flex-1 p-2 px-4 border hover:text-white hover:bg-blue-500 rounded-full"
                    onClick={() => activate(injected)}>
                    Connect with Metamask
                </button>
            </div>
        </Container>
    )
}

export default ActivatePrompt