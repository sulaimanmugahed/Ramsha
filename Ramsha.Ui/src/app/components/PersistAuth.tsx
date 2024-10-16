import { useEffect, useState } from "react"

import { Outlet } from "react-router-dom"
import { useAccount } from "../hooks/accountHooks"
import { refresh } from "../api/client"




const PersistAuth = () => {

  const { account } = useAccount()
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {

        await refresh()

      } catch (err) {
        console.log(err)
      }
      finally {
        setIsLoading(false)

      }
    }

    !account ? verifyRefreshToken() : setIsLoading(false)
  }, [])



  return (
    <>
      {
        !isLoading &&
        <Outlet />
      }
    </>
  )

}

export default PersistAuth