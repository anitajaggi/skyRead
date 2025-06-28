import { useRef, useState } from "react";
import { Tabs } from "../../../utils/Tabs";
import { ArticleForm } from "./ArticleForm";
import { ArticleTable } from "./ArticleTable";

export const Article = () => {
  const [selectArticle, setSelectArticle] = useState(null);
  const formRef = useRef(null);

  const handleEdit = (article) => {
    setSelectArticle(article);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    setActiveTab(Object.keys(tabs)[1]);
  };

  const tabs = {
    Articles: () => <ArticleTable onEdit={handleEdit} />,
    "Add Articles": () => (
      <ArticleForm
        selectArticle={selectArticle}
        clearSelection={() => setSelectArticle(null)}
        ref={formRef}
      />
    ),
  };
  const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0]);

  return (
    <div className="article">
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
