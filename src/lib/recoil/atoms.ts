import { atom } from "recoil"

const defaultFormData: formType = {
  preDefinedQues: [
    { value: "Name", isRequired: true, id: 1 },
    { value: "Email Address", isRequired: true, id: 2 },
    { value: "Wallet Address", isRequired: true, id: 3 },
  ],
  customQues: [],
}

interface DisclosureProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const stepAtom = atom<number>({
  key: "stepAtom",
  default: 0,
})

const inviteOnlyAtom = atom<boolean>({
  key: "inviteOnlyAtom",
  default: false,
})

const formDetails = atom<formType>({
  key: "registerFormDetails",
  default: defaultFormData,
})

const dropDownForm = atom<any[]>({
  key: "dropdownForm",
  default: [],
})

const updateOnce = atom<boolean>({
  key: "updateOnce",
  default: false,
})

const navDisclosure = atom<DisclosureProps>({
  key: "navDisclosure",
  default: {
    isOpen: false,
    onOpen: () => {
      console.log()
    },
    onClose: () => {
      console.log()
    },
  },
})

export { dropDownForm, formDetails, inviteOnlyAtom, navDisclosure, stepAtom, updateOnce }
