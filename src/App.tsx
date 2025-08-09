import SearchForm from "./SearchForm";
import { useState } from "react";
import "./App.css";
import { type Article } from "../src/types/article";
import ArticleList from "./ArticleList";
import { fetchArticles } from "./services/articleService";
import Api from "./Api";
import Modal from "./Modal/Modal";

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await fetchArticles(topic);
      setArticles(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <p>Please wait, loading is in process</p>}
      {isError && <p>Woops! Something went wrong, please try again later</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
      <Api />
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2>Custom Modal Content</h2>
          <p>This is reusable modal with dynamic content</p>
        </Modal>
      )}
    </>
  );
}
