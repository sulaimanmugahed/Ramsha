import { useEffect, useState } from "react"

import { Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"




const PersistAuth = () => {

  const { account, refresh } = useAuthStore()
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