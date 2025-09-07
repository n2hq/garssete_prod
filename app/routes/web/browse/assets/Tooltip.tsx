import { Link } from '@remix-run/react'
import React from 'react'

export interface TooltipProp {
    href?: string
    tooltip: string
    children: React.ReactNode
}

const Tooltip = ({ tooltip, children }: TooltipProp) => {
    return (
        <div className={`block`}>
            <a href={'#'} className={`tooltip z-[20000] relative  `} data-tooltip={tooltip}>
                {children}
                <style>
                    {`
                    .tooltip{
                        position:relative;
                        display: inline-block;
                        cursor: pointer;
                        text-decoration: underline;
                    }

                    .tooltip::after{
                        content:attr(data-tooltip);
                        position: absolute;
                        bottom: 125%;
                        left: 50%;
                        transform: translateX(-20px);
                        background-color: blue;
                        color: #fff;
                        padding: 6px 8px;
                        border-radius: 4px;
                        white-space: normal;
                        max-width: 250px; 
                        min-width: 200px; 
                        word-wrap: break-word;
                        opacity: 0;
                        pointer-events: none;
                        transition: opacity 0.2s ease-in-out;
                        font-size: 11px;
                        z-index: 999;
                        line-height:1.4em;
                    }

                    .tooltip:hover::after{
                        opacity: 1;
                    }
                    `}
                </style>
            </a>
        </div>
    )
}

export default Tooltip
