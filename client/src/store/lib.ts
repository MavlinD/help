import {Cookies, LoadingBar} from "quasar"
import axios from "axios"
import {trycatch} from '@/javascript-decorators'
import {myNotify} from '@/components/basis'

const {VITE_token_name, VITE_api_server_name, VITE_api_ext_port} = import.meta.env
/**
 * примесь всех экшен классов стора
 */
export class Transport {

	token = Cookies.get(String(VITE_token_name))

	transport = axios.create({
		baseURL: `http://${VITE_api_server_name}:${VITE_api_ext_port}/api/`,
		headers: {
			'Content-Type': 'application/json',
		},
	})

	/**
	 * авторизует, запросы PUT, PATCH, DELETE авторизованы по умолчанию
	 */
	authorize(){
		this.transport.defaults.headers['Authorization'] = `token ${this.token}`
	}

	before(){
		LoadingBar.start()
	}

	after(){
		LoadingBar.stop()
	}

	@trycatch(myNotify)
	async get(arg){
		// console.log(arg)
		this.before()
		let resp = await this.transport.get(arg)
		this.after()
		return resp
	}

	@trycatch(myNotify)
	async post(arg, params){
		// console.log(arg)
		this.before()
		let resp = await this.transport.post(arg, params)
		this.after()
		return resp
	}

	@trycatch(myNotify)
	async put(arg, params){
		// console.log(arg)
		// console.log(params)
		this.authorize()
		this.before()
		let resp = await this.transport.put(arg, params)
		this.after()
		return resp
	}

	@trycatch(myNotify)
	async patch(arg, params){
		// console.log(arg)
		// console.log(params)
		this.authorize()
		this.before()
		let resp = await this.transport.patch(arg, params)
		this.after()
		return resp
	}

	@trycatch(myNotify)
	async delete(arg){
		// console.log(arg)
		this.authorize()
		this.before()
		let resp = await this.transport.delete(arg)
		this.after()
		return resp
	}

}
