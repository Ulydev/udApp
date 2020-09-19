import { Contract } from "ethers"
import React, { FunctionComponent, useMemo, useRef, useState } from "react"
import { FiMinus, FiPlus } from "react-icons/fi"
import Container from "./Container"
import Divider from "./Divider"

import { debounce } from "lodash"
import { useWeb3React } from "@web3-react/core"

import ERC20Abi from "../web3/ERC20.json"

const Method: FunctionComponent<{
    contract?: Contract
    onRemove: () => void
}> = ({ contract, onRemove }) => {

    const [name, setName] = useState("")
    const [args, setArgs] = useState("")

    const [resultMessage, setResultMessage] = useState<{ text: string, color: string }>({ text: "", color: "" })

    const call = async () => {
        setResultMessage({ text: "Executing method...", color: "text-blue-500" })
        try {
            const parsedArgs = args.split(",").map(v => v.trim())
            console.log(parsedArgs)
            const isEmpty = parsedArgs.length === 0 || ((parsedArgs.length === 1) && parsedArgs[0] === "")
            const result = await contract![name](...(isEmpty ? [] : parsedArgs))
            setResultMessage({ text: result.toString(), color: "text-green-500" })
        } catch (e) {
            let message = e.message || e.toString()
            if (["contract[name] is not a function", "Cannot read property 'apply' of undefined"].includes(message))
                message = "Function doesn't exist in provided ABI"
            else if (message.includes("Cannot read property"))
                message = "Contract hasn't been created or is invalid"
            setResultMessage({ text: message, color: "text-red-500" })
        }
    }

    return (
        <div className="flex flex-col flex-1 space-y-1">
            <div className="flex flex-row flex-1 space-x-2">
                <div className="flex flex-col space-y-1 text-gray-700">
                    <span className="ml-2">Name</span>
                    <input
                        className="p-2 px-4 border rounded-full min-w-0"
                        type="text" placeholder="Name"
                        value={name} onChange={({ target: { value }}) => setName(value)} />
                </div>
                <div className="flex-1 flex flex-col space-y-1 text-gray-700">
                    <span className="ml-2">Arguments</span>
                    <input
                        className="p-2 px-4 border rounded-full min-w-0"
                        type="text" placeholder={`Comma-separated`}
                        value={args} onChange={({ target: { value }}) => setArgs(value)} />
                </div>
                <div className="self-end flex flex-row items-center space-x-2">
                    <button
                        className="self-end p-2 px-4 border rounded-full hover:bg-blue-500 hover:text-white"
                        onClick={call}>Call</button>
                    <button
                        className="rounded-full p-1 bg-red-500 hover:bg-red-700 text-white"
                        onClick={onRemove}><FiMinus /></button>
                </div>
            </div>
            { resultMessage.text !== "" ? (
                <span className={resultMessage.color}>{ resultMessage.text }</span>
            ) : null }
        </div>
    )
}

const ContractEditor = () => {

    const { account, library } = useWeb3React()

    // Contract
    const [address, setAddress] = useState("")
    const [abi, setAbi] = useState("")
    const shortAbi = useMemo(() => {
        return (abi.length > 32) ? abi.substr(0, 32-3) + '...' : abi
    }, [abi])

    const loadERC20 = () => {
        setContractMessage({ text: "Creating contract...", color: "text-blue-500" })
        const jsonAbi = JSON.stringify(ERC20Abi)
        setAbi(jsonAbi)
        debouncedCreateContract({ address: address, abi: jsonAbi })
    }

    const [contract, setContract] = useState<Contract>()
    const [contractMessage, setContractMessage] = useState<{ text: string, color: string }>({ text: "", color: "" })

    const debouncedCreateContract = useRef(debounce(({ address, abi }) => createContract({ address, abi }), 1000)).current;
    const createContract = ({ address, abi }: { address: string, abi: string }) => {
        try {
            const signer = library.getSigner(account).connectUnchecked()
            const buildOrAbi = JSON.parse(abi)
            const contract = new Contract(address, buildOrAbi.abi || buildOrAbi, signer)
            setContract(contract)
            setContractMessage({ text: "Created contract successfully", color: "text-green-500" })
        } catch (e) {
            setContractMessage({ text: e.toString(), color: "text-red-500" })
        }
    }

    // Methods
    const [counter, setCounter] = useState(0)
    const [methodKeys, setMethodKeys] = useState<string[]>([])

    const addMethod = () => {
        setMethodKeys([...methodKeys, counter.toString()])
        setCounter(counter + 1)
    }
    const removeMethod = (key: string) => setMethodKeys([...methodKeys].filter(k => k !== key))

    return (
        <Container>
            <div className="flex flex-col space-y-2">
                <h1 className="text-2xl font-bold">Contract</h1>

                <div className="flex flex-col space-y-1 text-gray-700">
                    <span className="ml-2">Address</span>
                    <input
                        className="p-2 px-4 border rounded-full"
                        type="text" placeholder="0x0000....0000"
                        value={address} onChange={({ target: { value }}) => {
                            setContractMessage({ text: "Creating contract...", color: "text-blue-500" })
                            setAddress(value)
                            debouncedCreateContract({ address: value, abi: abi })
                        }} />
                </div>

                <div className="flex flex-col space-y-1 text-gray-700">
                    <span className="ml-2">ABI</span>
                    <div className="flex w-full flex-row space-x-2">
                        <input
                            className="flex-1 p-2 px-4 border rounded-full"
                            type="text" placeholder="Upload an ABI..."
                            disabled
                            value={shortAbi} />
                        <label
                            className="border p-2 rounded-full hover:bg-blue-500 hover:text-white cursor-pointer px-4"
                            htmlFor="abi">Upload file</label>
                        <input
                            className="hidden"
                            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                            type="file" id="abi" name="abi" accept=".json" onChange={({ target: { files }}) => {
                                const file = (files || [])[0]
                                if (file) {
                                    const reader = new FileReader()
                                    reader.onload = () => {
                                        setContractMessage({ text: "Creating contract...", color: "text-blue-500" })
                                        const uploadedAbi = reader.result!.toString()
                                        setAbi(uploadedAbi)
                                        debouncedCreateContract({ address: address, abi: uploadedAbi })
                                        ;(document.getElementById("abi")! as any).value = ""
                                    }
                                    reader.readAsText(file)
                                }
                            }} multiple={false} />
                        <button
                            className="border p-2 rounded-full hover:bg-blue-500 hover:text-white cursor-pointer px-4"
                            onClick={loadERC20}>Load ERC20</button>
                    </div>
                </div>

                { contractMessage.text !== "" ? (
                    <span className={contractMessage.color}>{ contractMessage.text }</span>
                ) : null }
            </div>

            <Divider direction="horizontal" />


            <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-2xl font-bold">Methods</h1>
                    <button
                        className="rounded-full p-1 bg-green-500 hover:bg-green-700 text-white"
                        onClick={addMethod}><FiPlus /></button>
                </div>

                { methodKeys.map(k =>
                    <Method
                        key={k}
                        contract={contract}
                        onRemove={() => removeMethod(k)} />
                )}
            </div>

        </Container>
    )
}

export default ContractEditor