// mockCategories.ts
export const mockCategories = [
    {
        id: '1',
        name: 'Electronics',
        Children: [
            {
                id: '1-1',
                name: 'Laptops',
                Children: [
                    { id: '1-1-1', name: 'Gaming Laptops', Children: [] },
                    { id: '1-1-2', name: 'Business Laptops', Children: [] },
                ],
            },
            {
                id: '1-2',
                name: 'Smartphones',
                Children: [
                    { id: '1-2-1', name: 'Android', Children: [] },
                    { id: '1-2-2', name: 'iOS', Children: [] },
                ],
            },
        ],
    },
    {
        id: '2',
        name: 'Home Appliances',
        Children: [
            {
                id: '2-1',
                name: 'Refrigerators',
                Children: [
                    { id: '2-1-1', name: 'Top Freezer', Children: [] },
                    { id: '2-1-2', name: 'Side-by-Side', Children: [] },
                ],
            },
            {
                id: '2-2',
                name: 'Washing Machines',
                Children: [
                    { id: '2-2-1', name: 'Front Load', Children: [] },
                    { id: '2-2-2', name: 'Top Load', Children: [] },
                ],
            },
        ],
    },
    {
        id: '3',
        name: 'Furniture',
        Children: [
            {
                id: '3-1',
                name: 'Living Room',
                Children: [
                    { id: '3-1-1', name: 'Sofas', Children: [] },
                    { id: '3-1-2', name: 'Coffee Tables', Children: [] },
                ],
            },
            {
                id: '3-2',
                name: 'Bedroom',
                Children: [
                    { id: '3-2-1', name: 'Beds', Children: [] },
                    { id: '3-2-2', name: 'Dressers', Children: [] },
                ],
            },
        ],
    },
];
