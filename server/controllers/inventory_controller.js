const express = require('express');
const router =express.Router();

const Inventory = require('../models/inventory_model');
const { generateCrudMethods } = require('../services/index.js')
const inventoryCrud = generateCrudMethods(Inventory)
const { validateDbId, raiseRecord404Error } = require('../middlewares/')


router.get('/', (req, res, next)=>{
    inventoryCrud.getAll()
        .then(data=>res.send(data))
        .catch(err=>next(err))
});

router.get('/:id', validateDbId, (req, res, next) => {
    inventoryCrud.getById(req.params.id)
        .then(data=>{
            if(data) res.send(data)
            else raiseRecord404Error(req, res)       
        })
        .catch(err => next(err))
    })

router.post('/', (req, res, next)=>{
    const newRecord = {
        productName: req.body.productName,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        supplierName: req.body.supplierName,
        manufacturingDate: req.body.manufacturingDate,
        expiryDate: req.body.expiryDate,
        location: req.body.location
    }
    inventoryCrud.create(newRecord)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.put('/:id', validateDbId, (req, res) => {
    const updatedRecord = {
        productName: req.body.productName,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        supplierName: req.body.supplierName,
        manufacturingDate: req.body.manufacturingDate,
        expiryDate: req.body.expiryDate,
        location: req.body.location
    }
    inventoryCrud.update(req.params.id, updatedRecord)
        .then(data=>{
            if(data) res.send(data)
            else raiseRecord404Error(req, res)       
        })
        .catch(err => next(err))
 })
router.delete('/:id', validateDbId, (req, res) => {
    inventoryCrud.delete(req.params.id)
        .then(data=>{
            if(data) res.send(data)
            else raiseRecord404Error(req, res)       
        })
        .catch(err => next(err))
 })

module.exports=router;