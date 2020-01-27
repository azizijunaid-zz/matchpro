import ConnectyCube from 'connectycube-reactnative'
import { AsyncStorage } from 'react-native'
import CurrentUser from './CurrentUserDataService'
import UserModel from '../utils/store/models/User'
import Contacts from './ContactsDataService';
import request from "../utils/request";

class UserService {
	signin(params) {
		return new Promise((resolve, reject) => {
			this.createSession(params)
				.then(session => {
					const user = session.user
					user.password = params.password
					CurrentUser.set(user)
					resolve(user)
				})
				.catch(error => reject(error))
		})
	}

	signup(params) {
		return new Promise((resolve, reject) => {
			this.createSession()
				.then(() => this.register(params))
				.then(() => this.login(params))
				.then(user => {
					user.password = params.password
					CurrentUser.set(user)
					resolve(user)
				})
				.catch(error => reject(error))
		})
	}

	autologin() {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await CurrentUser.get()

				if (!data) reject()

				this.signin({ email: data.email, password: data.password })
					.then(user => resolve(user))
					.catch(error => reject(error))
			} catch (error) {
				reject(error)
			}
		})
	}

	resetPassword(email) {
		return new Promise((resolve, reject) => {
			ConnectyCube.users.resetPassword(email, error => {
				error ? reject(error) : resolve()
			})
		})
	}

	logout() {
		return new Promise((resolve, reject) => {
			ConnectyCube.logout(error => {
				if (error) {
					reject(error)
				} else {
					ConnectyCube.chat.disconnect()
					AsyncStorage.clear().then(resolve)
				}
			})
		})
	}

	createSession(user) {
		return new Promise((resolve, reject) => {
			const cb = (error, session) => {
				session ? resolve(session) : reject(error)
			}

			const params = user ? [user, cb] : [cb]

			ConnectyCube.createSession(...params)
		})
	}


    getCurrentSession(user) {
        return new Promise((resolve, reject) => {
            const cb = (error, session) => {
                session ? resolve(session) : reject(error)
            };

            ConnectyCube.getSession(cb)
        })
    }


	login(params) {
		return new Promise((resolve, reject) => {
			ConnectyCube.login(params, (error, user) => {
				error ? reject(error) : resolve(user)
			})
		})
	}

	register(params) {
		return new Promise((resolve, reject) => {
			ConnectyCube.users.signup(params, (error, user) => {
				error ? reject(error) : resolve(user)
			})
		})
	}

	getUserById(id) {
		return new Promise((resolve, reject) => {
			ConnectyCube.users.get(id, (error, user) => {
				error ? reject(error) : resolve(user)
			})
		})
	}

	listUsers(params) {
		return new Promise((resolve, reject) => {
			ConnectyCube.users.get(params, (error, result) => {
				if (!error && result) {
					const users = result.items

					let conatcts = {}

					for (let i = 0; i < users.length; i++) {
						let user = new UserModel(users[i].user)

						if (CurrentUser.getProp('id') === user.id) {
							continue
						}

						conatcts[user.id] = user
					}

					Contacts.set(conatcts)

					resolve(conatcts)
				} else if (error.code === 404) {
					resolve({})
				} else {
					reject(error)
				}
			})
		})
	}

	listUsersByIds(ids) {
		return new Promise((resolve, reject) => {
			this.listUsers({
				per_page: 100,
				filter: {
					field: 'id',
					param: 'in',
					value: ids || '',
				},
			})
				.then(users => resolve(users))
				.catch(error => reject(error))
		})
	}

	listUsersByFullName(name) {
		return new Promise((resolve, reject) => {
			this.listUsers({ per_page: 100, full_name: name })
				.then(users => resolve(Object.values(users)))
				.catch(error => reject(error))
		})
	}

	updateProfile(params){
        return new Promise((resolve, reject) => {
            ConnectyCube.users.update(params, (error, result) => {
                if (!error && result) {
                    resolve(result)
                } else if (error.code === 404) {
                    resolve({})
                } else {
                    reject(error)
                }
            })
        })



	}

	 updateAvatar(inputFile){
        return new Promise((resolve, reject) => {
            const fileParams = {name: inputFile.fileName, file: inputFile, type: inputFile.type, size: inputFile.fileSize, 'public': true};

            ConnectyCube.storage.createAndUpload(fileParams, async (error, result) => {
                if (!error && result) {

                    const fileURL = await ConnectyCube.storage.privateUrl(result.uid);

                    const updatedUserProfile = {
                        'avatar': result.uid
                    };

                	this.updateProfile(updatedUserProfile).then(res => {
                        resolve(res)
					});


                } else if (error.code === 404) {
                    resolve({})
                } else {
                    reject(error)
                }
            })
        })



	}


    getLikes(){
        return request({
            url:    `/likes`,
            method: 'GET',
        });
    }



	like(data){
        return request({
            url:    `/like`,
            method: 'POST',
            params: data,
        });
    }

    matches(){
        return request({
            url:    `/matches`,
            method: 'GET',
        });
    }

	discover(){
        return request({
            url:    `/discover`,
            method: 'GET',
        });
	}

	updateLocation(data){
        return request({
            url:    `/location`,
            method: 'POST',
            params: data,
        });
	}
}

// create instance
const User = new UserService();

// lock instance
Object.freeze(User);

export default User
