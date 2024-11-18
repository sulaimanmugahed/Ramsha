import { useEffect } from "react"
import { useCreateOrUpdatePaymentIntent } from "../../app/hooks/paymentHooks"

const AboutPage = () => {

  const { submit } = useCreateOrUpdatePaymentIntent()

  useEffect(() => {
    const process = async () => {
      await submit();
    };

    process();
  }, [])

  return (
    <div>AboutPage</div>
  )
}

export default AboutPage