import {sectionSlice, SectionSlice} from "@/store/slices/sectionSlice";
import {create} from "zustand";
import {categorySlice, CategorySlice} from "@/store/slices/categorySlice";
import {promotionsSlice, PromotionsSlice} from "@/store/slices/salesSlice";
import {projectsSlice, ProjectsSlice} from "@/store/slices/projectsSlice";

type StoreSlices = SectionSlice & CategorySlice & PromotionsSlice & ProjectsSlice

export const useStore = create<StoreSlices>()
((...config) => ({
    ...categorySlice(...config),
    ...sectionSlice(...config),
    ...promotionsSlice(...config),
    ...projectsSlice(...config)
}))