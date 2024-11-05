import React, { useState } from 'react';
import {
    Box
} from '@mui/material';

import { displayDateTime } from '../../app/utils/dateTimeUtils';
import AppDialog from '../../app/components/AppDialog';
import { useGoToParent } from '../../app/hooks/routeHooks';
import { useParams } from 'react-router-dom';
import { useOrderDetail } from '../../app/hooks/orderHooks';
import OrderDetail from './OrderDetail';

const OrderDetailPage = () => {
    const { orderId } = useParams()
    if (!orderId) return null
    const [open, setOpen] = useState(true);
    const back = useGoToParent();

    const { order } = useOrderDetail(orderId)

    const handleClose = () => {
        setOpen(false);
        back();
    };

    return (
        <AppDialog title="Order Details" open={open} onClose={handleClose} fullWidth>
            <Box p={3}>
                {
                    order &&
                    <OrderDetail order={order} />
                }
            </Box>
        </AppDialog>
    );
};

export default OrderDetailPage;
