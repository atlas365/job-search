import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: 'Bearer IP2E8mzPlul0ToChO3ekzeLhB-uY6XlQZ1nGZ01CYJvaU8I9bhCJB2JqlSyoLAMYX75npKol-DYpLu8zS27WrjEs9fDF6q_W5phUtXdF_5T_MnCS7zZBQgfyT0b8YXYx',
  }
})