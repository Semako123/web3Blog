"use client"

import { injected, useConnect } from "wagmi"
import { Button } from "./ui/button"

const ConnectWalletButton = () => {
  const {connectAsync} = useConnect()

  const handleConnect = async () => {
    try{
      console.log("connecting...")
      let res = await connectAsync({connector: injected()})
      console.log(res)
      alert("connected")
    }catch(error){
      console.log(error)
    }
  }
  return (
    <Button onClick={handleConnect}>Connect</Button>
  )
}

export default ConnectWalletButton