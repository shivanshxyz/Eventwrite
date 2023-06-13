import { HiOutlineChevronRight as ChevronRight } from "react-icons/hi"

import { Box, Button, Flex, Text } from "@chakra-ui/react"

import EventCard from "../../atoms/card/event-card"

import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"

const SubmitStep = ({
  event,
  onSubmit,
  inTxn,
}: {
  event: Events
  onSubmit: GenericFunction
  inTxn: boolean
}) => {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <Box color="brand.black">
          <Text align="center" color="brand.black400" fontSize="4xl" fontWeight="semibold">
            Review the details
          </Text>

          <Flex
            w="full"
            px="20"
            mt="4"
            wrap={{ lg: "wrap", xl: "nowrap" }}
            gridGap="4"
            justify="center"
          >
            <Box>
              <Text textAlign="center" fontFamily="body" color="blackAlpha.600" mb="3">
                Event card
              </Text>
              <Box h="fit-content" w={{ base: "320px", xl: "360px" }}>
                <EventCard event={event} />
              </Box>
            </Box>
          </Flex>
          <Box textAlign="center" mt="10" mb="20">
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
                  _groupHover={{
                    transform: "translateX(4px)",
                  }}
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
              isLoading={inTxn}
            >
              Publish Event
            </Button>
          </Box>
        </Box>
      </form>
    </>
  )
}

export default SubmitStep
