import firebase from '~/plugins/firebase'
import { uuid, uiid } from '~/plugins/funcs'
const db = firebase.database()
const shopsRef = db.ref('shops')

export default {
    state: {
        shopLoading: false,
        loadedShop: null
    },
    mutations: {
        setShopLoading (state, payload) {
            state.shopLoading = payload
        },
        setShop (state, payload) {
            state.loadedShop = payload
        }
    },
    actions: { 
        async addShop (vuexContext, payload) {
            vuexContext.commit('setShopLoading', true)
            try {
                const userId = vuexContext.getters.user.id
                const shop = payload.shop
                const newUnUploadedLogo = payload.logo
                const newUnUploadedImages = payload.images
                let logoObject = null
                const newUploadedImageObjects = []

                const storageMetadata = {
                    cacheControl: 'public,max-age=31536000',
                }
                const shopId = uuid(shop.title, 5)
                if(newUnUploadedLogo) {
                    const ext = newUnUploadedLogo.name.slice(newUnUploadedLogo.name.lastIndexOf('.'))
                    const newImgName = uiid(15) + ext
                    const metaData = { 
                        name: newImgName, 
                        size: newUnUploadedLogo.size, 
                        creatorId: userId, 
                        shopId: shopId
                    }
                    await firebase.storage().ref('logos/' + newImgName).put(newUnUploadedLogo, storageMetadata)
                    const logoDownloadUrl = await firebase.storage().ref('logos/' + newImgName).getDownloadURL()
                    logoObject = {
                        url: logoDownloadUrl, 
                        metadata: metaData
                    }
                }
                if(newUnUploadedImages.length) {
                    for (const image of newUnUploadedImages) {
                        const ext = image.name.slice(image.name.lastIndexOf('.'))
                        const newImgName = uiid(15) + ext
                        const metaData = { 
                            name: newImgName, 
                            size: image.size, 
                            creatorId: userId,
                            shopId: shopId
                        }
                        await firebase.storage().ref('shops/' + newImgName).put(image, storageMetadata)
                        const imgDownloadUrl = await firebase.storage().ref('shops/' + newImgName).getDownloadURL()
                        newUploadedImageObjects.push({
                            url: imgDownloadUrl, 
                            metadata: metaData
                        })
                    }
                }
                const newShop = {
                    ...shop,
                    logo: logoObject,
                    images: newUploadedImageObjects,
                    creatorId: userId,
                    updatedDate: new Date().toISOString()
                }
                await shopsRef.child(shopId).set(newShop)
                if(!newShop.logo) delete newShop.logo
                if(!newShop.images.length) delete newShop.images
                vuexContext.commit('setShop', {
                    shopId: shopId,
                    ...newShop
                })
                vuexContext.commit('setShopLoading', false)
                return shopId
            } catch (error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async updateShopContent (vuexContext, editedShop) {
            vuexContext.commit('setShopLoading', true)
            try {
                const updatedShop = {
                    ...editedShop,
                    updatedDate: new Date().toISOString()
                }
                await shopsRef.child(editedShop.shopId).update(updatedShop)
                vuexContext.commit('setShop', updatedShop)
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async updateShopTitle (vuexContext, editedShop) {
            vuexContext.commit('setShopLoading', true)
            try {
                const update = {}
                const oldShopId = editedShop.shopId
                const newShopId = uuid(editedShop.title, 5)
                const updatedShop = {
                    ...editedShop,
                    shopId: null, // ? remove shopId prop in the object when uploading to firebase
                    title: editedShop.title,
                    updatedDate: new Date().toISOString()
                }
                update[oldShopId] = null
                update[newShopId] = updatedShop
                await shopsRef.update(update)
                await vuexContext.dispatch('updateItems', {oldShopId: oldShopId, newShopId: newShopId})

                updatedShop.shopId = newShopId
                vuexContext.commit('setShop', updatedShop)
                vuexContext.commit('setShopLoading', false)
                return newShopId
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async updateShopLogo (vuexContext, newLogo) {
            vuexContext.commit('setShopLoading', true)
            try {
                const editedShop = vuexContext.getters.loadedShop
                const shopId = editedShop.shopId
                let logoObject = null
                const oldLogoObject = editedShop.logo
                const storageMetadata = {
                    cacheControl: 'public,max-age=31536000',
                }
                if(oldLogoObject === undefined && newLogo === null) {
                    vuexContext.commit('setShopLoading', false)
                    return
                }else if(oldLogoObject !== undefined && newLogo === null) {
                    await firebase.storage().ref('logos/' + oldLogoObject.metadata.name).delete()
                }else if(oldLogoObject === undefined && newLogo !== null) {
                    const ext = newLogo.name.slice(newLogo.name.lastIndexOf('.'))
                    const newImgName = uiid(15) + ext
                    const metaData = { 
                        name: newImgName, 
                        size: newLogo.size, 
                        creatorId: vuexContext.getters.user.id, 
                        shopId: shopId
                    }
                    await firebase.storage().ref('logos/' + newImgName).put(newLogo, storageMetadata)
                    const logoDownloadUrl = await firebase.storage().ref('logos/' + newImgName).getDownloadURL()
                    logoObject = {
                        metadata: metaData,
                        url: logoDownloadUrl
                    }
                }else if(oldLogoObject !== undefined && newLogo !== null){
                    if(newLogo.url === undefined) {
                        await firebase.storage().ref('logos/' + oldLogoObject.metadata.name).delete()
                        const ext = newLogo.name.slice(newLogo.name.lastIndexOf('.'))
                        const newImgName = uiid(15) + ext
                        const metaData = { 
                            name: newImgName, 
                            size: newLogo.size, 
                            creatorId: vuexContext.getters.user.id, 
                            shopId: shopId
                        }
                        await firebase.storage().ref('logos/' + newImgName).put(newLogo, storageMetadata)
                        const logoDownloadUrl = await firebase.storage().ref('logos/' + newImgName).getDownloadURL()
                        logoObject = {
                            metadata: metaData,
                            url: logoDownloadUrl
                        }
                    }else {
                        vuexContext.commit('setShopLoading', false)
                        return
                    }
                }
                const update = {
                    logo: logoObject,
                    updatedDate: new Date().toISOString()
                }
                await shopsRef.child(shopId).update(update)
                const updatedShop = {
                    ...editedShop,
                    ...update
                }
                if(!updatedShop.logo) delete updatedShop.logo
                vuexContext.commit('setShop', updatedShop)
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async updateShopImg (vuexContext, newImages) {
            vuexContext.commit('setShopLoading', true)
            try {
                const editedShop = vuexContext.getters.loadedShop
                const shopId = editedShop.shopId
                const oldImageObjects = []
                const newUnUploadedImages = []
                const newUploadedImageObjects = []
                const storageMetadata = {
                    cacheControl: 'public,max-age=31536000',
                }
                if(editedShop.images !== undefined) {
                    editedShop.images.forEach (
                        image => oldImageObjects.push(image)
                    )
                }
                if(newImages.length) {
                    newImages.forEach( image => {
                        if(image.url !== undefined) {
                            newUploadedImageObjects.push(image)
                            const index = oldImageObjects.findIndex(oldImage => {
                                return image.url === oldImage.url
                            })
                            if(index >= 0) oldImageObjects.splice(index, 1)
                        }else {
                            newUnUploadedImages.push(image)
                        }
                    })
                    // * delete removed images         
                    if(oldImageObjects.length) {
                        await Promise.all(oldImageObjects.map( async (image) => {
                            await firebase.storage().ref('shops/' + image.metadata.name).delete()
                        }))
                    }
                    if(!newUnUploadedImages.length && !oldImageObjects.length){
                        vuexContext.commit('setShopLoading', false)
                        return
                    }
                    for (const image of newUnUploadedImages) {
                        const ext = image.name.slice(image.name.lastIndexOf('.'))
                        const newImgName = uiid(15) + ext
                        const metaData = { 
                            name: newImgName, 
                            size: image.size, 
                            creatorId: vuexContext.getters.user.id, 
                            shopId: shopId
                        }
                        await firebase.storage().ref('shops/' + newImgName).put(image, storageMetadata)
                        const imgDownloadUrl = await firebase.storage().ref('shops/' + newImgName).getDownloadURL()
                        newUploadedImageObjects.push({url: imgDownloadUrl, metadata: metaData})
                    }
                }
                // ? Console.log run async, it is located at various location an it just prints the final value of a var 
                // ? when it is called in a function
                // ? console.log(oldUploadedImages, newUploadedImageObjects, newUnUploadedImages)
                const update = {
                    images: newUploadedImageObjects,
                    updatedDate: new Date().toISOString()
                }
                await shopsRef.child(shopId).update(update)
                const updatedShop = {
                    ...editedShop,
                    ...update
                }
                if(!updatedShop.images.length) delete updatedShop.images
                vuexContext.commit('setShop', updatedShop)
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async loadShop (vuexContext, shopId) {
            vuexContext.commit('setShopLoading', true)
            try {
                const shopData = await shopsRef.child(shopId).once('value')
                const shopObj = shopData.val()
                const loadedShop = {
                    shopId: shopId,
                    ...shopObj
                }
                vuexContext.commit('setShop', loadedShop)
                vuexContext.commit('setShopLoading', false)
                return loadedShop
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async deleteShop (vuexContext, deletedShop) {
            vuexContext.commit('setShopLoading', true)
            try {
                await vuexContext.dispatch('removeItems', deletedShop.shopId)
                await Promise.all(deletedShop.images.map( async (image) => {
                    await firebase.storage().ref('shops/' + image.metadata.name).delete()
                }))
                await shopsRef.child(deletedShop.shopId).remove()
                vuexContext.commit('setShop', null)
                vuexContext.commit('setShopLoading', false)
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async loadPreviewShops (vuexContext) {
            vuexContext.commit('setShopLoading', true)
            try {
                const shopsData = await shopsRef.orderByChild('updatedDate').limitToLast(45).once('value')         
                const loadedShops = []
                shopsData.forEach(shopData => {
                    const shopObj = shopData.val()
                    loadedShops.push({
                        shopId: shopData.key,
                        ...shopObj
                    })
                })
                loadedShops.reverse()
                vuexContext.commit('setShopLoading', false)
                return loadedShops
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        },
        async loadOwnShops (vuexContext) {
            vuexContext.commit('setShopLoading', true)
            try {
                const creatorId = vuexContext.getters.user.id
                const shopsData = await shopsRef.orderByChild('creatorId').equalTo(creatorId).once('value')     
                const loadedShops = []
                shopsData.forEach(shopData => {
                    const shopObj = shopData.val()
                    loadedShops.push({
                        shopId: shopData.key,
                        ...shopObj
                    })
                })
                loadedShops.reverse()
                vuexContext.commit('setShopLoading', false)
                return loadedShops
            } catch(error) {
                console.log('[ERROR] ' + error)
                vuexContext.commit('setShopLoading', false)
            }
        }
    },
    getters: {
        shopLoading(state) {
            return state.shopLoading
        },
        loadedShop(state) {
            return state.loadedShop
        }
    }
}