import { Dispatch, SetStateAction, useState } from "react"
import { Reorder, useDragControls } from "framer-motion"
import { toast } from "react-hot-toast"
import { TbEdit } from "react-icons/tb"

import { Box, Button, Checkbox, Flex, Input, Select, Text } from "@chakra-ui/react"

import FormQuestion from "../general/question"

interface CustomQuestionsProps {
  questions: Question[]
  setQuestions: Action<Question[]>
  dropDownQuestion: any[]
  setdropDownQuestion: Action<any[]>
}

const CustomQuestions = ({
  questions,
  setQuestions,
  dropDownQuestion,
  setdropDownQuestion,
}: CustomQuestionsProps) => {
  const [questionType, setQuestionType] = useState<"drop-down" | "check-box">("drop-down")
  const [option, setOption] = useState<string>("")
  const [optionAll, setOptionAll] = useState<string[]>([])
  const [dropQuestion, setDropQuestion] = useState<DropDown<"drop-down" | "check-box">>({
    id: 0,
    question: "",
    type: "drop-down",
    requird: false,
  })
  const [values, setValues] = useState<Question>({
    value: "",
    isRequired: false,
    id: 0,
  })

  const controls = useDragControls()

  const addQues = (val: Question) => {
    const data = {
      ...val,
      id: questions.length + 1,
    }

    setQuestions([...questions, data])
    setValues({ value: "", isRequired: false, id: 0 })
  }

  const deleteQuestion = (q: Question) => {
    const newArr = questions.filter((ques) => {
      return ques !== q
    })
    setQuestions(newArr)
    toast.success("Question Deleted")
  }

  const addDropDown = (q: any, options: any) => {
    const data = {
      ...q,
      option: options,
      id: dropDownQuestion.length + 1,
    }
    setdropDownQuestion([...dropDownQuestion, data])
    setDropQuestion({
      id: 0,
      question: "",
      type: "drop-down",
      requird: false,
      options: [],
    })
    setOptionAll([])
  }

  const addCheckBox = (q: any) => {
    const data = {
      ...q,
      type: "check-box",
      id: dropDownQuestion.length + 1,
    }
    setdropDownQuestion([...dropDownQuestion, data])
    setDropQuestion({
      id: 0,
      question: "",
      type: "drop-down",
      requird: false,
    })
  }

  return (
    <Flex direction="column" gap="2" fontWeight="medium">
      <Flex fontSize="xl" fontWeight="medium" alignItems="center" gap="1">
        <TbEdit size={22} /> Custom Questions
      </Flex>

      {questions.length !== 0 ? (
        <Flex
          axis="y"
          values={questions}
          onReorder={setQuestions}
          direction="column"
          gap="3"
          px="6"
          mx="3"
          as={Reorder.Group}
          py="2"
        >
          {questions.map((q) => (
            <FormQuestion key={q.id} q={q} deleteQuestion={deleteQuestion} controls={controls} />
          ))}
        </Flex>
      ) : (
        dropDownQuestion.length === 0 && (
          <Text ml="3" fontWeight="regular" color="gray.600">
            No custom questions added.
          </Text>
        )
      )}

      {dropDownQuestion.length > 0 && (
        <Flex
          axis="y"
          values={dropDownQuestion}
          onReorder={setdropDownQuestion}
          direction="column"
          gap="3"
          px="6"
          mx="3"
          as={Reorder.Group}
          py="2"
        >
          {dropDownQuestion.map((q) => (
            <Input key={q.id} variant="filled" value={q.question} readOnly />
          ))}
        </Flex>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          addQues(values)
        }}
      >
        <Flex px="6" py="4" rounded="lg" mx="3" my="1" gap="3" alignItems="center">
          <Input
            placeholder="Example Question"
            value={values.value}
            onChange={(e) => setValues({ ...values, value: e.target.value })}
            isRequired
          />
          <Checkbox
            isChecked={values.isRequired}
            onChange={(e) => setValues({ ...values, isRequired: e.target.checked })}
          >
            Required
          </Checkbox>
          <Button h="8" rounded="full" px="6" colorScheme="green" fontWeight="500" type="submit">
            + Add
          </Button>
        </Flex>
      </form>

      <Select
        mx="9"
        w={"10rem"}
        onChange={(e) => setQuestionType(e.target.value as "drop-down" | "check-box")}
      >
        <option value={"drop-down"}>Dropdown</option>
        <option value={"check-box"}>Checkbox</option>
      </Select>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (questionType === "drop-down") {
            addDropDown(dropQuestion, optionAll)
          } else {
            addCheckBox(dropQuestion)
          }
        }}
      >
        <Flex px="6" py="4" rounded="lg" mx="3" my="1" gap="3" alignItems="center">
          {questionType === "drop-down" && (
            <>
              <Input
                placeholder="Example Question For Drop Down"
                onChange={(e) => {
                  setDropQuestion({
                    ...dropQuestion,
                    question: e.target.value,
                  })
                }}
              />
            </>
          )}

          {questionType === "check-box" && (
            <Input
              onChange={(e) => {
                setDropQuestion({
                  ...dropQuestion,
                  type: "check-box",
                  question: e.target.value,
                })
              }}
              placeholder="Example Question For Check Box"
            />
          )}
          <Checkbox
            isChecked={dropQuestion.requird}
            onChange={(e) => {
              setDropQuestion({
                ...dropQuestion,
                requird: e.target.checked,
              })
            }}
          >
            Required
          </Checkbox>
          <Button h="8" rounded="full" px="6" colorScheme="green" fontWeight="500" type="submit">
            + Add
          </Button>
        </Flex>
        {questionType === "drop-down" &&
          optionAll?.map((r) => {
            return (
              <>
                <Box my={3}>
                  <Input w={"93%"} mx={9} variant="filled" value={r} readOnly />
                </Box>
              </>
            )
          })}
        {questionType === "drop-down" && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <Flex px="6" py="4" rounded="lg" mx="3" my="1" gap="3" alignItems="center">
              <Input
                placeholder="Add Options"
                onChange={(e) => {
                  setOption(e.target.value)
                }}
                value={option}
                isRequired
              />
              <Button
                h="8"
                rounded="full"
                px="6"
                colorScheme="green"
                fontWeight="500"
                onClick={() => {
                  setOptionAll([...optionAll, option])
                  setOption("")
                }}
              >
                + Add
              </Button>
            </Flex>
          </form>
        )}
      </form>
    </Flex>
  )
}

export default CustomQuestions
