import { About } from "./About"
import { Menu } from "./Menu"
import "./Home.scss"
import { FlashCardContainer } from "./FlashCardContainer"

export const Home = () => {
  return (
    <>
      <Menu/>
      <FlashCardContainer/>
      <About />
    </>
  )
}
