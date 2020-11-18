import HttpService from './http.service.js'
import { userService } from './user.service.js'


export const expService = {
  getExps,
  getById,
  remove,
  add,
  update,
  addParticipant,
  getEmptyExp,
  saveExp,
  getNumOfAllExps,
  addReview
}

async function getExps({ type = 'all-type', location = 'all-location', tags = [], sortBy = 'newest', userId = 'all', limit = 0, skip = 0 }) {
  return await HttpService.get(`exp?type=${type}&location=${location}&tags=${tags}&sortBy=${sortBy}&userId=${userId}&limit=${limit}&skip=${skip}`)
}

async function getNumOfAllExps() {
  const numOfAllExps = await HttpService.get(`exp/num`)
  return numOfAllExps
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
    date: Date.now(),
    capacity: "",
    imgUrls: [],
    reviews: []
  }
  return emptyExp
}

function saveExp(exp) {
  return exp._id ? update(exp) : add(exp);
}


async function addParticipant(booked, exp, user) {
  let miniUser = (user)? userService.getMiniUser(user) : userService.getGuestUser();
  miniUser.numOfTickets =  booked.numOfTickets,
  exp.participants.push(miniUser);
  try {
    const updatedExp = await update(exp);
    await userService.informSeller(exp.createdBy._id , miniUser ,'order');
    return updatedExp
  } catch (err) {
    console.log(err)
    throw (err)
  }
}

async function addReview(exp, review ,user){
  let miniUser = (user)? userService.getMiniUser(user) : userService.getGuestUser();
  review.by = miniUser ;
  exp.reviews.unshift(review);
  try {
    const updatedExp = await update(exp);
    await userService.informSeller(exp.createdBy._id , miniUser ,'review');
  } catch (err) {
    console.log(err)
    throw (err)
  }

}


