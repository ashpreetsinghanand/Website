import { Footer, Header, Rail, UiProvider } from './components/Chrome.tsx'
import { SmoothScroll } from './components/motion.tsx'
import { Capabilities, Contact, Faq, Features, Hero, Insights, Integrations, Intro, Systems } from './components/Sections.tsx'

export function App() {
  return (
    <UiProvider>
      <SmoothScroll />
      <div className="min-h-screen overflow-x-clip bg-bg text-cream">
        <Header />
        <main>
          <Hero />
          <Intro />
          <div className="frame grid lg:grid-cols-[180px_1fr] lg:gap-x-10">
            <div className="hidden border-x border-line lg:block">
              <Rail />
            </div>
            <div className="flex min-w-0 flex-col gap-20 border-x border-line py-20">
              <Capabilities />
              <Systems />
              <Features />
              <Integrations />
              <Insights />
              <Faq />
              <Contact />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </UiProvider>
  )
}
