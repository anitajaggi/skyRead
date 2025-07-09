export const Tabs = ({ tabs, activeTab, setActiveTab, tabLabels = {} }) => {
  return (
    <div>
      <div className="flex border-b border-indigo-600 mb-6">
        {Object.keys(tabs).map((tabKey) => {
          const isActive = activeTab === tabKey;
          return (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`px-4 py-2 text-sm md:text-base cursor-pointer font-medium transition-all duration-200
                ${
                  isActive
                    ? "border-b-4 border-indigo-600 text-indigo-700"
                    : "border-b-4 border-transparent text-gray-500 hover:text-indigo-500"
                }`}
            >
              {tabLabels[tabKey] || tabKey}
            </button>
          );
        })}
      </div>

      <div className="mt-4">{tabs[activeTab]()}</div>
    </div>
  );
};
