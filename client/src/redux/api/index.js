import axios from 'axios'

const API = axios.create({baseURL: 'https://e-tapon-project.herokuapp.com'})
// const API = axios.create({baseURL: 'http://localhost:5000'})


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
export const getUserStreets = () => API.get(`users/userStreets`)

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

export const getRecyclablesToday = () =>  API.get(`/collections/getRecyclablesToday`)
export const getBiodegradablesToday = () => API.get(`/collections/getBiodegradablesToday`)
export const getNonBiodegradablesToday = () => API.get(`/collections/getNonBiodegradablesToday`)
export const getTotalPerStreetToday = () => API.get(`/collections/getTotalToday`)

export const getBiodegradableDynamic = (filter) => API.post(`/collections/getBiodegradableDynamic`, filter)
export const getBiodegradablesThisMonth = () => API.get(`/collections/getBiodegradablesThisMonth`)
export const getBiodegradablesThisYear = () => API.get(`/collections/getBiodegradablesThisYear`)
export const getBiodegradableSorted = () => API.get(`/collections/getBiodegradableSorted`)

export const getNonBiodegradableDynamic = (filter) => API.post(`/collections/getNonBiodegradableDynamic`, filter)
export const getNonBiodegradablesThisMonth = () => API.get(`/collections/getNonBiodegradablesThisMonth`)
export const getNonBiodegradablesThisYear = () => API.get(`/collections/getNonBiodegradablesThisYear`)
export const getNonBiodegradableSorted = () => API.get(`/collections/getNonBiodegradableSorted`)

export const getRecyclableDynamic = (filter) => API.post(`/collections/getRecyclableDynamic`, filter)
export const getRecyclablesThisMonth = () => API.get(`/collections/getRecyclablesThisMonth`)
export const getRecyclablesThisYear = () => API.get(`/collections/getRecyclablesThisYear`)
export const getRecyclableSorted = () => API.get(`/collections/getRecyclableSorted`)

export const getCollectedToday = () =>  API.get(`/collections/getCollectedToday`)
export const getCollectedThisMonth = () => API.get(`/collections/getCollectedThisMonth`)
export const getCollectedThisYear = () => API.get(`/collections/getCollectedThisYear`)
export const getCollectedSorted = () => API.get(`/collections/getCollectedSorted`)
export const getCollectedWasteType = (filter) => API.post(`collections/getCollectedWasteType`, filter)

export const getCollectedTimeFrame = (filter) => API.post(`/collections/getCollectedTimeFrame`, filter)
export const getBiodegradableTimeFrame = (filter) => API.post(`/collections/getBiodegradableTimeFrame`, filter)
export const getNonBiodegradableTimeFrame = (filter) => API.post(`/collections/getNonBiodegradableTimeFrame`, filter)
export const getRecyclableTimeFrame = (filter) => API.post(`/collections/getRecyclableTimeFrame`, filter)

export const getSchedToday = () => API.get(`/schedules/getSchedToday`)
export const getResidentCount = () => API.get(`/users/getResidentCount`)

export const getBiodegradableTodayReport = () => API.get(`/collections/getBiodegradableTodayReport`)
export const getNonBiodegradableTodayReport = () => API.get(`/getNonBiodegradableTodayReport`)
export const getRecyclableTodayReport = () => API.get(`/getNonBiodegradableTodayReport`)