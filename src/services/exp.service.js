import HttpService from './http.service.js'
import { userService } from './user.service.js'
// import { match } from 'core-js/fn/symbol'


export const expService = {
  getExps,
  getById,
  remove,
  add,
  update,
  addParticipant,
  getEmptyExp,
  saveExp
}

async function getExps({ type = 'all-type', location = 'all-location', tags = [], sortBy = 'newest', userId = 'all' ,limit = 0}) {
  return await HttpService.get(`exp?type=${type}&location=${location}&tags=${tags}&sortBy=${sortBy}&userId=${userId}&limit=${limit}`)
}



async function remove(expId) {
  return await HttpService.delete(`exp/${expId}`)
}

async function add(exp) {
  return await HttpService.post(`exp`, exp)
}

async function update(exp) {
  return await HttpService.put(`exp/${exp._id}`, exp)
}

async function getById(expId) {
  return await HttpService.get(`exp/${expId}`)
}

function getEmptyExp() {
  const emptyExp =
  {
    title: "",
    shortDesc: "",
    desc: "",
    createdBy: {
      _id: "",
      fullName: "",
      info: "",
      imgUrl: ""
    },
    type: "",
    currPrice: "",
    origPrice: "",
    tags: [],
    participants: [],
    location: "",
    date: Date.now() + 60 * 60 * 1000 * 24 * (Math.floor(Math.random() * (60 - 1 + 1))),
    capacity: "",
    imgUrls: [],
    reviews: []
  }
  return emptyExp
}

async function addParticipant(booked, exp, user) {
  let miniUser;
  if (user) {
    miniUser = {
      _id: user._id,
      fullName: user.fullName,
      imgUrl: user.imgUrl,
      numOfTickets: booked.numOfTickets,
      createdAt: Date.now()
    }
  } else miniUser = userService.getGuestUser(booked)
  exp.participants.push(miniUser);
  try {
    const updatedExp = await update(exp)
    return updatedExp
  } catch (err) {
    return (err)
  }
}

function saveExp(exp) {
  return exp._id ? update(exp) : add(exp);
}
