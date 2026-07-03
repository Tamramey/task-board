import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AuthForm.css'

function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // ログイン後の遷移先(リダイレクトされてきた場合は元のページに戻す)
  const redirectTo = location.state?.from ?? '/properties'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSubmitting(true)

    const { error } = await signIn(email, password)

    setSubmitting(false)

    if (error) {
      setErrorMessage('メールアドレスまたはパスワードが正しくありません。')
      return
    }

    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="auth-form">
      <h1>ログイン</h1>

      <form onSubmit={handleSubmit}>
        <label className="auth-form__field">
          <span>メールアドレス</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </label>

        <label className="auth-form__field">
          <span>パスワード</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />
        </label>

        {errorMessage && <p className="auth-form__error">{errorMessage}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>

      <p className="auth-form__switch">
        アカウントをお持ちでない方は <Link to="/signup">会員登録</Link>
      </p>
    </div>
  )
}

export default LoginPage
