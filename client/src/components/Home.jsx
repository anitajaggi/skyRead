import { useState } from "react";
import { Card } from "./Ui/Card";
import { CategoriesUi } from "./Ui/CategoriesUi";

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <CategoriesUi setSelectedCategory={setSelectedCategory} />
      <Card selectedCategory={selectedCategory} />
    </>
  );
};
