import HttpService from './http.service.js'
import { userService } from './user.service.js'

export const orderService = {
    getOrders,
    getById,
    remove,
    update,
    addOrder 
}
async function getOrders(userId) {
    return await HttpService.get(`order?userId=${userId}`)
}

async function remove(orderId) {
    return await HttpService.delete(`order/${orderId}`)
}

async function update(order) {
    return await HttpService.put(`order/${order._id}`, order)
}

async function getById(orderId) {
    return await HttpService.get(`order/${orderId}`)
}
async function addOrder(booked, exp, user) {
    if(!user) user = userService.getGuestUser(booked)
    const order = {
        createdAt : Date.now(),
        by: {
            _id: user._id, 
            fullName: user.fullName,
            imgUrl: user.imgUrl
        },
        exp: {
            _id: exp._id,
            type: exp.type,
            title: exp.title,
            date: exp.date,
            location: exp.location
        }
    }
    return await HttpService.post(`order`, order)
}
























