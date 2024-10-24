import request from "../../app/api/Request"
import { useProducts } from "../../app/hooks/productHooks"
import Hero from "./Hero"
import { useEffect } from "react"


const HomePage = () => {

    useEffect(() => {
        const test = async () => {
            var res = await request({
                url: 'account/test',
                method: 'GET',
            })
            console.log('from effect: ', res)
        }
        test()
    }, [])

    return (
        <>
            <Hero />
        </>

    )

}

export default HomePage