import {SyntheticListenerMap} from "@dnd-kit/core/dist/hooks/utilities";
import {DraggableAttributes} from "@dnd-kit/core";

export type SortableProps = {
    setActivatorNodeRef?: (element: (HTMLElement | null)) => void,
    listeners?: SyntheticListenerMap | undefined,
    attributes?: DraggableAttributes
}