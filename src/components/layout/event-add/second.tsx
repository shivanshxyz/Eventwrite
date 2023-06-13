import { useState } from "react"
import dynamic from "next/dynamic"
import { HiOutlineChevronRight as ChevronRight } from "react-icons/hi"

import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Text } from "@chakra-ui/react"

import EventCard from "../../atoms/card/event-card"

interface Props {
  onSubmit: GenericFunction
  event: Events
}

const Step2 = ({ event, onSubmit }: Props) => {
  const [description, setDescription] = useState("")
  const [longDescription, setLongDescription] = useState("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({
          description: {
            short_desc: description,
            long_desc: longDescription,
          },
        })
      }}
    >
      <Box color="brand.black">
        <Text align="center" color="brand.black400" fontSize="4xl" fontWeight="semibold">
          Add some details
        </Text>

        <Flex justify="space-between" gridGap={14} mt="6" px="10" maxW="1200px" mx="auto">
          <Box fontFamily="body" w="full">
            <FormControl
              isRequired
              borderBottom="2px"
              borderBottomColor="gray.200"
              _focusWithin={{ borderBottomColor: "gray.300" }}
            >
              <FormLabel fontSize={{ lg: "md", xl: "lg" }} color="blackAlpha.700" my="0">
                Short Description
              </FormLabel>

              <Input
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                fontSize="sm"
                value={description}
                required
                px="0"
                _placeholder={{ color: "gray.300" }}
                placeholder="Short description of your event"
                bg="transparent"
                border="none"
                rounded="none"
                _hover={{}}
                _focus={{}}
                _active={{}}
              />
            </FormControl>

            <FormControl mt="8" _focusWithin={{ borderBottomColor: "gray.300" }}>
              <FormLabel fontSize={{ lg: "md", xl: "lg" }} color="blackAlpha.700" my="0" pb="4">
                Long Description
              </FormLabel>
              <Input
                placeholder="Long Description"
                onChange={(e) => {
                  setLongDescription(e.target.value)
                }}
                value={longDescription}
              />
            </FormControl>
          </Box>
          <Box h="auto" w="2px" my="20" bg="gray.100" />
          <Box>
            <Flex justify="center" mb="4">
              <Text
                style={{
                  background:
                    "-webkit-linear-gradient(360deg, #95E1FF 0%, #E7B0FF 51.58%, #FFD27B 111.28%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                textAlign="center"
                fontWeight="semibold"
                fontSize="2xl"
              >
                Live Preview
              </Text>
              <Image
                w={{ base: "4", lg: "4" }}
                ml="1"
                mt="-6"
                src="/image/sparkle_gradient.svg"
                alt="element"
              />
            </Flex>
            <Box minW={{ base: "320px", xl: "360px" }}>
              <EventCard
                previewOnly
                event={{
                  id: "",
                  childAddress: "",
                  title: event.title || "Untitled",
                  description: {
                    short_desc: description || "Event description goes here",
                    long_desc: longDescription,
                  },
                  image: {
                    image: "/image/gradient.png",
                    gallery: [],
                  },
                  date: event.date ? event.date : "1/1/2000",
                  eventHost: "",
                  owner: "",
                  type: event.category.event_type || "type",
                  category: {
                    category: [event.category?.category[0] || "category"],
                    event_type: event.category.event_type || "type",
                  },
                  buyers: [],
                  fee: Number(event.fee),
                  seats: event.seats,
                  tickets_available: event.seats,
                  tickets_sold: 0,
                }}
              />
            </Box>
          </Box>
        </Flex>
        <Flex justifyContent="center" alignItems="center" alignContent="center" mt="10" mb="20">
          <Button
            size="lg"
            rounded="full"
            type="submit"
            bg="brand.gradient"
            color="white"
            rightIcon={
              <Flex
                justify="center"
                alignItems="center"
                transitionDuration="200ms"
                _groupHover={{ transform: "translateX(4px)" }}
              >
                <ChevronRight />
              </Flex>
            }
            _hover={{}}
            _focus={{}}
            _active={{}}
            py="7"
            role="group"
            fontWeight="medium"
            px="8"
          >
            Next Step
          </Button>
        </Flex>
      </Box>
    </form>
  )
}

export default Step2
