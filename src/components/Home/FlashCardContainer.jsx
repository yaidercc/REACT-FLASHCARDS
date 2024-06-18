import { useContext, useEffect, useState } from "react";
import { FlashCardsList } from "./FlashCardsList";
import { TopicsList } from "./TopicsList";
import { TopicsAndFlashcards } from "../../context/Topics/TopicsAndFlashcardsContext";

export const FlashCardContainer = () => {
  const { topics, currentTopic } = useContext(TopicsAndFlashcards);
  const [topicName, setTopicName] = useState({name:"",description:""});

  useEffect(() => {
    const topicName = topics.find((topic) => topic._id === currentTopic);
    setTopicName({name: topicName?.name || "" , description:topicName?.description || ""});
  }, [currentTopic, topics]);

  return (
    <div className="flashCard__container">
      <TopicsList />
      <h3>{topicName.name}</h3>
      <p>{topicName.description}</p>
      <FlashCardsList />
    </div>
  );
};
