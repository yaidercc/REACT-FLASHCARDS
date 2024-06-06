import { About } from "./About"
import { FlashCardsContainer } from "./FlashCardsContainer"
import "./Home.scss"
import { Menu } from "./Menu"
import { TopicsList } from "./TopicsList"
import { Modal } from "../../utils/Modal/Modal"

export const Home = () => {
  return (
    <>
      
      <Menu/>
      <TopicsList/>
      <FlashCardsContainer/>
      <About />
    </>
  )
}
