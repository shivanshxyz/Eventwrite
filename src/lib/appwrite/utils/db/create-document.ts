import { appwrite } from "../.."

const createDocument = async (db: string, collection: string, doc: string) => {
  const promise = appwrite.database.createDocument(db, collection, doc, {})

  return promise.then(
    (response) => {
      console.log(response)
      return response
    },
    (error) => {
      console.log(error)
    }
  )
}

export default createDocument
