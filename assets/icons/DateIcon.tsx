import React from 'react'

import { CustomIconProps } from '../../interfaces/general';

export const DateIcon = ({ width = 32, height = 32, color = "#CECDD5", colorBackground = "white", fillOpacity = 0.1, ...props }: CustomIconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
<rect width="32" height="32" rx="16" fill={colorBackground} fillOpacity={fillOpacity}/>
<path d="M19.75 9.25H22.75C22.9489 9.25 23.1397 9.32902 23.2803 9.46967C23.421 9.61032 23.5 9.80109 23.5 10V22C23.5 22.1989 23.421 22.3897 23.2803 22.5303C23.1397 22.671 22.9489 22.75 22.75 22.75H9.25C9.05109 22.75 8.86032 22.671 8.71967 22.5303C8.57902 22.3897 8.5 22.1989 8.5 22V10C8.5 9.80109 8.57902 9.61032 8.71967 9.46967C8.86032 9.32902 9.05109 9.25 9.25 9.25H12.25V7.75H13.75V9.25H18.25V7.75H19.75V9.25ZM18.25 10.75H13.75V12.25H12.25V10.75H10V13.75H22V10.75H19.75V12.25H18.25V10.75ZM22 15.25H10V21.25H22V15.25Z" fill={color}/>
</svg>
  )
}
