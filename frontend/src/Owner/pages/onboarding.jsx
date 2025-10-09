import SimpleNav from "../components/simple-nav"
import OnboardingForm from "../components/onboarding-form"

export default function OnboardingPage() {
  return (
    <main className="min-h-dvh">
      <SimpleNav />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-balance">Add New Kitchen</h1>
        <p className="mb-6 text-sm text-(--color-muted-foreground)">
          Enter your kitchen details, service radius, and upload photos.
        </p>
        <OnboardingForm />
      </section>
    </main>
  )
}
