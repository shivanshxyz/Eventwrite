import { FaCheck } from "react-icons/fa"

import { Box, Flex, Image, Text, Link } from "@chakra-ui/react"

interface CreateEventCTAProps {
  step: number
  setStep: Action<number>
}

const CreateEventCTA = ({ step, setStep }: CreateEventCTAProps) => {
  const steps = [1, 2, 3, 4, 5]

  return (
    <>
      <Box
        backgroundColor={`#4158D0`}
        backgroundImage={`linear-gradient( 64.3deg,  rgba(254,122,152,0.81) 17.7%, rgba(255,206,134,1) 64.7%, rgba(172,253,163,0.64) 112.1% )`}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        position="relative"
        overflow="hidden"
        overflowX="hidden"
        h="60"
      >
        <Link href="/">
          <Image
            src="/logo3.png"
            alt="Eventwrite"
            paddingLeft="md"
            marginX="auto"
            cursor="pointer"
            mx="5"
            my="3"
          />
        </Link>
        <Box textAlign="center" color="white" pb="10" mt="6" mb="6" zIndex={2} position="relative">
          <Flex justify="center" ml="12" mt={16}>
            <Text
              textAlign="center"
              fontFamily="azonix"
              fontSize={{ base: "4xl", lg: "4xl", xl: "5xl" }}
            >
              CREATE EVENT
            </Text>
            <Image
              w={{ base: "6", lg: "8" }}
              ml="1"
              mt="-16"
              src="/image/sparkle_gradient.svg"
              alt="element"
            />
          </Flex>
        </Box>
      </Box>
      <Flex justify="center" w="full" position="absolute" zIndex={0}>
        <Box
          w="fit-content"
          bg="white"
          rounded="full"
          transform="translateY(-28px)"
          boxShadow="0px 18px 91px rgba(0, 0, 0, 0.07)"
          border="1px"
          borderColor="blackAlpha.200"
          p="2"
        >
          <Flex gridGap="4">
            {steps.map((data, key) => (
              <Flex
                w="10"
                h="10"
                key={key}
                cursor="pointer"
                _hover={{
                  transform: step > data - 1 ? "scale(1.05)" : "",
                }}
                onClick={() => {
                  if (step > data - 1) {
                    setStep(key)
                  }
                }}
                bg={step === data - 1 ? "brand.purple" : step > data - 1 ? "brand.green" : "white"}
                rounded="full"
                justify="center"
                align="center"
                border="2px"
                fontSize="xl"
                fontWeight="medium"
                borderColor="blackAlpha.300"
                color={step >= data - 1 ? "white" : "blackAlpha.300"}
              >
                {step > data - 1 ? <FaCheck /> : `${data}`}
              </Flex>
            ))}
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default CreateEventCTA
