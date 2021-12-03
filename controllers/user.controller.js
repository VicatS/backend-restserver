const { response, request} = require('express')

const index = (req = request, res = response) => {

    const {q, name, lastName = 'No last name'} = req.query;

    res.json({
        msg: 'get API controller index',
        q,
        name,
        lastName
    })
}

const store = (req, res = response) => {
    const { name, age } = req.body;

    res.json({
        msg: 'get API controller store',
        name,
        age
    })
}

const update = (req, res = response) => {

    const { id } = req.params
    res.json({
        msg: 'get API controller update',
        id
    })
}

const updatePatch = (req, res = response) => {
    res.json({
        msg: 'get API controller update with patch'
    })
}

const destroy = (req, res = response) => {
    res.json({
        msg: 'get API controller destroy'
    })
}

module.exports = {
    index,
    store,
    update,
    updatePatch,
    destroy
}