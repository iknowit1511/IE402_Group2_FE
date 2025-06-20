import api from "./axiosConfig";

const getTourDetail = async (id) => {
    try {
        const response = await api.get(`/tours/${id}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Ném lỗi để xử lý ở cấp cao hơn nếu cần
    }
}

export default getTourDetail;