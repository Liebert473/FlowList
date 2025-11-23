import { XIcon, PaletteIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { colors, colorClasses } from "@/utils/colors";
import { useThemeColor } from "./useThemeColor";

export const ThemeSection = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const { color, setColor } = useThemeColor();

  return (
    <div className="p-6 bg-fl-bg rounded-2xl border border-fl-border flex justify-between ">
      <h2 className="text-xl font-semibold text-fl-text relative">
        Theme
        <span className="block w-8 h-0.5 bg-fl-primary mt-1 rounded"></span>
      </h2>

      <button
        onClick={() => setOpenEdit(true)}
        className=" cursor-pointer flex items-center gap-2 bg-fl-primary text-fl-insider px-4 py-2 rounded-lg hover:bg-fl-primary-hover transition"
      >
        <PaletteIcon size={18} weight="fill" />
        <span className="text-sm font-medium">Edit</span>
      </button>

      {openEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="w-full max-w-lg m-2 bg-fl-bg-sec rounded-xl shadow-lg border border-fl-border p-6 text-fl-text animate-fadeIn">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-xl font-semibold text-fl-text relative mb-6">
                Change Theme
                <span className="block w-18 h-0.5 bg-fl-primary mt-1 rounded"></span>
              </h2>
              <button
                onClick={() => setOpenEdit(false)}
                className="text-fl-text hover:text-fl-primary transition"
              >
                <XIcon size={22} weight="bold" />
              </button>
            </div>

            <div className="flex flex-wrap gap-6 overflow-y-auto justify-between">
              {colors.map((c, i) => (
                <div key={i} className=" flex flex-col gap-2 items-center">
                  <div
                    onClick={() => setColor(c)}
                    className={` transition-all flex w-10 h-10 rounded-md justify-center p-2 itmes-center hover:border ${
                      (!color && c == "red") || color == c ? "border" : ""
                    } ${colorClasses[c].border.normal}`}
                  >
                    <svg
                      fill={`var(--color-fl-${c})`}
                      viewBox="0 0 52 52"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path d="m49.9 10.6c-2.1-4.1-7.4-11.7-17.2-7.2-6.1 2.8-9.5 4.4-9.5 4.4l-8.8 3.8c-2.5 1.2-7.9-0.5-11-1.6-0.9-0.3-1.7 0.6-1.3 1.5 2.1 4.1 7.4 11.7 17.2 7.2 6.1-2.8 18.3-8.1 18.3-8.1 2.5-1.2 7.9 0.5 11 1.6 0.9 0.2 1.7-0.7 1.3-1.6z m-21.1 12.8c-1.1 0.6-5.5 2.6-5.5 2.6l-4.4 1.9c-2.2 1.2-6.9-0.4-9.7-1.5-0.8-0.4-1.5 0.6-1.1 1.4 1.8 4 6.5 11.2 15.1 6.8 5.4-2.7 9.9-4.5 9.9-4.5 2.2-1.2 6.9 0.4 9.7 1.5 0.8 0.3 1.5-0.6 1.1-1.5-1.8-3.9-6.5-11.1-15.1-6.7z m-3.2 17.7c-0.9 0.5-2.4 1.4-2.4 1.4-1.7 1.1-5.2-0.3-7.3-1.3-0.6-0.3-1.1 0.6-0.8 1.4 1.3 3.6 4.8 10.1 11.3 6.1 2.4-1.5 2.4-1.4 2.4-1.4 1.8-0.9 5.2 0.3 7.3 1.3 0.6 0.3 1.1-0.6 0.8-1.4-1.3-3.6-4.6-9.8-11.3-6.1z"></path>
                        </g>
                        <path d="m25.9 25.1"> </path>
                      </g>
                    </svg>
                  </div>
                  <span className={`${colorClasses[c].text.normal}`}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
