import { Box, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFiltering } from "../../../app/hooks/filteringHooks";
import { useMarkFulfillmentRequest, useMyFulfillmentRequests } from "../../../app/hooks/orderHooks";
import { usePagination } from "../../../app/hooks/paginationHooks";
import { FulfillmentRequest } from "../../../app/models/orders/fulfillmentRequest";
import FulfillmentRequestsTable from "./FulfillmentRequestsTable";

const statusOptions = ["Pending", "Approved", "Shipped", "Delivered", "Cancelled", "Failed"];

const MyFulfillmentRequestsPage = () => {
  const navigate = useNavigate();
  const { paginationParams } = usePagination();
  const { filterParams, updateColumnsFilterParams } = useFiltering({
    defaultFilterParams: { columnsFilter: [{ filterColumn: "status", operation: "Equals", value: "Pending" }] },
  });

  const { fulfillmentRequests, isFulfillmentRequestsLoading } = useMyFulfillmentRequests({
    paginationParams,
    filterParams,
  });

  const { markAs } = useMarkFulfillmentRequest();

  const handleOnShip = async (request: FulfillmentRequest) => {
    await markAs({
      markAs: "ship",
      id: request.id,
      orderId: request.orderId,
    });
  };

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
            onShip={handleOnShip}
            onRowView={(row) => navigate(row.id)}
          />
        ) : (
          <Typography variant="body1">No fulfillment requests available for this status.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MyFulfillmentRequestsPage;
