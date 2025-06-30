import { useState } from "react";
import { Card } from "./Ui/Card";
import { CategoriesUi } from "./Ui/CategoriesUi";
import { HeroSection } from "./Ui/HeroSection";

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <HeroSection />
      <CategoriesUi
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Card selectedCategory={selectedCategory} />
    </div>
  );
};
