const express = require('express');
const router =express.Router();
const ObjectId = require('mongoose').Types.ObjectId

const Order = require('../models/order_model');
const { generateCrudMethods } = require('../services/index.js')
const orderCrud = generateCrudMethods(Order)
const { validateDbId, raiseRecord404Error } = require('../middlewares/')
const { getCoordsForAddress } = require('../location'); 



router.get('/', (req, res, next)=>{
    orderCrud.getAll()
        .then(data=>res.send(data))
        .catch(err=>next(err))
});

router.get('/:id', validateDbId, async (req, res, next) => {
    try {
        const data = await orderCrud.getById(req.params.id);
        if (data) {
            // address to coordinates
            const coordinates = await getCoordsForAddress(data.address);
            
            res.json({ data, coordinates }); // Sending both data and coordinates in the response
        } else {
            raiseRecord404Error(req, res);
        }
    } catch (error) {
        next(error);
    }
});


router.post('/', (req, res, next)=>{
    const newRecord = {
        product: req.body.product, 
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice,
        customerName: req.body.customerName,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        orderDate: req.body.orderDate,
        orderStatus: req.body.orderStatus,
       paymentStatus: req.body.paymentStatus,
    }
    orderCrud.create(newRecord)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.put('/:id', validateDbId, (req, res) => {
    const updatedRecord = {
        product: req.body.product, 
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice,
        customerName: req.body.customerName,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        orderDate: req.body.orderDate,
        orderStatus: req.body.orderStatus,
       paymentStatus: req.body.paymentStatus,
    }
    orderCrud.update(req.params.id, updatedRecord)
        .then(data=>{
            if(data) res.send(data)
            else raiseRecord404Error(req, res)       
        })
        .catch(err => next(err))
 })
router.delete('/:id', validateDbId, (req, res) => {
    orderCrud.delete(req.params.id)
        .then(data=>{
            if(data) res.send(data)
            else raiseRecord404Error(req, res)       
        })
        .catch(err => next(err))
 })

module.exports=router;