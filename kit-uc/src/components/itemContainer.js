import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import ItemElement from './itemElement';

const ItemContainer = SortableContainer((props)=>{
    const {parent,items} = props;
    return (
        <div className="item-container">
            {
                items.map((item,index) => {
                    return (
                        <ItemElement
                            key={`item_${item.id}`}
                            index={index}
                            item={item}
                            parent={parent}
                        />
                    );
                })
            }
        </div>
    )
});

export default ItemContainer;
