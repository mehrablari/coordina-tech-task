import axios from "axios";
import get30DaysBefore from "../utils/helper.utils";

const API_BASE_URL = "https://api.themoviedb.org/3/discover"; 

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`
  },
});

// API Endpoints
const API_URLS = {
  getMovies: "/movie",
};

// API Wrapper Functions
const Api = {
  getMovies: async (page = 1) => {
    try {
      const date = get30DaysBefore()
      const url = API_URLS.getMovies + `?page=${page}&primary_release_date.gte=${date}&include_video=true&language=en-US&sort_by=popularity.desc`
      console.log(url)
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
};


const handleApiError = (error) => {
  if (error.response) {
    console.error(
      `API Error: ${error.response.status} - ${error.response.data.message}`
    );
    throw new Error(error.response.data.message || "API request failed.");
  } else if (error.request) {
    console.error("API Error: No response received from server.");
    throw new Error("No response received from server.");
  } else {
    console.error("API Error:", error.message);
    throw new Error(error.message || "Unexpected error occurred.");
  }
};

export default Api;