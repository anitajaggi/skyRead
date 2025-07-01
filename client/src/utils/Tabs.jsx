export const Tabs = ({ tabs, activeTab, setActiveTab, tabLabels = {} }) => {
  return (
    <div>
      <div className="flex border-b border-red-600 mb-4">
        {Object.keys(tabs).map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setActiveTab(tabKey)}
            className={`px-4 py-2 border-b-2 ${
              activeTab === tabKey
                ? "border-red-600 font-bold text-red-600"
                : "border-transparent text-gray-600"
            }`}
          >
            {tabLabels[tabKey] || tabKey}
          </button>
        ))}
      </div>

      <div>{tabs[activeTab]()}</div>
    </div>
  );
};
