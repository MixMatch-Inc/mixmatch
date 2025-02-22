import React from 'react'

import { CustomIconProps } from '../../interfaces/general';

export const SettingsIcon = ({ width = 24, height = 24, color = "#878698", ...props }: CustomIconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M19.2 16.5H21V18.3H3V16.5H4.8V10.2C4.8 8.29044 5.55857 6.45909 6.90883 5.10883C8.25909 3.75857 10.0904 3 12 3C13.9096 3 15.7409 3.75857 17.0912 5.10883C18.4414 6.45909 19.2 8.29044 19.2 10.2V16.5ZM17.4 16.5V10.2C17.4 8.76783 16.8311 7.39432 15.8184 6.38162C14.8057 5.36893 13.4322 4.8 12 4.8C10.5678 4.8 9.19432 5.36893 8.18162 6.38162C7.16893 7.39432 6.6 8.76783 6.6 10.2V16.5H17.4ZM9.3 20.1H14.7V21.9H9.3V20.1Z" fill={color} />
          </svg>
  )
}
