import { Date } from 'core-js'
import HttpService from './http.service.js'

export const userService = {
    login,
    logout,
    signup,
    getById,
    remove,
    update,
    informSeller,
    getGuestUser,
    getMiniUser,

}


async function getById(userId) {
    return await HttpService.get(`user/${userId}`)
}

async function remove(userId) {
    return await HttpService.delete(`user/${userId}`)
}

async function update(user) {
    return await HttpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    try {
        const user = await HttpService.post('auth/login', userCred)
        return user
    } catch (err) {
        throw err
    }
}

async function signup(userCred) {
    try {
        const user = await HttpService.post('auth/signup', userCred)
        return user
    } catch (err) {
        throw err
    }
}
async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}

async function informSeller(sellerId, { fullName, imgUrl }, type) {
    const seller = await getById(sellerId);
    const desc = (type === 'review') ? fullName + ' left review' : fullName + ' ordered from you'
    seller.notifications.push({
        desc,
        imgUrl,
        createdAt: Date.now()
    })
    await update(seller)
}

function getMiniUser(user) {
    return {
        _id: user._id,
        fullName: user.fullName,
        imgUrl: user.imgUrl,
        createdAt: Date.now()
    }
}
function getGuestUser() {
    const user = {
        _id: makeId(),
        fullName: 'guest',
        imgUrl: "https://icon-library.com/images/male-avatar-icon/male-avatar-icon-29.jpg",
        createdAt: Date.now()
    }
    return user
}


function makeId(l = 5) {
    var text = "";
    var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < l; i++) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
}


