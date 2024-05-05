import { BASE_URL } from './index'

export class Fetcher{
    constructor (){
        this.baseURL = `${BASE_URL}`
    }

    async makeRequest (endpoint, method='GET', data=null, token=null){
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`,
        }

        const requestOptions = {
            method,
            headers,
            body: data ? JSON.stringify(data) : null,
        }

        try{
            const response = await fetch(`${this.baseURL}/${endpoint}`, requestOptions)
            const data     = await response.json()

            return data
        }
        catch (error){
            throw (error)
        }
    }

    // Auth
    async register (data) {
        return await this.makeRequest('driver/auth/register', 'POST', data)
    }

    async sendSMS (data) {
        return await this.makeRequest('driver/auth/sms', 'POST', data)
    }

    async verify (data) {
        return await this.makeRequest('driver/auth/verify', 'POST', data)
    }
    
    async login (data) {
        return await this.makeRequest('auth/login', 'POST', data)
    }

    // User
    async readUser (id, token) {
        return await this.makeRequest(`users/${id}`, 'GET', null, token)
    }

    async readUsers (token) {
        return await this.makeRequest('users', 'GET', null, token)
    }
 
    async createUser (data, token) {
        return await this.makeRequest('users', 'POST', data, token)
    }

    async updateUser (id, data, token) {
        return await this.makeRequest(`users/${id}`, 'PUT', data, token)
    }

    async deleteUser (id, token) {
        return await this.makeRequest(`users/${id}`, 'DELETE', null, token)
    }

    // Profile
    async readProfile (id, token) {
        return await this.makeRequest(`profiles/${id}`, 'GET', null, token)
    }

    async readProfiles (token) {
        return await this.makeRequest('profiles/', 'GET', null, token)
    }
    
    async createProfile (id, data, token) {
        return await this.makeRequest(`profiles/${id}`, 'POST', data, token)
    }

    async updateProfile (id, data, token) {
        return await this.makeRequest(`profiles/${id}`, 'PUT', data, token)
    }

    async deleteProfile (id, token) {
        return await this.makeRequest(`profiles/${id}`, 'DELETE', null, token)
    }
}