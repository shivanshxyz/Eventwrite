import { Flex, Text, Image } from "@chakra-ui/react"

const BaseHero = () => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mx="auto" my="20" w="90%" minH="75vh" flexWrap={"wrap"}>
        <Flex flexDirection={"column"} justifyContent="center" w={{base: "100%", lg: "50%"}}>
          <Text my="auto" fontSize={"10rem"} textDecoration="underline" fontWeight={200}>
            Hello.
          </Text>
          <Text my="auto" fontSize={"2rem"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad commodi fuga ea fugiat
            inventore mollitia perferendis cum! Provident error, eius asperiores iste pariatur,
            maxime explicabo dolores et, deserunt atque animi.
          </Text>
        </Flex>
        <Image src="./image/floatCube.gif" flexGrow={"1"} w={{base: "100%", lg: "50%"}}></Image>
      </Flex>
    </>
  )
}

export default BaseHero
