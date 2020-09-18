import React, { FunctionComponent } from "react"

const PairFrame: FunctionComponent<{ name?: string }> = ({ name }) => (
    <iframe
        title={name}
        src={`https://uniswap.vision/?ticker=UniswapV2:${name}&interval=1`}
        className="w-full h-full"
        />
)

export default PairFrame