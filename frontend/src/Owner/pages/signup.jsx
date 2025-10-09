import AuthForm from "../../Common/auth-form"

export default function OwnerSignupPage() {
  return (
    <main className="min-h-dvh px-4 py-10">
      <AuthForm mode="signup" role="owner" />
    </main>
  )
}
