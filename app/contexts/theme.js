import React from 'react'

const Theme = React.createContext('light')

export const ThemeConsumer = Theme.Consumer
export const ThemeProvider = Theme.Provider