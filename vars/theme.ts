import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const theme = extendTheme({
    fonts: {
        heading: "'Roboto', sans-serif",
        body: "'Roboto', sans-serif"
    }
})

export default theme