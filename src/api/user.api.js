import {API, URL_API} from './const.api'

export const UserAPI = {
	getUser: (page, limit) => {
		const queryParam = `?_page=${page}&_limit=${limit}`;
		return API.get(`${URL_API}/users${queryParam}`)
	},
	updateUser: (id,data) => API.patch(`${URL_API}/users`, id, data),
	searchUser:(value) => API.get(`${URL_API}/users?q=${value}`),
	deleteUser:(id) => API.delete(`${URL_API}/users`, id)
}