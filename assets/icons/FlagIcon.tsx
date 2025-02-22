import React from 'react'

import { CustomIconProps } from '../../interfaces/general';

export const FlagIcon = ({ width = 32, height = 32, color = "#CECDD5", colorBackground = "white", fillOpacity = 0.1, ...props }: CustomIconProps) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" rx="16" fill={colorBackground} fillOpacity={fillOpacity}/>
<path d="M10.75 19V23.5H9.25V9.25H16.2865C16.4257 9.25007 16.5622 9.28891 16.6806 9.36216C16.7991 9.43542 16.8948 9.54019 16.957 9.66475L17.5 10.75H22C22.1989 10.75 22.3897 10.829 22.5303 10.9697C22.671 11.1103 22.75 11.3011 22.75 11.5V19.75C22.75 19.9489 22.671 20.1397 22.5303 20.2803C22.3897 20.421 22.1989 20.5 22 20.5H17.2135C17.0743 20.4999 16.9378 20.4611 16.8194 20.3878C16.7009 20.3146 16.6052 20.2098 16.543 20.0853L16 19H10.75ZM10.75 10.75V17.5H16.927L17.677 19H21.25V12.25H16.573L15.823 10.75H10.75Z" fill={color}/>
</svg>
  )
}
