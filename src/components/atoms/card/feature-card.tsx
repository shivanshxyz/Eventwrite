import { Flex, Box, Image, Text, AspectRatio } from "@chakra-ui/react"

import * as NextImage from "next/image"

export default function FeatureCard({
  heading,
  content,
  image,
}: {
  heading: string
  content: string
  image: string
}) {
  return (
    <>
      <Flex
        rounded="lg"
        direction="column"
        _hover={{
          transform: "translateY(-10px) scale(1.05)",
          boxShadow: "0px -4px 50px rgba(0, 0, 0, 0.25)",
        }}
        transitionDuration="200ms"
        boxShadow="0px -1px 10px rgba(0, 0, 0, 0.10)"
        textAlign={"center"}
        bgColor="#f8252570"
        maxW={"500px"}
        m="10"
      >
        <Image src={image} roundedTopEnd="lg" roundedTop="lg" mb="5" />
        <Text fontSize={"2rem"} mb="5">
          {heading}
        </Text>
        <Text fontSize={"1rem"} mb="5" p="5">
          {content}
        </Text>
      </Flex>
    </>
  )
}
