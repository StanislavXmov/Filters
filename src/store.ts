import { DragEvent } from 'react';
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { Filters } from './types';

interface Store {
  file: File | null;
  filter: Filters;
  setFilter: (filter: Filters) => void;
  upload: (e: DragEvent<HTMLDivElement>) => void;
}

export const useStore = create<Store>()(devtools(subscribeWithSelector((set) => ({
  file: null,
  filter: Filters.default,
  setFilter: (filter) => {
    set(() => ({filter}));
  },
  upload: (e) => {
    if (!e.dataTransfer) {
      return;
    }
    const tempFile = e.dataTransfer.files[0];
    if (!tempFile.type.match("image.*")) {
      return;
    }
    set(() => ({file: tempFile}));
  }
}))));