import { PencilSimple } from "@phosphor-icons/react";

export default function ProfileCard() {
  return (
    <div className="w-full mx-auto border border-fl-border rounded-lg p-6 text-fl-text">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-6 border-b-2 border-transparent inline-block pb-1 underline decoration-fl-primary">
        Profile
      </h2>

      {/* Content Row */}
      <div className="flex items-center justify-between md:flex-row gap-4 flex-col">
        {/* Left Side: Avatar + Info */}
        <div className="flex items-center gap-4 md:flex-row flex-col">
          <img
            src="https://github.com/shadcn.png"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="text-center md:text-start">
            <h3 className="text-lg font-semibold text-fl-text">
              Sundar Gurung
            </h3>
            <p className="text-sm text-fl-muted">sundargurung360@gmail.com</p>
          </div>
        </div>

        {/* Edit Button */}
        <button className=" cursor-pointer flex items-center gap-2 bg-fl-primary text-white px-4 py-2 rounded-lg hover:bg-fl-primary-hover transition">
          <PencilSimple size={18} weight="fill" />
          <span className="text-sm font-medium">Edit</span>
        </button>
      </div>
    </div>
  );
}
