import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"
import { HiOutlineChevronRight as ChevronRight } from "react-icons/hi"
import { MdCalendarToday as CalendarToday } from "react-icons/md"

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react"

import EventCard from "../../atoms/card/event-card"

import DateModal from "./date-picker-modal"
export type PaymentMode = "Option 1" | "Option 2" | "Option 3"

const Step1 = ({ onSubmit }: { onSubmit: (e: any) => void }) => {
  const [isPaid, setIsPaid] = useState(true)
  const [isUnlimited, setIsUnlimited] = useState(false)
  const [formDetails, setFormDetails] = useState({
    title: "",
    type: "",
    category: { category: [""], event_type: "", inviteOnly: false },
    fee: 0,
    date: "",
    seats: 0,
    tickets_sold: 0,
    profileImage: "",
    displayName: "",
    customSPLToken: "",
    chain: "",
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [submitting, setSubmitting] = useState(false)
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("Option 1")
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (submitting) {
          onSubmit(formDetails)
        }
      }}
    >
      <Box color="brand.black">
        {isOpen && (
          <DateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={(date: any) => {
              setFormDetails({
                ...formDetails,
                date,
              })

              console.log(date)
            }}
          />
        )}
        <Text align="center" color="brand.black400" fontSize="4xl" fontWeight="semibold">
          Tell us about your event
        </Text>
        <Flex justifyContent={"center"}>
          <Flex mt={"1"} dir="row" w={"xl"}>
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontFamily="body"
              mt="2"
              fontWeight="normal"
            >
              <FormLabel
                fontFamily="body"
                color="blackAlpha.700"
                fontWeight="normal"
                mb="0"
                htmlFor="price"
              >
                Is it a paid event?
              </FormLabel>

              <Switch
                onChange={(e: any) => {
                  setIsPaid(e.target.checked)
                  setFormDetails({
                    ...formDetails,
                    fee: 0,
                  })
                }}
                isChecked={isPaid}
                id="price"
                colorScheme="linkedin"
              />
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontFamily="body"
              mt="2"
              fontWeight="normal"
            >
              <FormLabel
                fontFamily="body"
                color="blackAlpha.700"
                fontWeight="normal"
                mb="0"
                htmlFor="price"
              >
                Unlimited tickets?
              </FormLabel>

              <Switch
                onChange={(e: any) => {
                  setIsUnlimited(e.target.checked)
                  setFormDetails({
                    ...formDetails,
                    seats: 10000000,
                  })
                }}
                isChecked={isUnlimited}
                id="price"
                colorScheme="linkedin"
              />
            </FormControl>

            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontFamily="body"
              mt="2"
              fontWeight="normal"
            >
              <FormLabel
                fontFamily="body"
                color="blackAlpha.700"
                fontWeight="normal"
                mb="0"
                htmlFor="price"
              >
                Invite only Event?
              </FormLabel>

              <Switch
                onChange={(e: any) => {
                  setFormDetails({
                    ...formDetails,
                    category: {
                      ...formDetails.category,
                      inviteOnly: e.target.checked,
                    },
                  })
                }}
                id="price"
                colorScheme="linkedin"
              />
            </FormControl>
          </Flex>
        </Flex>
        <Flex justify="space-between" gridGap="10" mt="6" px="10" maxW="1200px" mx="auto">
          <Box fontFamily="body" w="full">
            <FormControl
              borderBottom="2px"
              borderBottomColor="gray.200"
              _focusWithin={{
                borderBottomColor: "gray.300",
              }}
            >
              <FormLabel fontSize={{ lg: "md", xl: "lg" }} color="blackAlpha.700" my="0">
                Event Name
              </FormLabel>

              <Input
                onChange={(e: any) => {
                  setFormDetails({
                    ...formDetails,
                    title: e.target.value,
                  })
                }}
                fontSize="sm"
                value={formDetails.title}
                required
                px="0"
                _placeholder={{ color: "gray.300" }}
                placeholder="Name of your event"
                bg="transparent"
                border="none"
                rounded="none"
                _hover={{}}
                _focus={{}}
                _active={{}}
              />
            </FormControl>
            <Flex gridGap="8" mt="6">
              <FormControl
                borderBottom="2px"
                borderBottomColor="gray.200"
                _focusWithin={{
                  borderBottomColor: "gray.300",
                }}
              >
                <FormLabel fontSize={{ lg: "md", xl: "lg" }} color="blackAlpha.700" my="0">
                  Event Type
                </FormLabel>
                <Menu>
                  <MenuButton type="button" w="full">
                    <InputGroup>
                      <Input
                        fontSize="sm"
                        required
                        px="0"
                        value={formDetails.category.event_type}
                        _placeholder={{
                          color: "gray.300",
                        }}
                        placeholder="Is this event online/in-person?"
                        bg="transparent"
                        border="none"
                        rounded="none"
                        _hover={{}}
                        _focus={{}}
                        _active={{}}
                        isReadOnly
                      />
                      <InputRightElement color="gray.400">
                        <FaChevronDown />
                      </InputRightElement>
                    </InputGroup>
                  </MenuButton>
                  <MenuList rounded="lg" shadow="sm" fontSize="sm" mt="1" zIndex={9}>
                    <MenuItem
                      onClick={(e: any) => {
                        setFormDetails({
                          ...formDetails,
                          category: {
                            ...formDetails.category,
                            event_type: "Online",
                          },
                        })
                      }}
                    >
                      Online
                    </MenuItem>
                    <MenuItem
                      onClick={(e: any) => {
                        setFormDetails({
                          ...formDetails,
                          category: {
                            ...formDetails.category,
                            event_type: "In-Person",
                          },
                        })
                      }}
                    >
                      In-person
                    </MenuItem>
                  </MenuList>
                </Menu>
              </FormControl>
              <FormControl
                borderBottom="2px"
                borderBottomColor="gray.200"
                _focusWithin={{
                  borderBottomColor: "gray.300",
                }}
              >
                <FormLabel fontSize={{ lg: "md", xl: "lg" }} color="blackAlpha.700" my="0">
                  Event Category
                </FormLabel>
                <Menu>
                  <MenuButton type="button" w="full">
                    <InputGroup>
                      <Input
                        fontSize="sm"
                        value={formDetails.category.category[0]}
                        required
                        px="0"
                        _placeholder={{
                          color: "gray.300",
                        }}
                        placeholder="Category of your event"
                        bg="transparent"
                        border="none"
                        rounded="none"
                        _hover={{}}
                        _focus={{}}
                        _active={{}}
                        isReadOnly
                      />
                      <InputRightElement color="gray.400">
                        <FaChevronDown />
                      </InputRightElement>
                    </InputGroup>
                  </MenuButton>
                  <MenuList rounded="lg" shadow="sm" fontSize="sm" mt="1" zIndex={9}>
                    <MenuItem
                      onClick={(e: any) => {
                        setFormDetails({
                          ...formDetails,
                          category: {
                            ...formDetails.category,
                            category: ["Meetup"],
                          },
                        })
                      }}
                    >
                      Meetup
                    </MenuItem>
                    <MenuItem
                      onClick={(e: any) => {
                        setFormDetails({
                          ...formDetails,
                          category: {
                            ...formDetails.category,
                            category: ["Party"],
                          },
                        })
                      }}
                    >
                      Party
                    </MenuItem>
                  </MenuList>
                </Menu>
              </FormControl>
            </Flex>
            <Flex gridGap="8" mt="6">
              <FormControl
                opacity={isPaid ? 1 : 0.8}
                _disabled={{}}
                isDisabled={!isPaid}
                borderBottom="2px"
                borderBottomColor="gray.200"
                _focusWithin={{
                  borderBottomColor: "gray.300",
                }}
              >
                <FormLabel fontSize={{ lg: "md", xl: "lg" }} color="blackAlpha.700" my="0">
                  Ticket Amount
                </FormLabel>
                <InputGroup>
                  <Input
                    isRequired={isPaid}
                    onChange={(e: any) => {
                      setFormDetails({
                        ...formDetails,
                        fee: Number(e.target.value),
                      })
                    }}
                    type="number"
                    step="any"
                    fontSize="sm"
                    px="0"
                    _placeholder={{
                      color: "gray.300",
                    }}
                    placeholder="Price of one ticket"
                    bg="transparent"
                    border="none"
                    rounded="none"
                    _hover={{}}
                    _focus={{}}
                    _active={{}}
                    value={formDetails.fee === 0 ? "" : formDetails.fee}
                  />
                  <InputRightElement>
                    <Flex
                      borderLeft="2px"
                      borderColor="gray.200"
                      gridGap="2"
                      align="center"
                      mr="20"
                      bg="white"
                      pl="2"
                    >
                      <Menu>
                        <MenuButton type="button" w="100px">
                          <InputGroup>
                            <Input
                              fontSize="sm"
                              isRequired
                              px="0"
                              _placeholder={{
                                color: "gray.300",
                              }}
                              value={paymentMode}
                              placeholder="Token"
                              bg="transparent"
                              border="none"
                              rounded="none"
                              _hover={{}}
                              _focus={{}}
                              _active={{}}
                              isReadOnly
                            />
                            <InputLeftElement color="gray.400">
                              <FaChevronDown />
                            </InputLeftElement>
                          </InputGroup>
                        </MenuButton>

                        <MenuList>
                          {["Option A", "Option B", "Option C"].map((token, key) => (
                            <MenuItem
                              key={key}
                              onClick={() => setPaymentMode(token as PaymentMode)}
                            >
                              <Text
                                color="blackAlpha.700"
                                fontSize="sm"
                                letterSpacing={1}
                                fontWeight="medium"
                                fontFamily="heading"
                              >
                                {token}
                              </Text>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                      {/* )} */}
                    </Flex>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl
                onClick={onOpen}
                borderBottom="2px"
                borderBottomColor="gray.200"
                _focusWithin={{
                  borderBottomColor: "gray.300",
                }}
              >
                <FormLabel fontSize={{ lg: "md", xl: "lg" }} color="blackAlpha.700" my="0">
                  Date of Event
                </FormLabel>
                <InputGroup>
                  <Input
                    _placeholder={{
                      color: "gray.300",
                    }}
                    fontSize="sm"
                    isRequired
                    cursor="pointer"
                    value={formDetails.date.split("T")[0]}
                    px="0"
                    placeholder="When will the event take place?"
                    bg="transparent"
                    border="none"
                    rounded="none"
                    _hover={{}}
                    _focus={{}}
                    _active={{}}
                    isReadOnly
                  />
                  <InputRightElement color="gray.400">
                    <CalendarToday />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Flex>
            <Flex gridGap="8" mt="6">
              <FormControl
                mt="6"
                w="50%"
                borderBottom="2px"
                borderBottomColor="gray.200"
                _focusWithin={{
                  borderBottomColor: "gray.300",
                }}
              >
                <FormLabel fontSize={{ lg: "md", xl: "lg" }} color="blackAlpha.700" my="0">
                  Total Tickets
                </FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e: any) => {
                      setFormDetails({
                        ...formDetails,
                        seats: Number(e.target.value),
                      })
                    }}
                    _placeholder={{ color: "gray.300" }}
                    fontSize="sm"
                    required
                    min="1"
                    type="number"
                    step="1"
                    px="0"
                    placeholder="Total seats for the event"
                    bg="transparent"
                    border="none"
                    rounded="none"
                    _hover={{}}
                    _focus={{}}
                    _active={{}}
                    disabled={isUnlimited}
                    value={
                      formDetails.seats === 0
                        ? ""
                        : formDetails.seats >= 10000000
                        ? ""
                        : formDetails.seats
                    }
                  />
                </InputGroup>
              </FormControl>
            </Flex>
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
                  title: formDetails.title || "Untitled",
                  childAddress: "",
                  category: {
                    category: [formDetails.category.category[0] || "category"],
                    event_type: formDetails.category.event_type || "type",
                  },
                  image: {
                    image: "/image/gradient.png",
                    gallery: [],
                  },
                  eventHost: "",
                  fee: Number(formDetails.fee),
                  date: formDetails.date ? formDetails.date : "1/1/2000",
                  description: {
                    short_desc: "Event description goes here",
                    long_desc: "",
                  },
                  seats: formDetails.seats || 20,
                  owner: "",
                  venue: {
                    name: "Venue name",
                    x: 0,
                    y: 0,
                  },
                  buyers: [],
                  tickets_available: formDetails.seats || 20,
                  tickets_sold: 0,
                  type: formDetails.category.event_type || "type",
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
            onClick={() => {
              if (
                formDetails.title &&
                formDetails.category &&
                (formDetails.fee || !isPaid) &&
                formDetails.category.event_type &&
                formDetails.date
              ) {
                setSubmitting(true)
              }
            }}
            px="8"
          >
            Next Step
          </Button>
        </Flex>
      </Box>
    </form>
  )
}

export default Step1
