import { atom } from "recoil"

export const aState = atom<any[]>({
  key: "a",
  default: [],
})
