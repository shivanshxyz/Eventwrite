import { Flex, Text } from "@chakra-ui/react"

const Footer = () => {
  return (
    <>
      <Flex 
      w="100vw"
      background="linear-gradient( 64.3deg,  rgba(254,122,152,0.81) 17.7%, rgba(255,206,134,1) 64.7%, rgba(172,253,163,0.64) 112.1% )"
      p="5"
      justifyContent="center"
      >
        <Text fontSize={"1rem"}>
            Made with ❤️ at MLH Hack The Plan.
        </Text>
      </Flex>
    </>
  )
}

export default Footer
