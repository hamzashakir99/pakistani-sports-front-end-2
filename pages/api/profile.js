import axios from "../../utils/axios.config"
const errorObject = {
  is_success: false,
  message: 'Something went wrong'
}
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const response = await axios.get('/profile', {
        headers: {
          Authorization: req.headers.authorization
        }
      })
      res.status(response.status).json(response.data)
    }
  }
  catch (error){
    console.log(error)
    res.status(200).json(errorObject)
  }
}