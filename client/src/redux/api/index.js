import axios from 'axios'

const API = axios.create({baseURL: 'https://e-tapon-project.herokuapp.com/'})

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
});

export const getUsers = () => API.get(`/users`)
export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)
export const activate = (token) => API.post( `/users/${token}`)
export const updateUser = (updated) => API.patch(`users/update`, updated)
export const deleteUser = (deleted) => API.patch(`users/delete`, deleted)
export const updateImage = (image) => API.patch(`users/updateImage`, image)
export const updateCredentials = (credentials) => API.patch(`users/updateCredentials`, credentials)
export const changePassword = (password) => API.patch(`users/changePassword`, password)

export const getSchedules = (page) => API.get(`/schedules?page=${page}`)
export const getSchedule = (id) => API.get(`/schedules/${id}`)
export const createSchedule = (newSchedule) => API.post(`/schedules`, newSchedule)
export const updateSchedule = (id, schedule) => API.patch(`/schedules/${id}`, schedule)
export const deleteSchedule = (id) => API.delete(`/schedules/${id}`)
export const getSchedulesBySearch = (searchQuery) => API.get(`/schedules/search?searchQuery=${searchQuery.scheduleName || 'none'}`)

export const getBarangays = () => API.get('/barangays')
export const getCollectors = () => API.get('/users/collectors')

export const getAnnouncements = (page) => API.get(`/announcements?page=${page}`)
export const createAnnouncement = (announcement) => API.post(`/announcements`, announcement)
export const updateAnnouncement = (id, announcement) => API.patch(`/announcements/${id}`, announcement)
export const deleteAnnouncement = (id) => API.delete(`/announcements/${id}`)
export const getAnnouncementsBySearch  = (searchQuery) => API.get(`announcements/search?searchQuery=${searchQuery.announcementName || 'none'}`)

export const getBiodegradableThisMonth = () => API.get(`/collections/getBiodegradableThisMonth`)
export const getNonBiodegradableThisMonth = () => API.get(`collections/getNonBiodegradableThisMonth`)
export const getRecyclableThisMonth = () => API.get(`collections/getRecyclableThisMonth`)