import React from "react"

import { Responsive, WidthProvider } from "react-grid-layout"
import { FiX } from "react-icons/fi"
import { useStoreActions, useStoreState } from "../state/hooks"
import PairFrame from "./PairFrame"

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const GridView = () => {

    const editing = useStoreState(store => store.editing)

    const layout = useStoreState(store => store.layout)
    const setLayout = useStoreActions(store => store.setLayout)
    
    const setCols = useStoreActions(store => store.setCols)

    const pairNames = useStoreState(store => store.pairNames)
    const setPairName = useStoreActions(store => store.setPairName)

    const removeItem = (i: string) => {
        const newLayout = [...layout].filter(el => el.i !== i)
        setLayout(newLayout)
    }

    const GridElement = (el: ReactGridLayout.Layout) => (
        <div
            key={el.i} data-grid={el}
            className="border relative">
            { !editing ? (
                <PairFrame name={pairNames[el.i]} />
            ) : (
                <div className="flex w-full h-full items-center justify-center p-2">
                    <input
                        type="text"
                        className="w-full max-w-xs border p-2"
                        placeholder="Ticker"
                        value={pairNames[el.i] || ""} onChange={({ target: { value } }) => setPairName({ i: el.i, name: value })}/>
                </div>
            ) }
            { editing ? <>
                <button
                    className="absolute top-0 right-0 mr-1 mt-1 cursor-pointer"
                    onClick={() => removeItem(el.i)}>
                    <FiX />
                </button>
            </> : null }
        </div>
    )

    return (
        <ResponsiveReactGridLayout
            onLayoutChange={setLayout}
            margin={[0, 0]}
            rowHeight={window.innerHeight / 4}
            maxRows={4}
            verticalCompact={true}
            isBounded={true}
            isResizable={editing}
            onBreakpointChange={(breakpoint, cols) => setCols(cols)}
        >
            {layout.map(GridElement)}
        </ResponsiveReactGridLayout>
    )
}

export default GridView