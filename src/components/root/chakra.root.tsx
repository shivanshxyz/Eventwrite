import React from "react"
import NextProgress from "nextjs-progressbar"

import { ChakraProvider } from "@chakra-ui/react"

import theme from "../../styles/theme.chakra"

interface ChakraProviderProps {
  Component: any
  pageProps: any
  children?: React.ReactNode
}

const Chakra = ({ Component, pageProps }: ChakraProviderProps) => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <NextProgress color="#6451FB" />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default Chakra
