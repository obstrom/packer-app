import React, { createContext, useState } from "react";
import { Bin, Item } from "../commons/types";

export interface PackerObjectContextValue {
  item: ItemContextValue;
  bin: BinContextValue;
  clearAll: () => void;
}

interface ItemContextValue {
  get: Array<Item>;
  add: (newItem: Item) => void;
  remove: (id: string) => void;
  update: (updatedItem: Item) => void;
}

interface BinContextValue {
  get: Array<Bin>;
  add: (newBin: Bin) => void;
  remove: (id: string) => void;
  update: (updatedBin: Bin) => void;
}

const PackerObjectContext = createContext<PackerObjectContextValue | null>(
  null
);

const PackerObjectProvider = (props: any) => {
  const [items, setItems] = useState<Array<Item>>([]);
  const [bins, setBins] = useState<Array<Bin>>([]);

  const addItem = (newItem: Item) => setItems([...items, newItem]);
  const removeItem = (id: string) =>
    setItems([...items.filter((item) => item.uuid !== id)]);
  const updateItem = (updatedItem: Item) =>
    setItems(
      items.map((item) => (item.uuid === updatedItem.uuid ? updatedItem : item))
    );

  const addBin = (newBin: Bin) => setBins([...bins, newBin]);
  const removeBin = (id: string) =>
    setBins([...bins.filter((bin) => bin.uuid !== id)]);
  const updateBin = (updatedBin: Bin) =>
    setBins(
      bins.map((bin) => (bin.uuid === updatedBin.uuid ? updatedBin : bin))
    );

  const clearAll = () => {
    setBins([]);
    setItems([]);
  };

  const value: PackerObjectContextValue = {
    item: {
      get: items,
      add: addItem,
      remove: removeItem,
      update: updateItem,
    },
    bin: {
      get: bins,
      add: addBin,
      remove: removeBin,
      update: updateBin,
    },
    clearAll,
  };

  return (
    <PackerObjectContext.Provider value={value}>
      {props.children}
    </PackerObjectContext.Provider>
  );
};

export { PackerObjectContext, PackerObjectProvider };
