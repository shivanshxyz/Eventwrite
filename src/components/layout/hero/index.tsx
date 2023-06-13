import { Flex, Text, Image } from "@chakra-ui/react"

const BaseHero = () => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mx="auto" my="20" w="90%" minH="75vh" flexWrap={"wrap"}>
        <Flex flexDirection={"column"} justifyContent="center" w={{base: "100%", lg: "50%"}}>
          <Text my="auto" fontSize={"7rem"} textDecoration="underline" fontWeight={200}>
            EVENTWRITE
          </Text>
          <Text my="auto" fontSize={"2rem"}>
          Eventwrite is a decentralized platform for managing events that makes it simple for event planners to establish, administer, and advertise events while simultaneously discouraging the selling of unauthorized tickets and supporting environmentally friendly and effective ticketing.
          </Text>
        </Flex>
        <Image src="./image/floatCube.gif" flexGrow={"1"} w={{base: "100%", lg: "50%"}}></Image>
      </Flex>
    </>
  )
}

export default BaseHero
