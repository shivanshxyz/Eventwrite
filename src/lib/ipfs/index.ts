import { create } from "ipfs-http-client"

import { IPFS_CLIENT_PROJECT, IPFS_CLIENT_SECRET } from "../../utils/constants/env"

const projectId = IPFS_CLIENT_PROJECT
const projectSecret = IPFS_CLIENT_SECRET
const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64")

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
})

export default ipfs
