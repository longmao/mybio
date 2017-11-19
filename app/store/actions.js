import * as types from './mutation-types'
import userAPI from '../api/user'
import offerAPI from '../api/offer'



export const logOut = ({ commit, state }, payload) => {
    userAPI.logOut(data => {
        if (data && data.flag === "success") {
            commit(types.USER_LOGOUT)
        }
        if(data.data && data.data.billing_logout_url) {
            commit(types.BILLING_LOGOUT, data.data.billing_logout_url)
        }
        payload && payload()
    })
}

export const getUserInfo = ({ commit, state }, payload) => {
    userAPI.getUserInfo(data => {
        if (data && data.flag === "success") {
            commit(types.USER_INFO_FETCHED, data.data)
        }
    })
}


export const getOfferInfo = ({ commit, state }, payload) => {
    offerAPI.getOfferInfo(payload, data => {
        if (data && data.flag === "success") {
            commit(types.OFFER_INFO_FETCHED, data.data)
            payload.cb && payload.cb()
        } else{
            commit(types.OFFER_INFO_FETCHED, {})
            payload.cb && payload.cb({},data)
        }
    })
}
export const setOfferInfo = ({ commit, state }, payload) => {
    commit(types.OFFER_INFO_UPDATED, payload)
}

export const setUnreadMessageCount = ({ commit, state }, payload) => {
    commit(types.GET_UNREAD_MESSAGE, payload)
}

export const getAffAccess = ({ commit, state }, payload) => {
    offerAPI.getAffAccess(payload, data => {
        if (data && data.flag === "success") {
            commit(types.AFFACCESS_INFO_FETCHED, data.data)
            payload.cb && payload.cb()
        } else{
            commit(types.AFFACCESS_INFO_FETCHED, [])
            payload.cb && payload.cb([])
        }
    })
}

export const getAppAccess = ({ commit, state }, payload) => {
    offerAPI.getAccessApps(payload, data => {
        if (data && data.flag === "success") {
            commit(types.APP_INFO_FETCHED, data)

            payload.cb && payload.cb()
        } else{
            commit(types.APP_INFO_FETCHED, [])
            payload.cb && payload.cb([])
        }
    })
}

export const getActiveUser = ({ commit, state }, payload) => {
    offerAPI.getActiveUser(payload, data => {
        if (data && data.flag === "success") {
            commit(types.ACTIVE_USER_INFO_FETCHED, data.data || [])
            payload.cb && payload.cb()
        } else{
            commit(types.ACTIVE_USER_INFO_FETCHED, [])
            payload.cb && payload.cb([])
        }
    })
}
export const setUserInfo = ({ commit, state }, payload) => {
    commit(types.USER_INFO_UPDATED, payload)
}

export const addAdvInfo = ({ commit, state }, payload) => {
    commit(types.ADV_INFO_UPDATED, payload)
}

export const getPmNotice = ({ commit, state }, payload) => {
    userAPI.getPmNotice(data => {
        if (data && data.flag === "success") {
            commit(types.PM_NOTICE_FETCHED, data.data)
        }
    })
}

export const getUserRole = ({ commit, state }, payload) => {
    userAPI.getUserRole(data => {
        if (data.flag === "success") {
            commit(types.USER_ROLE_FETCHED, data.data)
        }
    })
}

export const getCookieHash = ({ commit, state }, payload) => {
    userAPI.getCookieHash(data => {
        if (data.flag === "success") {
            commit(types.GET_COOKIE_HASH, data.data)
        }
    })
}

