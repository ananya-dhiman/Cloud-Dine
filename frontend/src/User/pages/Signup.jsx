import AuthForm from "../../Common/auth-form"

export default function UserSignupPage() {
  return (
    <main className="min-h-dvh px-4 py-10">
      <AuthForm mode="signup" role="user" />
    </main>
  )
}
