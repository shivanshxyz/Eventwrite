import axios from "axios"
import moment from "moment"

import ipfs from "../../lib/ipfs"

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

export const uploadImage = async (image: any) => {
  const id = await ipfs.add(image)

  return `https://ipfs.io/ipfs/${id.cid}`
}

export const uploadToCloudinary = async (image: any) => {
  const formData = new FormData()

  formData.append("file", image)
  formData.append("upload_preset", "public")
  const post = await axios.post("https://api.cloudinary.com/v1_1/metapass/image/upload", formData)
  return post.data.secure_url
}

export const getBlob = (file: any) => {
  if (file) {
    return URL.createObjectURL(file)
  }
}

export const getBuffer = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export const loadImage = async (url: string) => {
  const data = await axios.get(url)
  return data
}

export const uploadTicketToIPFS = async (
  title: string,
  ticketNumber: number,
  url: string,
  date: string,
  person: string
) => {
  const parsedDate = date.split("T")[0].split(":").join("/")
  const BASE_ENDPOINT = "https://ticket-img-production-f075.up.railway.app"
  const res = await axios.get(
    `${BASE_ENDPOINT}/api/v2/2d/edit/hero_text=${title}&ticket_no=${ticketNumber.toString()}&venue=${person}&date=${
      months[moment(parsedDate).get("month")] + " " + moment(parsedDate).get("date")
    }?url=${url}`
  )

  const { data } = await axios.post("/api/addToIPFS", {
    file: res.data[0],
  })

  return {
    img: `https://ipfs.io/ipfs/${data.cid}`,
    fastimg: res.data[0],
  }
}

export const generateTicket = async (
  title: string,
  ticketNumber: number,
  url: string,
  date: string,
  person: string
) => {
  const parsedDate = date.split("T")[0]

  const res = await axios.post("/api/image", {
    title,
    ticketNumber,
    person,
    months,
    parsedDate,
    url,
  })
  return {
    fastimg: res.data[0],
  }
}
