import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Members from '@/components/Members'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Members />
      </main>
    </>
  )
}
