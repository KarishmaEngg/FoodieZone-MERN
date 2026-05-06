import axios from 'axios';

export default axios.create({
  baseURL: "[https://foodie-backend-0z3c.onrender.com/api](https://foodie-backend-0z3c.onrender.com/api)",
  withCredentials: true
});
