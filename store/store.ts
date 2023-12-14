import {sectionSlice, SectionSlice} from "@/store/slices/sectionSlice";
import {create} from "zustand";
import {categorySlice, CategorySlice} from "@/store/slices/categorySlice";
import {promotionsSlice, PromotionsSlice} from "@/store/slices/salesSlice";
import {projectsSlice, ProjectsSlice} from "@/store/slices/projectsSlice";
import {workersSlice, WorkersSlice} from "@/store/slices/workersSlice";
import {ControlPanelSlice, controlPanelSlice} from "@/store/slices/controlPanelSlice";

type StoreSlices = SectionSlice & CategorySlice &
    PromotionsSlice & ProjectsSlice & WorkersSlice & ControlPanelSlice

export const useStore = create<StoreSlices>()
((...config) => ({
    ...categorySlice(...config),
    ...sectionSlice(...config),
    ...promotionsSlice(...config),
    ...projectsSlice(...config),
    ...workersSlice(...config),
    ...controlPanelSlice(...config)
}))