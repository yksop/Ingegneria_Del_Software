import axios from 'axios';
dotenv.config();

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

export default axios;