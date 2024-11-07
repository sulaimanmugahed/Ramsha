export const getStatusColor = (status: string) => {
    switch (status) {
        case 'Pending': return 'warning';
        case 'Approved': return 'info';
        case 'Shipped': return 'primary';
        case 'Delivered': return 'success';
        case 'Cancelled': return 'default';
        case 'Failed': return 'error';
        case 'Completed': return 'success';
        default: return 'default';
    }
};