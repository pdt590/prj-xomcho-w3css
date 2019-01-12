const pkg = require('./package')

module.exports = {
	mode: 'universal',

	/*
	** Headers of the page
	*/
	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito'},
			{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'}
		]
	},

	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#DC143C', height: '6px', duration: 5000 },

	/*
	** Global CSS
	*/
	css: [
        "~assets/styles/w3.css",
        "~assets/styles/dropzone.css",
		"~assets/styles/scrollbar.css",
		"~assets/styles/test.css"
	],

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
        { src: '~plugins/components.js'},
		{ src: '~plugins/date-filter.js'},
		{ src: '~plugins/fb-filter.js'},
		{ src: '~plugins/firebase.js'},
		{ src: '~plugins/auth-listener.js'},
		{ src: '~plugins/test.js'}
	],

	/*
	** Nuxt.js modules
	*/
	modules: [

	],

	/*
	** Global env setting
	*/
	env: {

	},

	/*
	** Add middleware for all routes
	*/
	// router: {
	//   middleware: ['check-auth', 'auth']
	// },

	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend(config, ctx) {

		}
	}
}
