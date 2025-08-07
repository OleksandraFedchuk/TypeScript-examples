import SearchForm from "./SearchForm";
import { useState } from "react";
import "./App.css";
import { type Article } from "../src/types/article";
import ArticleList from "./ArticleList";
import { fetchArticles } from "./services/articleService";

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <p>Please wait, loading is in process</p>}
      {isError && <p>Woops! Something went wrong, please try again later</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
    </>
  );
}
