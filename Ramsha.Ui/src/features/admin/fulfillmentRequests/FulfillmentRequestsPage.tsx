import LoadingButton from "@mui/lab/LoadingButton"
import { Box, Tab, Tabs, Typography } from "@mui/material"
import { SyntheticEvent, useMemo, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import AppDialog from "../../../app/components/AppDialog"
import AppSelector, { Option } from "../../../app/components/AppSelector"
import { useDeliveryAgents } from "../../../app/hooks/deliveryAgentHooks"
import { useFiltering } from "../../../app/hooks/filteringHooks"
import { useFulfillmentRequests, useShipFulfillmentRequest } from "../../../app/hooks/orderHooks"
import { usePagination } from "../../../app/hooks/paginationHooks"
import { FulfillmentRequest } from "../../../app/models/orders/fulfillmentRequest"
import FulfillmentRequestsTable from "../../suppliers/FulfillmentRequests/FulfillmentRequestsTable"


const statusOptions = ["Pending", "Approved", "Shipped", "Delivered", "Cancelled", "Failed"];

const FulfillmentRequestsPage = () => {
    const [shipModal, setShipModal] = useState<FulfillmentRequest | null>(null)

    const navigate = useNavigate();
    const { paginationParams } = usePagination();
    const { filterParams, updateColumnsFilterParams } = useFiltering({
        defaultFilterParams: { columnsFilter: [{ filterColumn: "status", operation: "Equals", value: "Pending" }] },
    });

    const { fulfillmentRequests, isFulfillmentRequestsLoading } = useFulfillmentRequests({
        paginationParams,
        filterParams,
    });



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
                                label: 'Ship',
                                action: (fulfillment) => setShipModal(fulfillment)
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
            <AppDialog onClose={() => setShipModal(null)} open={!!shipModal}>
                <Box>
                    {
                        shipModal && <ShipFulfillmentForm fulfillment={shipModal} />
                    }
                </Box>
            </AppDialog>
        </Box>
    )
}

type Props = {
    fulfillment: FulfillmentRequest
}
const ShipFulfillmentForm = ({ fulfillment }: Props) => {

    const [selectedAgent, setSelectedAgent] = useState<Option | null>(null)

    const { deliveryAgents } = useDeliveryAgents()

    const { ship } = useShipFulfillmentRequest();

    const handleOnShip = async () => {
        if (!selectedAgent) return;
        await ship({
            id: fulfillment.id,
            orderId: fulfillment.orderId,
            deliveryAgentId: selectedAgent?.id
        });
    };

    return (
        <Box>
            <AppSelector options={deliveryAgents?.map((agent: any) => ({ id: agent.id, name: agent.username }))} value={selectedAgent} onChange={(option) => {
                const o = option as Option
                setSelectedAgent(o)
            }} />
            <LoadingButton onClick={handleOnShip}>Ship</LoadingButton>
        </Box>
    )
}

export default FulfillmentRequestsPage