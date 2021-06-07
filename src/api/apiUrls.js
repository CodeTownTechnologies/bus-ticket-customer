import { BASE_URL } from './constants'

urlBuilder = (url) => {
    return `${BASE_URL}${url}`
}
export default API_URL = {
    login: urlBuilder("login"),
    inbox: urlBuilder(`inbox_message`),
    breakdown: urlBuilder("save_breakdown"),
    getOtp: urlBuilder("customer_forgot_password"),
    checkOtp: urlBuilder("customer_check_otp"),
    updatePassword: urlBuilder("customer_update_password"),
    profileDetail: urlBuilder("customer_profile_detail"),
    currentTripData: urlBuilder("check_current_trip"),
    updateProfile: urlBuilder("update_customer_profile"),
    saveDriverLocation: urlBuilder("save_driver_location"),
    changeDriveringStatus: urlBuilder("change_status"),
    // contactUs: urlBuilder("contact_us"),
    signUp: urlBuilder("signup"),
    getCities: urlBuilder("get_location"),
    searchTrip: urlBuilder("search_trip"),
    tripDetails: urlBuilder("get_search_trip_detail"),
    routeProblem: urlBuilder("route_problem"),
    createBooking: urlBuilder("createBooking"),
    get_location_group: urlBuilder("get_location_group"),
    get_cities_by_group: urlBuilder("get_cities_by_group"),
    get_bus_type: urlBuilder("get_bus_type"),
    update_location_group: urlBuilder("update_location_group"),

}