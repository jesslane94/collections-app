import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase-config'
import { useNavigate } from 'react-router-dom'

export const SignOut = () => {
  const navigate = useNavigate()

  const signUserOut = async () => {
    try {
      await signOut(auth)
      localStorage.clear()
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  signUserOut()
}
