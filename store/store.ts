import {sectionSlice, SectionSlice} from "@/store/slices/sectionSlice";
import {create} from "zustand";
import {categorySlice, CategorySlice} from "@/store/slices/categorySlice";
import {promotionsSlice, PromotionsSlice} from "@/store/slices/salesSlice";

type StoreSlices = SectionSlice & CategorySlice & PromotionsSlice

export const useStore = create<StoreSlices>()
((...config) => ({
    ...categorySlice(...config),
    ...sectionSlice(...config),
    ...promotionsSlice(...config)
}))