const express = require('express');
const router =express.Router();
const ObjectId = require('mongoose').Types.ObjectId

const Supplier = require('../models/supplier_model');
const { generateCrudMethods } = require('../services/index.js')
const supplierCrud = generateCrudMethods(Supplier)
const { validateDbId, raiseRecord404Error } = require('../middlewares/')


router.get('/', (req, res, next)=>{
    supplierCrud.getAll()
        .then(data=>res.send(data))
        .catch(err=>next(err))
});

router.get('/:id', validateDbId, (req, res, next) => {
    supplierCrud.getById(req.params.id)
        .then(data=>{
            if(data) res.send(data)
            else raiseRecord404Error(req, res)       
        })
        .catch(err => next(err))
    })

router.post('/', (req, res, next)=>{
    const newRecord = {
        name: req.body.name,
        contactPerson: req.body.contactPerson,
        email: req.body.email,
        phone_No: req.body.phone_No,
        address:req.body.address,
        productSupplied: req.body.productSupplied,
    }
    supplierCrud.create(newRecord)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.put('/:id', validateDbId, (req, res) => {
    const updatedRecord = {
        name: req.body.name,
        contactPerson: req.body.contactPerson,
        email: req.body.email,
        phone_No: req.body.phone_No,
        address:req.body.address,
        productSupplied: req.body.productSupplied,
    }
    supplierCrud.update(req.params.id, updatedRecord)
        .then(data=>{
            if(data) res.send(data)
            else raiseRecord404Error(req, res)       
        })
        .catch(err => next(err))
 })
router.delete('/:id', validateDbId, (req, res) => {
    supplierCrud.delete(req.params.id)
        .then(data=>{
            if(data) res.send(data)
            else raiseRecord404Error(req, res)       
        })
        .catch(err => next(err))
 })

module.exports=router;