import { auth, provider } from '../../config/firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate, Navigate } from 'react-router-dom'
import { useGetUserID } from '../../hooks/useGetUserID'
import './styles.css'

export const Auth = () => {
  const navigate = useNavigate()
  const { isAuth } = useGetUserID()

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider)
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true
    }
    localStorage.setItem('auth', JSON.stringify(authInfo))
    navigate('/collections')
  }

  if (isAuth) {
    return <Navigate to='/collections' />
  }

  return (
    <div className='login-page'>
      <h1> Welcome to the Collections Manager!</h1>
      <p></p>
      <h2>Sign In with Google to Continue</h2>
      <p></p>
      <button
        className='login-google-button'
        onClick={signInWithGoogle}
        type='button'
      >
        {' '}
        Sign In
      </button>
    </div>
  )
}
