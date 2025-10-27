export default function SidebarItem({
  section,
  selectedSection,
  setSelectedSection,
  isCollapsed,
}: {
  section: {
    title: string;
    selection: string;
    icon: any;
  };
  selectedSection: string;
  setSelectedSection: React.Dispatch<React.SetStateAction<string>>;
  isCollapsed: boolean;
}) {
  const isActive = selectedSection === section.selection;
  return (
    <button
      onClick={() => setSelectedSection(section.selection)}
      className={`flex items-center w-full text-left py-3 px-3 rounded-lg mb-2 transition-all duration-200 ${
        isActive
          ? "bg-teal-500 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-teal-500"
      }`}
    >
      <section.icon className="w-5 h-5" />
      {!isCollapsed && (
        <span className="ml-3 font-medium whitespace-nowrap">
          {section.title}
        </span>
      )}
    </button>
  );
}
