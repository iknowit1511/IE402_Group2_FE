import axios from "axios";

export default class ApiService {
    static BASE_URL = "http://localhost:8080";

    /**
     * Get headers with JWT token and content type
     * @returns {Object} Headers object
     */
    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
    }

    /** AUTH */
    /**
     * Register a new user
     * @param {Object} userDTO - User registration data
     * @returns {Promise<Object>} Response data
     */
    static async registerUser(userDTO) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/register`, userDTO);
            return response.data;
        } catch (error) {
            throw new Error(`Registration failed: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Login user
     * @param {Object} loginDetails - Login credentials { userEmail, userPassword }
     * @returns {Promise<Object>} Response data with token
     */
    static async loginUser(loginDetails) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.userRole);
            }
            return response.data;
        } catch (error) {
            throw new Error(`Login failed: ${error.response?.data?.message || error.message}`);
        }
    }

    /** USERS */
    /**
     * Get all users (admin only)
     * @returns {Promise<Object>} Response data
     */
    static async getAllUsers() {
        try {
            const response = await axios.get(`${this.BASE_URL}/user/all`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch users: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Get user by ID
     * @param {number} userId - User ID
     * @returns {Promise<Object>} Response data
     */
    static async getUser(userId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/user/${userId}`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch user: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Update user profile
     * @param {number} userId - User ID
     * @param {Object} userDTO - User update data
     * @returns {Promise<Object>} Response data
     */
    static async updateUserProfile(userId, userDTO) {
        try {
            const response = await axios.put(`${this.BASE_URL}/user/update/${userId}`, userDTO, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Delete user
     * @param {number} userId - User ID
     * @returns {Promise<Object>} Response data
     */
    static async deleteUser(userId) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/user/delete/${userId}`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to delete user: ${error.response?.data?.message || error.message}`);
        }
    }

    /** TOURS */
    /**
     * Create a new tour
     * @param {Object} tourDTO - Tour data
     * @returns {Promise<Object>} Response data
     */
    static async createTour(tourDTO) {
        try {
            const response = await axios.post(`${this.BASE_URL}/tour/create`, tourDTO, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to create tour: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Get tour by ID
     * @param {number} tourId - Tour ID
     * @returns {Promise<Object>} Response data
     */
    static async getTourById(tourId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/tour/${tourId}`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch tour: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Get all tours
     * @returns {Promise<Object>} Response data
     */
    static async getAllTours() {
        try {
            const response = await axios.get(`${this.BASE_URL}/tour/all`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch tours: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Update tour
     * @param {number} tourId - Tour ID
     * @param {Object} tourDTO - Tour update data
     * @returns {Promise<Object>} Response data
     */
    static async updateTour(tourId, tourDTO) {
        try {
            const response = await axios.put(`${this.BASE_URL}/tour/update/${tourId}`, tourDTO, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update tour: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Delete tour
     * @param {number} tourId - Tour ID
     * @returns {Promise<Object>} Response data
     */
    static async deleteTour(tourId) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/tour/delete/${tourId}`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to delete tour: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Add itinerary to tour
     * @param {number} tourId - Tour ID
     * @param {Object} itineraryRequest - Itinerary data
     * @returns {Promise<Object>} Response data
     */
    static async addItineraryToTour(tourId, itineraryRequest) {
        try {
            const response = await axios.post(`${this.BASE_URL}/tour/${tourId}/itineraries`, itineraryRequest, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to add itinerary: ${error.response?.data?.message || error.message}`);
        }
    }

    /** BOOKINGS */
    /**
     * Create a new booking
     * @param {number} userId - User ID
     * @param {number} scheduleId - Schedule ID
     * @param {Object} bookingDTO - Booking data
     * @returns {Promise<Object>} Response data
     */
    static async createBooking(userId, scheduleId, bookingDTO) {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/booking/create/${userId}/${scheduleId}`,
                bookingDTO,
                { headers: this.getHeader() }
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to create booking: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Get booking by ID
     * @param {number} bookingId - Booking ID
     * @returns {Promise<Object>} Response data
     */
    static async getBookingById(bookingId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/booking/${bookingId}`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch booking: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Get all bookings
     * @returns {Promise<Object>} Response data
     */
    static async getAllBookings() {
        try {
            const response = await axios.get(`${this.BASE_URL}/booking/all`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch bookings: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Update booking
     * @param {number} bookingId - Booking ID
     * @param {Object} bookingDTO - Booking update data
     * @returns {Promise<Object>} Response data
     */
    static async updateBooking(bookingId, bookingDTO) {
        try {
            const response = await axios.put(`${this.BASE_URL}/booking/update/${bookingId}`, bookingDTO, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update booking: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Delete booking
     * @param {number} bookingId - Booking ID
     * @returns {Promise<Object>} Response data
     */
    static async deleteBooking(bookingId) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/booking/delete/${bookingId}`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to delete booking: ${error.response?.data?.message || error.message}`);
        }
    }

    /** PAYMENT */
    /**
     * Confirm payment
     * @param {Object} paymentDTO - Payment data { bookingId, paymentMethod, paymentAmount }
     * @returns {Promise<Object>} Response data
     */
    static async confirmPayment(paymentDTO) {
        try {
            const response = await axios.post(`${this.BASE_URL}/pay/confirm`, paymentDTO, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to confirm payment: ${error.response?.data?.message || error.message}`);
        }
    }

    /** MAP */
    /**
     * Get all locations
     * @returns {Promise<Object>} Response data
     */
    static async getAllLocations() {
        try {
            const response = await axios.get(`${this.BASE_URL}/map/locations`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch locations: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Get all routes
     * @returns {Promise<Object>} Response data
     */
    static async getAllRoutes() {
        try {
            const response = await axios.get(`${this.BASE_URL}/map/routes`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch routes: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Get all zones
     * @returns {Promise<Object>} Response data
     */
    static async getAllZones() {
        try {
            const response = await axios.get(`${this.BASE_URL}/map/zones`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch zones: ${error.response?.data?.message || error.message}`);
        }
    }

    /** AUTHENTICATION */
    /**
     * Logout user
     */
    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    /**
     * Check if user is authenticated
     * @returns {boolean} True if authenticated
     */
    static isAuthenticated() {
        return !!localStorage.getItem("token");
    }

    /**
     * Check if user is admin
     * @returns {boolean} True if admin
     */
    static isAdmin() {
        return localStorage.getItem("role") === "ADMIN";
    }

    /**
     * Check if user is regular user
     * @returns {boolean} True if user
     */
    static isUser() {
        return localStorage.getItem("role") === "USER";
    }
}
