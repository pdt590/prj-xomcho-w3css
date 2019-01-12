import firebase from '~/plugins/firebase'
const db = firebase.database()
const usersRef = db.ref('users')

export default {
    state: {
        sideBar: false
    },
    mutations: {
        setSideBar (state, payload) {
            state.sideBar = payload
        }
    },
    actions: {
        // nuxtServerInit should be only used for authentication
        async nuxtServerInit (vuexContext, { req, error }) {
            try {
                let uid
                let expirationDate
                if (req) {
                    if (!req.headers.cookie) {
                        await vuexContext.dispatch("logOut") // * Logout because `user` is still available in store at server side
                        return
                    }
                    let reqCookie = req.headers.cookie.split(";")
                    
                    let isUid =   reqCookie.find(c => c.trim().startsWith("uid="));
                    if(!isUid) { 
                        await vuexContext.dispatch("logOut")
                        return 
                    }
                    uid            = reqCookie.find(c => c.trim().startsWith("uid=")).split("=")[1]
                    expirationDate = reqCookie.find(c => c.trim().startsWith("expirationDate=")).split("=")[1]
                }
                if (new Date().getTime() > +expirationDate || !uid) {
                    console.log("Invalid uid")
                    await vuexContext.dispatch("logOut")
                    return
                }
                const userData = await usersRef.child(uid).once('value')
                const userObj = userData.val()
                const userProfile = {
                    id: uid,
                    ...userObj
                }
                vuexContext.commit('setUser', userProfile)
            }catch (e) {
                vuexContext.commit('setAuthError', e)
                console.log('[ERROR] ' + e)
                error({ statusCode: 500, message: '...Lỗi' })
            } 
        },
        openSideBar (vuexContext, payload) {
            vuexContext.commit('setSideBar', payload)
        }
    },
    getters: {
        sideBar(state) {
            return state.sideBar
        }
    }
}