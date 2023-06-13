import { useEffect, useMemo, useState } from "react"
import moment from "moment-timezone"
import { MdCalendarToday as CalendarToday } from "react-icons/md"
import TimezoneSelect, { allTimezones } from "react-timezone-select"

import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"

interface DateModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (date: string) => void
}

const DateModal = ({ isOpen, onClose, onSubmit }: DateModalProps) => {
  const [startDateTime, setStartDateTime] = useState(moment())
  const [endTimes, setEndTimes] = useState<HM>({
    hh: 0,
    mm: 0,
  })
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
  })
  const [tz, setTz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

  // useMemo(() => {
  //   const tzValue = tz
  //   setStartDateTime(moment(startDateTime.toString()).tz(tzValue))
  // }, [startDateTime, tz])

  useEffect(() => {
    const durationToAdd = moment.duration(duration)
    const newDate = moment(startDateTime.toString()).tz(tz).add(durationToAdd)
    setEndTimes({
      hh: newDate.get("hours"),
      mm: newDate.get("minutes"),
    })
  }, [duration, startDateTime, tz])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent color="brand.black" overflow="hidden" rounded="xl">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const durationToAdd = moment.duration(duration)
            /* YYYY:MM:DDThh:mm:ss-hh:mm:ss */
            const endDateTime = moment(startDateTime.toString()).tz("UTC").add(durationToAdd)

            const endHours = endDateTime.get("hours")
            const endMinutes = endDateTime.get("minutes")

            onSubmit(
              `${startDateTime.tz("UTC").format("YYYY:MM:DDTHH:mm:ss")}-${`${endHours}`.padStart(
                2,
                "0"
              )}:${`${endMinutes}`.padStart(2, "0")}:00`
            )
            onClose()
          }}
        >
          <ModalHeader fontWeight="medium" fontSize="lg">
            <Flex align="center" gap="2">
              <CalendarToday fontSize="small" />
              <Text>Date of Event</Text>
            </Flex>
            <ModalCloseButton _focus={{}} />
          </ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <Text mb="2" fontSize="xs" ml="1" color="blackAlpha.700">
                Starting Date & Time
              </Text>
              <Input
                placeholder="Select Date and Time"
                size="md"
                value={startDateTime.format("YYYY-MM-DDTHH:mm")}
                onChange={(e: any) => {
                  setStartDateTime(moment.tz(e.target.value, tz))
                }}
                type="datetime-local"
              />
              <Text my="2" fontSize="xs" ml="1" color="blackAlpha.700">
                Select Timezone
              </Text>
              <TimezoneSelect
                maxMenuHeight={150}
                value={tz}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onChange={setTz}
                timezones={{
                  ...allTimezones,
                  "America/Lima": "Pittsburgh",
                  "Europe/Berlin": "Frankfurt",
                }}
              />
              <Flex mt={5} gap={4}>
                <InputGroup size="md">
                  <Input
                    onChange={(e: any) => {
                      setDuration((prev) => ({
                        ...prev,
                        hours: !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 0,
                      }))
                    }}
                    type="number"
                    placeholder="0"
                  />
                  <InputRightAddon>Hours</InputRightAddon>
                </InputGroup>
                <InputGroup size="md">
                  <Input
                    onChange={(e: any) => {
                      setDuration((prev) => ({
                        ...prev,
                        minutes: !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 0,
                      }))
                    }}
                    placeholder="00"
                    type="number"
                  />
                  <InputRightAddon>Min</InputRightAddon>
                </InputGroup>
              </Flex>
            </FormControl>
            <Text fontSize={"xs"} mt={2}>
              The end time will be{" "}
              {`${endTimes.hh <= 12 ? endTimes.hh : endTimes.hh - 12}`.padStart(2, "0")}:
              {`${endTimes.mm}`.padStart(2, "0")} {endTimes.hh < 12 ? "AM" : "PM"}
            </Text>
          </ModalBody>
          <Divider mt="2" />
          <ModalFooter bg="blackAlpha.50">
            <Box
              p="1.5px"
              transitionDuration="200ms"
              rounded="full"
              boxShadow="0px 5px 33px rgba(0, 0, 0, 0.08)"
              bg="brand.gradient"
              _hover={{ transform: "scale(1.05)" }}
              _focus={{}}
              _active={{ transform: "scale(0.95)" }}
            >
              <Button
                type="submit"
                rounded="full"
                bg="white"
                size="sm"
                color="blackAlpha.700"
                fontWeight="medium"
                _hover={{}}
                _focus={{}}
                _active={{}}
                role="group"
              >
                Done
              </Button>
            </Box>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default DateModal
