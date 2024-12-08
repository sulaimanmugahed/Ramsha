import { Box, Tab, Tabs, Typography } from "@mui/material"
import { SyntheticEvent, useMemo } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { useFiltering } from "../../../app/hooks/filteringHooks"
import { useDeliveryAgentFulfillmentRequests, useFulfillmentRequests, useMarkFulfillmentRequest } from "../../../app/hooks/orderHooks"
import { usePagination } from "../../../app/hooks/paginationHooks"
import { FulfillmentRequest } from "../../../app/models/orders/fulfillmentRequest"
import FulfillmentRequestsTable from "../../suppliers/FulfillmentRequests/FulfillmentRequestsTable"


const statusOptions = ["Pending", "Approved", "Shipped", "Delivered", "Cancelled", "Failed"];

const DeliveryAgentFulfillmentsPage = () => {

    const navigate = useNavigate();
    const { paginationParams } = usePagination();
    const { filterParams, updateColumnsFilterParams } = useFiltering({
        defaultFilterParams: { columnsFilter: [{ filterColumn: "status", operation: "Equals", value: "Pending" }] },
    });

    const { fulfillmentRequests, isFulfillmentRequestsLoading } = useDeliveryAgentFulfillmentRequests({
        paginationParams,
        filterParams,
    });



    const { markAs } = useMarkFulfillmentRequest()

    const handleOnDelivered = async (fulfillment: FulfillmentRequest) => {
        await markAs({
            markAs: 'deliver',
            id: fulfillment.id,
            orderId: fulfillment.orderId
        })
    }



    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        const newStatus = statusOptions[newValue];
        updateColumnsFilterParams([{ filterColumn: "status", operation: "Equals", value: newStatus }]);
    };

    const selectedStatus = useMemo(
        () => filterParams.columnsFilter?.find((x) => x.filterColumn === "status")?.value || "Pending",
        [filterParams]
    );

    if (isFulfillmentRequestsLoading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: 2 }}>
            <Tabs
                value={statusOptions.indexOf(selectedStatus)}
                onChange={handleTabChange}
                aria-label="Fulfillment Requests Status"
            >
                {statusOptions.map((status) => (
                    <Tab key={status} label={status} />
                ))}
            </Tabs>

            <Box sx={{ mt: 2 }}>
                {fulfillmentRequests && fulfillmentRequests.length > 0 ? (
                    <FulfillmentRequestsTable
                        fulfillmentRequests={fulfillmentRequests}
                        actions={[
                            {
                                label: 'Deliver',
                                action: handleOnDelivered
                            },
                            {
                                label: 'Detail',
                                action: (fulfillment) => navigate(fulfillment.id)
                            }
                        ]}
                    />
                ) : (
                    <Typography variant="body1">No fulfillment requests available for this status.</Typography>
                )}
            </Box>
            <Outlet />

        </Box>
    )
}

export default DeliveryAgentFulfillmentsPage