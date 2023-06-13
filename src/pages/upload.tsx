import React, { useState } from "react"

import ipfs from "../lib/ipfs"

const UploadImage = () => {
  const [fileUrl, updateFileUrl] = useState(``)

  const onChange = async (e: any) => {
    const file = e.target.files[0]
    try {
      const added = await ipfs.add(file)
      const url = `https://infura-ipfs.io/ipfs/${added.path}`
      updateFileUrl(url)
      console.log("IPFS URI: ", url)
    } catch (error) {
      console.log("Error uploading file: ", error)
    }
  }

  return (
    <div className="App">
      <h1>IPFS Example</h1>
      <input type="file" onChange={onChange} />
      {fileUrl && (
        <div>
          <img src={fileUrl} />
          <a href={fileUrl} target="_blank" rel="noreferrer">
            {fileUrl}
          </a>
        </div>
      )}
    </div>
  )
}

export default UploadImage
