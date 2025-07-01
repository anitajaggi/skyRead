import { useEffect, useRef, useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { CategoryList } from "./CategoryList";
import { Tabs } from "../../../utils/Tabs";

export const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("Categories");
  const formRef = useRef(null);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    setActiveTab("Form");
  };

  // 🧠 Tab keys should be STATIC
  const tabs = {
    Categories: () => <CategoryList onEdit={handleEdit} />,
    Form: () => (
      <CategoryForm
        selectedCategory={selectedCategory}
        clearSelection={() => setSelectedCategory(null)}
        ref={formRef}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        tabs={tabs}
      />
    ),
  };

  return (
    <div className="category">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={(tabKey) => {
          setActiveTab(tabKey);
          if (tabKey !== "Form" && selectedCategory) {
            // 🧽 Clean up when leaving form tab
            setSelectedCategory(null);
          }
        }}
        // Optional: pass custom labels
        tabLabels={{
          Categories: "Categories",
          Form: selectedCategory ? "Update Category" : "Create Category",
        }}
      />
    </div>
  );
};
