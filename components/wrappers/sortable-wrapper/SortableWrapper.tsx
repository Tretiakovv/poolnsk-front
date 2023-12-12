import React from 'react';
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

const SortableWrapper = ({id, children} : {
    id : number,
    children : React.ReactNode,
}) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition
    } = useSortable(
        {
            id: id
        }
    )

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const childrenWithRef = () => React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
            setActivatorNodeRef: setActivatorNodeRef,
            listeners: listeners,
            attributes: attributes
        })
    })

    return (
        <div style={style} ref={setNodeRef}>
            {childrenWithRef()}
        </div>
    );

};

export default SortableWrapper;
