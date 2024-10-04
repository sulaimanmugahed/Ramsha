import { create } from "zustand"

type CustomStylesStore = {
    inputBorderRadius: number
}

export const useCustomStylesStore = create<CustomStylesStore>(() => ({
    inputBorderRadius: 30
}));