declare type questionType = "drop-down" | "check-box" | "input" | "long-text"

declare interface Question {
  value: string
  isRequired: boolean
  id: number
}

declare interface Questions {
  question: string
  options?: options
  type: questionType
  defaultValue?: string
  required: boolean
}
