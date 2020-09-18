import classnames from "classnames"
import React from "react"

import { jumboClass } from "../classes"

const Container = ({ padding = true, full = false, className = "", ...props }) => (
    <div className={classnames(
        "flex flex-col justify-center",
        "rounded-2xl",
        full ? "w-full" : jumboClass,
        "bg-white",
        padding && "p-8",
        "shadow-lg",
        className
    )} {...props} />
)

export default Container