import React from 'react'

import { CustomIconProps } from '../../interfaces/general';

export const StartIcon = ({ width = 32, height = 32, color = "#CECDD5", colorBackground = "white", fillOpacity = 0.1, ...props }: CustomIconProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect width="32" height="32" rx="16" fill={colorBackground} fillOpacity={fillOpacity} />
            <path d="M16 5.21875L19.9619 11.0153L26.6997 12.9925L22.4106 18.5519L22.6122 25.57L16 23.2094L9.38779 25.57L9.58936 18.5519L5.30029 12.9925L12.0381 11.0153L16 5.21875ZM16 8.54125L13.2081 12.6269L8.45967 14.0191L11.4831 17.9359L11.3397 22.8813L16 21.2181L20.6594 22.8813L20.5169 17.9359L23.5394 14.0191L18.7919 12.6269L16 8.54125ZM14.125 16C14.125 16.4973 14.3225 16.9742 14.6742 17.3258C15.0258 17.6775 15.5027 17.875 16 17.875C16.4973 17.875 16.9742 17.6775 17.3258 17.3258C17.6774 16.9742 17.875 16.4973 17.875 16H19.75C19.75 16.9946 19.3549 17.9484 18.6516 18.6517C17.9484 19.3549 16.9945 19.75 16 19.75C15.0054 19.75 14.0516 19.3549 13.3483 18.6517C12.6451 17.9484 12.25 16.9946 12.25 16H14.125Z" fill={color} />
        </svg>
    )
}
