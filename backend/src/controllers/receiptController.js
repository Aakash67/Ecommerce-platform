export const processReceipt = async (req, res) => {
    // Bonus: Tensorlake stub
    // Receives file, would send to Tensorlake, gets items
    // Here we just return mock data

    // In real implementation:
    // const { file } = req;
    // const items = await tensorlake.parse(file);

    const mockItems = [
        { productId: 'prod_1', quantity: 1, price: 99.99 },
        { productId: 'prod_3', quantity: 2, price: 49.99 }
    ];

    res.json({ success: true, items: mockItems });
};
