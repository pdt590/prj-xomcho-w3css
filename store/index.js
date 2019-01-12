import Vuex from 'vuex'

import item from './item'
import shop from './shop'
import user from './user'
import shared from './shared'

export default () => {
    return new Vuex.Store({
        modules: {
            item: item,
            shop: shop,
            user: user,
            shared: shared
        }        
    })
}