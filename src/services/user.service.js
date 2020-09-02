import HttpService from './http.service.js'

export const userService = {
    login,
    logout,
    signup,
    getById,
    remove,
    update,
    getGuestUser
}


function getGuestUser(booked) {
    const user = {
        _id: makeId(),
        fullName: 'guest',
        imgUrl: "https://icon-library.com/images/male-avatar-icon/male-avatar-icon-29.jpg",
        numOfTickets: booked.numOfTickets,
        createdAt: Date.now()
    }
    return user
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
    const user = await HttpService.post('auth/login', userCred)
    return _handleLogin(user)
}

async function signup(userCred) {
    const user = await HttpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}


function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

function makeId(l = 5) {
    var text = "";
    var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < l; i++) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
}


