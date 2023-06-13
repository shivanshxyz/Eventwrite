import { Flex, Box, Text, Input } from "@chakra-ui/react"

import EventCard from "../../atoms/card/event-card"

export default function Events() {
  return (
    <>
      <Box w={"90%"} mx="auto">
        <Flex flexDirection={"column"} m="20" alignItems={"center"}>
          <Text fontSize={"8rem"} fontWeight="100">
            Events
          </Text>
          <Input w="60%" placeholder="Search Events"></Input>
          <Flex gap={20} flexWrap="wrap" my="20">
            <Text>*Place the events in this flex*</Text>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
