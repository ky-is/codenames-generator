import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
	register(`${process.env.BASE_URL}service-worker.js`, {
		updated () {
			console.log('New content is available; please refresh.')
		},
		error (error) {
			console.error('Error during service worker registration:', error)
		},
	})
}
