import RoleCard from "./role-card"
import SiteHeader from "../User/components/site-header.jsx"
export default function MainOnboardingPage () {
  return (
    <main className="min-h-dvh flex flex-col">
      <SiteHeader/>
      <section className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-semibold text-balance">Welcome</h2>
            <p className="text-muted-foreground">Choose how you want to continue.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <RoleCard
              title="I am a User"
              description="Find restaurants, order your favorites, and track your meals."
              imageQuery="/images/user.jpg"
              loginHref="/user/login"
              signupHref="/user/signup"
            />
            <RoleCard
              title="I am a Kitchen Owner"
              description="Manage your menu, accept orders, and grow your presence."
              imageQuery="/images/chef.jpg"
              loginHref="/owner/login"
              signupHref="/owner/signup"
            />
          </div>
        </div>
      </section>

    </main>
  )
}
