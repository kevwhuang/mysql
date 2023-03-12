const errorId = (res, id) => res.status(400).json({ error: `<id: ${id}> not found.` });
const errorMissing = (res, field) => res.status(400).json({ error: `<${field}> must be included.` });
const errorServer = (res, err) => res.status(500).json(err);
const errorType = (res, field, type) => res.status(400).json({ error: `<${field}> must be a ${type}.` });

module.exports = {
    errorId,
    errorMissing,
    errorServer,
    errorType,
};
