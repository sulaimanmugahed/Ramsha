import { Outlet, useNavigate } from "react-router-dom"
import { useMyFulfillmentRequests } from "../../../app/hooks/orderHooks"
import FulfillmentRequestsTable from "./FulfillmentRequestsTable"

const MyFulfillmentRequestsPage = () => {
  const { fulfillmentRequests } = useMyFulfillmentRequests()

  const navigate = useNavigate()

  return (
    fulfillmentRequests && (
      <>
        <FulfillmentRequestsTable fulfillmentRequests={fulfillmentRequests} onRowView={(row) => navigate(row.id)} />
        <Outlet />
      </>
    )
  )
}

export default MyFulfillmentRequestsPage