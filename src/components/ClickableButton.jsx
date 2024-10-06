"use client"

import {FaDeleteLeft} from "react-icons/fa6";
import React from "react";

export default function ClickableButton({children, onClick}) {
    return (
        <span onClick={onClick}>
        <FaDeleteLeft />
            </span>
    )
}
