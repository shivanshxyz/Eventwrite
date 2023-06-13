import { useState } from "react"
import { HiOutlineChevronRight as ChevronRight } from "react-icons/hi"
import { useRecoilValue } from "recoil"

import { Box, Button, Flex, Text } from "@chakra-ui/react"

import { formDetails } from "../../../lib/recoil/atoms"
import CustomQuestions from "../../misc/custom-questions"
import RequiredQues from "../../misc/required-questions"

interface Props {
  onSubmit: (data: Question[]) => void
  onSub: (a: any) => void
}

const Step5 = ({ onSubmit, onSub }: Props) => {
  const formData = useRecoilValue(formDetails)

  const [questions, setQuestions] = useState<Question[]>(formData?.customQues)
  const [quesdropdown, setQuesdropdown] = useState<any[]>([])

  return (
    <Box color="brand.black">
      <Text align="center" color="brand.black400" fontSize="4xl" fontWeight="semibold" mt="4">
        Customize Register Form
      </Text>

      <Text align="center" color="gray.500" fontSize="lg">
        These questions will be asked to guests when they register for the event.
      </Text>

      <Box w="full" px="64" display="flex" justifyContent="center" my="10">
        <Box
          py="6"
          w="full"
          border="dashed 1px"
          borderColor="gray.300"
          rounded="lg"
          px="8"
          gap="6"
          display="flex"
          flexDir="column"
        >
          <RequiredQues />
          <Box w="full" h="1px" bg="gray.300" m="auto" />
          <CustomQuestions
            questions={questions}
            setQuestions={setQuestions}
            dropDownQuestion={quesdropdown}
            setdropDownQuestion={setQuesdropdown}
          />
        </Box>
      </Box>
      <Flex justifyContent="center" alignItems="center" alignContent="center" mt="10" mb="20">
        <Button
          onClick={() => {
            onSubmit(questions)
            onSub(quesdropdown)
          }}
          size="lg"
          rounded="full"
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
          Review Details
        </Button>
      </Flex>
    </Box>
  )
}

export default Step5
