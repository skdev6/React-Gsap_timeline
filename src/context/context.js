import { createContext } from 'react'

export default createContext({
	windowWidth: window.innerWidth,
	windowHeight: window.innerHeight
})
