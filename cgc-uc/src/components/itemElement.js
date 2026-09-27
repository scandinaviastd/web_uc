import React from 'react';
import {SortableElement} from 'react-sortable-hoc';
import {dragHandle} from "../lib/icons";
const { IconButton, TextControl, Button } = wp.components;
const { RichText } = wp.editor;

const ItemElement = SortableElement((props) => {
    const {index, item, parent} = props;
    return (
        <div className="uc-kit-item">
            <div className="drag">
                <IconButton
                    icon={dragHandle}
                />
            </div>
            <div className="info">
                <label>
                    <span>Título</span>
                    <TextControl
                        className="title"
                        placeholder="Título"
                        value={ item.title }
                        onChange={ ( text ) => parent.textChange( 'title', text, item ) }
                    />
                </label>
                <label>
                    <span>Descripción</span>
                    <RichText
                        className="desc"
                        placeholder="Contenido"
                        value={ item.desc }
                        onChange={ ( text ) => parent.textChange( 'desc', text, item ) }
                    />
                </label>
            </div>
            <div className="remove">
                <IconButton
                    icon="no-alt"
                    onClick={ () => parent.removeItem( index ) }
                />
            </div>
        </div>
    );
});

export default ItemElement;
