import Cookies from 'universal-cookie';
export default async function handler(req, res) {
  try {
    const cookies = new Cookies();
    cookies.set('token', req.query.token, { path : "/" });
    res.redirect('/dashboard')
  }
  catch (error){
    console.log(error)
    res.redirect('/')
  }
}