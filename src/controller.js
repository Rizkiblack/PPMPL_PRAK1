let items = [
    { id: 1, name: 'item 1' },
    { id: 2, name: 'item 2' },
];

exports.getItems = (req, res) => {
    res.status(200).json(items);
};

exports.createItem = (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
    };
    items.push(newItem);
    res.status(201).json(newItem);
};

exports.updateItem = (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(i => i.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    // Mengupdate nama item sesuai dengan data dari request body
    items[itemIndex].name = req.body.name;
    res.status(200).json(items[itemIndex]);
};

exports.deleteItem = (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(i => i.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    items.splice(itemIndex, 1);
    res.status(200).json({ message: 'Item deleted successfully' });
};
