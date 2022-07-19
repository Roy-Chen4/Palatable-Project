/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from "@mui/material/IconButton";


const ScrollTopButton = (showBelow) => {

    const handleClick = () => {
        window[`scrollTo`]({top: 0, behavior: `smooth`})
    }

    const [show, setShow] = useState(showBelow ? false : true)

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow (true)
        } else {
            if (show) setShow (false)
        }
    }

    useEffect (() => {
        if (showBelow) {
            window.addEventListener(`scroll`, handleScroll)
            return () => window.removeEventListener(`scroll`, handleScroll)
        }
    })

    return (
        <div>
                <IconButton 
                onClick={handleClick}
                sx={{"&&":{zIndex: "2", position: "fixed", bottom: "2vh", right: "2%", color: "#df7b84"}}}
                >
                    <ExpandLessIcon/>
                </IconButton>
        </div>
    )

}

export default ScrollTopButton