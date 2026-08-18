import type { TabKey } from "../types/models";

interface TabSelectorProps {
  items: readonly TabKey[];
  selected: TabKey;
  onSelect: (tab: TabKey) => void;
}

/**
 * Recreates the `ModernTabList` control (`tab_Selector`) used to switch
 * between the Flows / Power Apps / Copilot Studio Agent / Power Pages views.
 * Implemented as an ARIA tablist with roving keyboard navigation
 * (Left/Right arrows) for accessibility.
 */
export function TabSelector({ items, selected, onSelect }: TabSelectorProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = items.indexOf(selected);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      onSelect(items[(currentIndex + 1) % items.length]);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      onSelect(items[(currentIndex - 1 + items.length) % items.length]);
    }
  };

  return (
    <div
      className="tab-selector"
      role="tablist"
      aria-label="List of Power Platform Component to filter the list on"
      onKeyDown={handleKeyDown}
    >
      {items.map((item) => {
        const isSelected = item === selected;
        return (
          <button
            key={item}
            type="button"
            role="tab"
            id={`tab-${item}`}
            aria-selected={isSelected}
            aria-controls={`panel-${item}`}
            tabIndex={isSelected ? 0 : -1}
            className={`tab-selector-item${isSelected ? " selected" : ""}`}
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
