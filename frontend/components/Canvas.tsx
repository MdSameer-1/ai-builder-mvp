"use client"; // ← Add this at the very top

import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

interface Item {
  id: number;
  type: string;
}

// Draggable item
function DraggableItem({ id, children }: { id: number; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    border: "1px solid gray",
    padding: "8px",
    margin: "4px",
    borderRadius: "4px",
    cursor: "grab",
    backgroundColor: "white",
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

// Canvas area
export default function Canvas() {
  const [items, setItems] = useState<Item[]>([]);
  const [prompt, setPrompt] = useState("");

  const { setNodeRef } = useDroppable({ id: "canvas" });

  const addItem = (type: string) => {
    setItems([...items, { id: items.length + 1, type }]);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter AI prompt..."
          className="border p-2 rounded w-1/2 mr-2"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => alert(`Prompt submitted: ${prompt}`)}
        >
          Submit
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => addItem("Button")}
        >
          Add Button
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={() => addItem("Input")}
        >
          Add Input
        </button>
      </div>

      <DndContext>
        <div
          ref={setNodeRef}
          className="min-h-[300px] border-2 border-dashed border-gray-400 rounded p-4 bg-gray-50"
        >
          {items.map((item) => (
            <DraggableItem key={item.id} id={item.id}>
              {item.type}
            </DraggableItem>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
