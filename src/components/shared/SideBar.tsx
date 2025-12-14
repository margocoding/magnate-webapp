import React from "react";
import { cn } from "../../utils/classNames";
import { ProfileIcon } from "../../assets/ProfileIcon";
import { HomeIcon } from "../../assets/HomeIcon";

const sections = [
  {
    value: "home",
    label: "Home",
    icon: <HomeIcon/>
  },
  {
    value: "profile",
    label: "Profile",
    icon: <ProfileIcon/>
  },
];

const SideBar: React.FC = () => {
  const [selectedSection, setSelectedSection] = React.useState<
    "profile" | "home"
  >("home");

  return (
    <footer className="flex z-[100] justify-stretch min-h-[57px] fixed bottom-0 left-1/2 bg-[#111] p-3 -translate-x-1/2 w-[400px]">
      {sections.map((section) => (
        <button
          key={section.value}
          className={cn(
            "w-full flex flex-col justify-center items-center",
            section.value === selectedSection
              ? "text-[#6155F5]"
              : "text-[#838383] "
          )}
          onClick={() =>
            setSelectedSection(section.value as "home" | "profile")
          }
        >
          {section.icon}
          {section.label}
        </button>
      ))}
    </footer>
  );
};

export default SideBar;
