export const unknownReq = (req, res) => {
    res.status(404)
    res.json('404 | Несуществующий запрос')
};