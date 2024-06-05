import { useContext } from "react"
import { About } from "./About"
import { FlashCardsContainer } from "./FlashCardsContainer"
import "./Home.scss"
import { Menu } from "./Menu"
import { TopicsList } from "./TopicsList"
import { UserContext } from "../../context/UserContext"

export const Home = () => {
  const {user} = useContext(UserContext);
  return (
    <>
      <Menu/>
      <TopicsList/>
      <FlashCardsContainer/>
      <About />
    </>
  )
}
