"use client";

import { useState } from "react";

import { Header } from "@/app/(components)/Header";

interface UserSetting {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
}

const mockSettings: UserSetting[] = [
  {
    label: "Username",
    value: "john_doe",
    type: "text",
  },
  {
    label: "Email",
    value: "john_doe@example.com",
    type: "text",
  },
  {
    label: "Notification",
    value: true,
    type: "toggle",
  },
  {
    label: "Dark Mode",
    value: false,
    type: "toggle",
  },
  {
    label: "Language",
    value: "English",
    type: "text",
  },
];

const Settings = () => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);

  const handleToggle = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  return (
    <div className="w-full ">
      <Header name="User Settings" />
      <div className="mt-5 overflow-x-auto shadow-md">
        <table className="min-w-full rounded-lg bg-white">
          <thead className="text-white bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-sm text-left font-semibold uppercase">
                Setting
              </th>
              <th className="px-4 py-3 text-sm text-left font-semibold uppercase">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr key={setting.label} className="hover:bg-blue-50">
                <td className="px-4 py-2">{setting.label}</td>
                <td className="px-4 py-2">
                  {setting.type === "toggle" ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={setting.value as boolean}
                        onChange={() => handleToggle(index)}
                        className="sr-only peer"
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                      className="px-4 py-2 text-gray-500 border rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
