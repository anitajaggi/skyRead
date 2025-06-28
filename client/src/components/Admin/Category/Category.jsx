import { useEffect, useRef, useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { CategoryList } from "./CategoryList";
import { Tabs } from "../../../utils/Tabs";

export const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const formRef = useRef(null);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    setActiveTab(Object.keys(tabs)[1]);
  };

  const tabs = {
    Categories: () => <CategoryList onEdit={handleEdit} />,
    "Add Category": () => (
      <CategoryForm
        selectedCategory={selectedCategory}
        clearSelection={() => setSelectedCategory(null)}
        ref={formRef}
      />
    ),
  };
  const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0]);

  return (
    <div className="flex flex-col min-h-screen">
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
