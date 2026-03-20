import Hero from "./components/Hero"
import About from "./components/About"
import Services from "./components/Services"
import Gallery from "./components/Gallery"
import Packages from "./components/Packages"
import Testimonials from "./components/Testimonials"
import Contact from "./components/Contact"

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Gallery />
      {/* <Packages /> */}
      {/* <Testimonials /> */}
      <Contact />
    </main>
  )
}