declare interface DropDown<T = string> {
  type: T
  question: string
  options?: string[]
  requird: boolean
  id: number
}

interface formType {
  preDefinedQues: Question[]
  customQues: Question[]
}

interface formDataType {
  id: number
  data: formType
}
