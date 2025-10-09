import AuthForm from "../../Common/auth-form"

export default function OwnerLoginPage() {
  return (
    <main className="min-h-dvh px-4 py-10">
      <AuthForm mode="login" role="owner" />
    </main>
  )
}
