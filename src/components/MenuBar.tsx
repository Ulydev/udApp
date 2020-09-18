import React, { useEffect } from "react"
import { useStoreActions, useStoreState } from "../state/hooks"

import { AiFillCheckCircle, AiFillEdit, AiFillInfoCircle, AiFillPlusCircle } from "react-icons/ai"

import classnames from "classnames"

const MenuBar = () => {
    const editing = useStoreState(store => store.editing)
    const setEditing = useStoreActions(store => store.setEditing)

    const addItem = useStoreActions(store => store.addItem)

    const showModal = useStoreActions(store => store.modal.show)
    const showInfoModal = () => {
        showModal({
            title: null!,
            children: <div className="text-gray-700">
                <p>
                    Welcome! This simple app lets you organise <a href="https://uniswap.vision/" target="_blank" rel="noopener noreferrer" className="text-blue-500">Uniswap Vision</a> views to display multiple tickers at the same time.
                </p>
                <p className="mt-2">
                    To edit your dashboard, click the "Edit" button, then enter a ticker name in one of the pre-generated boxes (e.g. "UNIUSDC"). Click on the "Finish" button in the bottom right corner to save your dashboard.
                </p>
                <p className="mt-2">
                    You can move items by dragging them, resize them, or remove them by clicking on the "X" button. To add items, click the "Add" button in the menu bar. New items pop up at the bottom center of the screen, so make sure you make some room for them before adding.
                </p>

                <p className="mt-8 text-center">
                Made by <a href="https://uly.dev" target="_blank" rel="noopener noreferrer" className="text-blue-500">ulydev</a> (<a href="https://github.com/ulydev/unidash" target="_blank" rel="noopener noreferrer" className="text-blue-500">repo</a>). Enjoying it? Buy me a coffee at<br/>
                    <span className="font-bold text-gray-900">0xffd91D21aada737a54902E5C09f4af5A8E52252D</span>
                </p>
            </div>
        })
    }

    const firstLaunch = useStoreState(store => store.firstLaunch)
    const launch = useStoreActions(store => store.launch)
    useEffect(() => {
        if (firstLaunch) {
            showInfoModal()
            launch()
        }
    }, [firstLaunch]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={classnames(
            "absolute right-0 bottom-0 mr-2 mb-2",
            "z-10",
            "max-w-xs",
            "border bg-white rounded-full",
            "flex flex-col-reverse items-center justify-center",
            "text-blue-500 text-2xl"
        )}>
            <button className="p-2" onClick={() => setEditing(!editing)}>
                { editing ? <AiFillCheckCircle className="text-green-500" /> : <AiFillEdit /> }
            </button>
            { editing ? <>
                <button className="p-2" onClick={() => addItem()}>
                    <AiFillPlusCircle />
                </button>
                <button className="p-2" onClick={() => showInfoModal()}>
                    <AiFillInfoCircle className="text-gray-500" />
                </button>
            </> : null }
        </div>
    )
}

export default MenuBar