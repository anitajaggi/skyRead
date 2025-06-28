export const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div>
      <div className="flex border-b border-red-600 mb-4">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${
              activeTab === tab
                ? "border-b-3 border-red-600 text-red-600 font-bold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>{tabs[activeTab]()}</div>
    </div>
  );
};
