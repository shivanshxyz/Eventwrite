import React from "react"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import Navbar from "../components/layout/navbar"
import Features from "../components/layout/features"
import BaseHero from "../components/layout/hero"
import Events from "../components/layout/events"
import Footer from "../components/layout/footer"

type HomePageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const HomePage: NextPage<HomePageProps> = () => {
  return <div className="center h-screen w-screen">
    <Navbar />
    <BaseHero />
    <Features />
    <Events />
    <Footer />
  </div>
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default HomePage
