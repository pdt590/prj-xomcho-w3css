import firebase from '~/plugins/firebase'
import Cookie from 'js-cookie'
import { uiid } from '~/plugins/funcs'
const db = firebase.database()
const usersRef = db.ref('users')

export default {
    state: {
        authLoading: false,
        authError: null,
        user: null
    },
    mutations: {
        setAuthLoading (state, payload) {
            state.authLoading = payload
        },
        setAuthError (state, payload) {
            state.authError = payload
        },
        clearAuthError (state) {
            state.authError = null
        },
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        clearAuthError (vuexContext) {
            vuexContext.commit('clearAuthError')
        },
        async signUserUp (vuexContext, payload) {
            vuexContext.commit('setAuthLoading', true)
            vuexContext.commit('clearAuthError')
            try {
                const { user } = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                const userProfile = {
                    username: payload.username,
                    fullname: '',
                    email: payload.email,
                    phone:'',
                    facebook: '',
                    address: '',
                    updatedDate: new Date().toISOString()
                }
                await usersRef.child(user.uid).set(userProfile)
                // * persistent storage using cookie (or localstorage or firebase.auth().onAuthStateChanged())
                Cookie.set("uid", user.uid)
                Cookie.set(
                    "expirationDate",
                    new Date().getTime() + (2 * 3600 * 1000) // 2h expired time
                )
                const newUser = {
                    id: user.uid, 
                    ...userProfile
                }
                vuexContext.commit('setUser', newUser)
                vuexContext.commit('setAuthLoading', false)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')

            } catch(error) {
                vuexContext.commit('setAuthError', error)
                vuexContext.commit('setAuthLoading', false)
                console.log('[ERROR] ' + error)
            }
        },
        async signUserIn (vuexContext, payload) {
            vuexContext.commit('setAuthLoading', true)
            vuexContext.commit('clearAuthError')
            try {
                const { user } = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                const userData = await usersRef.child(user.uid).once('value') 
                const userObj = userData.val()
                const userProfile = {
                    id: user.uid,
                    ...userObj
                }
                // * persistent storage using cookie (or localstorage or firebase.auth().onAuthStateChanged())
                Cookie.set("uid", user.uid)
                Cookie.set(
                    "expirationDate",
                    new Date().getTime() + (2 * 3600 * 1000) // 2h expired time
                )
                vuexContext.commit('setUser', userProfile)
                vuexContext.commit('setAuthLoading', false)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
            } catch(error) {
                vuexContext.commit('setAuthError', error)
                vuexContext.commit('setAuthLoading', false)
                console.log('[ERROR] ' + error)
            }
        },
        initAuth (vuexContext) {
            let uid = Cookie.get("uid")
            let expirationDate = Cookie.get("expirationDate")
            if (new Date().getTime() > +expirationDate || !uid) {
                console.log("No token or invalid token")
                vuexContext.dispatch("logOut")
                return
            }
            // re-new expirationDate
            Cookie.set(
                "expirationDate",
                new Date().getTime() + (2 * 3600 * 1000) // 1h expired time
            )
        },
        async logOut (vuexContext) {
            await firebase.auth().signOut()
            Cookie.remove("uid")
            Cookie.remove("expirationDate")
            vuexContext.commit('setUser', null)
            if(process.client) {
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
            }
        },
        async isUnique (vuexContext, payload) {
            const item = await usersRef.orderByChild('email').equalTo(payload).once('value')
            if(item.val()) return false
            return true
        },
        async updateUserInfo (vuexContext, editedUser) {
            vuexContext.commit('setAuthLoading', true)
            try{
                const updatedUser = {
                    ...editedUser,
                    id: null,
                    updatedDate: new Date().toISOString()
                }
                await usersRef.child(editedUser.id).update(updatedUser)
                updatedUser.id = editedUser.id
                vuexContext.commit('setUser', updatedUser)
                vuexContext.commit('setAuthLoading', false)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
            } catch(error){
                vuexContext.commit('setAuthLoading', false)
                console.log('[ERROR] ' + error)
            }
        },
        async updateEmail (vuexContext, editedUser) {
            vuexContext.commit('setAuthLoading', true)
            try{
                const user = firebase.auth().currentUser //? Error
                await user.updateEmail(editedUser.email)
                const updatedUser = {
                    ...editedUser,
                    id: null,
                    updatedDate: new Date().toISOString()
                }
                await usersRef.child(editedUser.id).update(updatedUser)
                updatedUser.id = editedUser.id
                vuexContext.commit('setUser', updatedUser)
                vuexContext.commit('setAuthLoading', false)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
            } catch(error){
                vuexContext.commit('setAuthLoading', false)
                console.log('[ERROR] ' + error)
            }
        },
        async updatePassword (vuexContext, editedPassword) {
            vuexContext.commit('setAuthLoading', true)
            try{
                const user = firebase.auth().currentUser
                const editedUser = vuexContext.getters.user
                await user.updatePassword(editedPassword)
                const updatedUser = {
                    updatedDate: new Date().toISOString()
                }
                await usersRef.child(editedUser.uid).update(updatedUser)
                vuexContext.commit('setAuthLoading', false)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
            } catch(error){
                vuexContext.commit('setAuthLoading', false)
                console.log('[ERROR] ' + error)
            }
        },
        async updateAvatar (vuexContext, newAvatar) {
            vuexContext.commit('setAuthLoading', true)
            try {
                const editedUser = vuexContext.getters.user
                const userId = editedUser.id
                let avatarObject = null
                const oldAvatarObject = editedUser.avatar
                const storageMetadata = {
                    cacheControl: 'public,max-age=31536000',
                }
                if(oldAvatarObject === undefined && newAvatar === null) {
                    vuexContext.commit('setAuthLoading', false)
                    return
                }else if(oldAvatarObject !== undefined && newAvatar === null) {
                    await firebase.storage().ref('users/' + oldAvatarObject.metadata.name).delete()
                }else if(oldAvatarObject === undefined && newAvatar !== null) {
                    const ext = newAvatar.name.slice(newAvatar.name.lastIndexOf('.'))
                    const newImgName = uiid(15) + ext
                    const metaData = { 
                        name: newImgName, 
                        size: newAvatar.size,
                        creatorId: userId
                    }
                    await firebase.storage().ref('users/' + newImgName).put(newAvatar, storageMetadata)
                    const avatarDownloadUrl = await firebase.storage().ref('users/' + newImgName).getDownloadURL()
                    avatarObject = {
                        metadata: metaData,
                        url: avatarDownloadUrl
                    }
                }else if(oldAvatarObject !== undefined && newAvatar !== null){
                    if(newAvatar.url === undefined) {
                        await firebase.storage().ref('users/' + oldAvatarObject.metadata.name).delete()
                        const ext = newAvatar.name.slice(newAvatar.name.lastIndexOf('.'))
                        const newImgName = uiid(15) + ext
                        const metaData = { 
                            name: newImgName, 
                            size: newAvatar.size,
                            creatorId: userId
                        }
                        await firebase.storage().ref('users/' + newImgName).put(newAvatar, storageMetadata)
                        const avatarDownloadUrl = await firebase.storage().ref('users/' + newImgName).getDownloadURL()
                        avatarObject = {
                            metadata: metaData,
                            url: avatarDownloadUrl
                        }
                    }else {
                        vuexContext.commit('setAuthLoading', false)
                        return
                    }
                }
                const update = {
                    avatar: avatarObject,
                    updatedDate: new Date().toISOString()
                }
                await usersRef.child(userId).update(update)
                const updatedUser = {
                    ...editedUser,
                    ...update
                }
                if(!updatedUser.avatar) delete updatedUser.avatar
                vuexContext.commit('setUser', updatedUser)
                vuexContext.commit('setAuthLoading', false)
                localStorage.setItem('auth-event', '')
                localStorage.removeItem('auth-event')
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setAuthLoading', false)
            }
        },
        async deleteUser (vuexContext, deletedUser) {
            vuexContext.commit('setAuthLoading', true)
            try{
                const user = firebase.auth().currentUser;
                await user.delete()
                await usersRef.child(deletedUser.id).remove()
                Cookie.remove("uid")
                Cookie.remove("expirationDate")
                vuexContext.commit('setAuthLoading', false)
                if(process.client) {
                    localStorage.setItem('auth-event', '')
                    localStorage.removeItem('auth-event')
                }
            } catch(error){
                vuexContext.commit('setAuthLoading', false)
                console.log('[ERROR] ' + error)
            }  
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        authError(state) {
            return state.authError
        },
        authLoading(state) {
            return state.authLoading
        }
    }
}