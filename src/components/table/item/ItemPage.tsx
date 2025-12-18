import React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  XIcon,
} from "@phosphor-icons/react";
import type { ColumnType, ItemType } from "@/types/types";

import { DataField } from "./DataField";
import { useItems } from "@/features/items/useItems";
import { useUpdateItem } from "@/features/items/useUpdateItem";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

interface ItemPageProps {
  /** Controls the visibility of the component. */
  isOpened: boolean;
  /** Controls the width (2/3 vs 100%). */
  isExpanded: boolean;
  /** Data object containing the item's properties to display. */
  item: ItemType | undefined;

  /** Function to call when the Close button is clicked. */
  columns: ColumnType[];
  onClose: () => void;
  /** Function to call when the Toggle Expand button is clicked. */
  onToggleExpand: () => void;
}

// ----------------------------------------
// Framer Motion Variants for Animation
// ----------------------------------------

// Defines the initial, open (2/3), and expanded (100%) states for the width.
const sidebarVariants: Variants = {
  // Initial state (hidden/closed) - Slides off the screen to the right
  closed: {
    x: "100%",
    width: "0%",
    opacity: 0,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
  // Open state (2/3 width) - Slides into view
  open: {
    x: "0%",
    width: "66.66%",
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
  // Expanded state (100% width) - Smooth width transition
  expanded: {
    x: "0%",
    width: "100%",
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
};

const ItemPage: React.FC<ItemPageProps> = ({
  isOpened,
  isExpanded,
  item,
  columns,
  onClose,
  onToggleExpand,
}) => {
  // Determine the current Framer Motion state key
  const currentState = isExpanded ? "expanded" : "open";
  const { data: items } = useItems(item?.table_id ?? "");
  const currentItem = items?.filter((i) => i.id == item?.id)[0];

  const updateItem = useUpdateItem();

  const handelChanges = (changes: any) => {
    if (!currentItem) return;
    updateItem.mutate({
      id: currentItem.id,
      table_id: currentItem.table_id,
      update: {
        content: changes,
      },
    });
  };

  return (
    // AnimatePresence is required for exit animations (when isOpened becomes false)
    <AnimatePresence>
      {isOpened && (
        <motion.div
          // Tailwind Classes for static styling (position, height, z-index, colors)
          className={`absolute top-0 right-0 h-full bg-fl-bg flex flex-col overflow-y-auto z-48 px-4 border-fl-border ${
            !isExpanded ? "rounded-l-md border-l " : ""
          }`}
          // Framer Motion Props
          variants={sidebarVariants}
          initial="closed" // Start from the 'closed' state
          animate={currentState} // Animate to the determined state ('open' or 'expanded')
          exit="closed" // Animate back to the 'closed' state when removed from the DOM
        >
          {/* --- Top Bar: Controls --- */}
          <div className="flex justify-end p-2 border-b border-fl-border sticky top-0 z-10 gap-2 bg-fl-bg">
            {/* Toggle Expand Button */}
            <button
              onClick={onToggleExpand}
              className="test-fl-text p-2 rounded-md hover:bg-fl-hover cursor-pointer"
            >
              {!isExpanded ? (
                <CaretDoubleLeftIcon size={16} />
              ) : (
                <CaretDoubleRightIcon size={16} />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="test-fl-text p-2 rounded-md hover:bg-fl-hover cursor-pointer"
            >
              <XIcon size={16} />
            </button>
          </div>

          {/* --- Scrollable Content Area --- */}
          <div className="p-8 grow">
            {/* --- Top Section: Item Properties Display --- */}
            <section className="mb-8 flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-fl-text relative">
                Item Details
                <span className="block w-18 h-0.5 bg-fl-primary mt-1 rounded"></span>
              </h2>

              <div className="grid grid-cols-1 gap-x-4 gap-y-3 lg:grid-cols-2">
                {currentItem && (
                  <>
                    {columns?.map((col, key) => (
                      <div className="flex gap-3 items-center" key={key}>
                        <p className="text-fl-info">{col.title}</p>
                        <DataField column={col} item={currentItem} />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </section>

            {/* --- Bottom Section: Text Area (Mock Content/Description) --- */}
            <section className="flex flex-col gap-4 relative">
              <h2 className="text-xl font-semibold text-fl-text relative">
                Content
                <span className="block w-14 h-0.5 bg-fl-primary mt-1 rounded"></span>
              </h2>
              <div className="max-h-[calc(100vh-200px)] overflow-auto">
                {currentItem && (
                  <SimpleEditor
                    key={currentItem.id}
                    initialContent={currentItem.content}
                    onChange={handelChanges}
                  />
                )}
              </div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ItemPage;
