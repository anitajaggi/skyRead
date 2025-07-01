import { useRef, useState } from "react";
import { Tabs } from "../../../utils/Tabs";
import { ArticleForm } from "./ArticleForm";
import { ArticleTable } from "./ArticleTable";

export const Article = () => {
  const [selectArticle, setSelectArticle] = useState(null);
  const formRef = useRef(null);

  const tabs = {
    Articles: () => <ArticleTable onEdit={handleEdit} />,
    Form: () => (
      <ArticleForm
        selectArticle={selectArticle}
        clearSelection={() => setSelectArticle(null)}
        ref={formRef}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        tabs={tabs}
      />
    ),
  };

  const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0]);

  const handleEdit = (article) => {
    setSelectArticle(article);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    setActiveTab("Form");
  };

  const tabLabels = {
    Articles: "Articles",
    Form: selectArticle ? "Update Article" : "Add Article",
  };

  return (
    <div className="article">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={(tabKey) => {
          setActiveTab(tabKey);
          if (tabKey !== "Form") {
            setSelectArticle(null);
          }
        }}
        tabLabels={tabLabels}
      />
    </div>
  );
};
