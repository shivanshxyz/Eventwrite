import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import NextProgress from "nextjs-progressbar"
import { RecoilRoot } from "recoil"

import "../styles/globals.css"
import "mapbox-gl/dist/mapbox-gl.css"

const ChakraProvider = dynamic(() => import("../components/root/chakra.root"))

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <RecoilRoot>
        <ChakraProvider Component={Component} pageProps={pageProps}>
          <NextProgress color="#6451FB" />
        </ChakraProvider>
      </RecoilRoot>
    </>
  )
}

export default MyApp
