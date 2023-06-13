import { Account, Client as Appwrite, Databases } from "appwrite"
import { atom } from "recoil"

import {
  APPWRITE_API_ENDPOINT,
  APPWRITE_DATABASE_ID,
  APPWRITE_PROJECT_ID,
} from "../../utils/constants/env"

if (!APPWRITE_API_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_DATABASE_ID)
  throw new Error("Appwrite env variables not set")

export const client = new Appwrite()
  .setEndpoint(APPWRITE_API_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)

const account = new Account(client)
const database = new Databases(client)

export const appwrite = { account, database }
