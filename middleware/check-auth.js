export default function( context ) {
    // * It can run on both client and server side
    // * It is called by server when refeshing a page and by client when clicking a route
    if(process.client) {
        context.store.dispatch('initAuth') // * Fetch `user` on client side. To fetch `user` on the server side, use nuxtServerInit
    }
}