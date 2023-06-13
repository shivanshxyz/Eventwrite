import { BsFillPersonFill } from "react-icons/bs"

import { Badge, Box, Flex, Text } from "@chakra-ui/react"

const formData: formType = {
  preDefinedQues: [
    { value: "Name", isRequired: true, id: 1 },
    { value: "Email Address", isRequired: true, id: 2 },
    { value: "Wallet Address", isRequired: true, id: 3 },
  ],
  customQues: [],
}

const RequiredQues = () => {
  return (
    <Flex direction="column" gap="2" fontWeight="medium">
      <Flex fontSize="xl" fontWeight="medium" alignItems="center" gap="1">
        <BsFillPersonFill size={22} /> Identity
      </Flex>
      {formData?.preDefinedQues.map((ques) => (
        <Flex w="60%" justifyContent="space-between" ml="3" key={ques.id}>
          <Text textColor="gray.600">{ques.value}</Text>

          <Badge display="grid" placeItems="center" px="3" rounded="full" colorScheme="purple">
            Required
          </Badge>
        </Flex>
      ))}
    </Flex>
  )
}

export default RequiredQues
