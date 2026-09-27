import React from 'react';
import '../editor.scss';
import {arrayMove, /*SortableContainer, SortableElement*/} from 'react-sortable-hoc';
//import { dragHandle } from "../lib/icons";
import ItemContainer from '../components/itemContainer';
//import ItemElement from '../components/itemElement';
const {Component, /*createElement,*/ /*Fragment*/ } = wp.element;
const {Button, IconButton, /*PanelBody,*/ TextControl, SelectControl} = wp.components;
//const {/*InspectorControls,*/ RichText} = wp.editor;
//const { UCKitWPBlocks } = window;

export default {
    title: 'Kit UC: Tabla',
    description: 'Tabla para Kit UC',
    category: 'common',
    icon: 'editor-table',
    keywords: ['uc', 'kit', 'table'],
    attributes: {
        title: {
            type: 'text',
            default: '',
        },
        titleTag: {
            type: 'text',
            default: 'h2',
        },
        column1: {
            type: 'text',
            default: 'Hora',
        },
        column2: {
            type: 'text',
            default: 'Sección',
        },
        type: {
            type: 'text',
            default: '',
        },
        items: {
            type: 'array',
            default: [],
        }
    },
    edit: class extends Component {

        constructor(props) {
            super(...arguments);
            this.props = props;
            this.id = 0;
            this.items = [ ...this.props.attributes.items ];
            this.props.setAttributes({ type: 'table' });
        }

        addItem(){
            this.id++;
            this.items.push( {
                id: this.id,
                title: '',
                desc: '',
            } );
            this.props.setAttributes( { items:[...this.items] } );
        }

        removeItem( index ){
            this.items.splice( index, 1 );
            this.props.setAttributes( { items:[...this.items] } );
        }

        selectImage( value, item ){
            /**
             * @property {String} value.sizes.full.url
             */
            item.src = value.sizes.full.url;
            this.props.setAttributes( { items:[...this.items] } );
        }

        textChange(type, text, item){
            /**
             * @property {Function} this.props.setAttributes
             */
            item[ type ] = text;
            this.props.setAttributes( { items:[...this.items] } );
        }

        onSortEnd({oldIndex,newIndex}){
            this.items = arrayMove([...this.items],oldIndex,newIndex);
            this.props.setAttributes( { items:[...this.items] } );
        }

        // noinspection JSMethodCanBeStatic
        shouldCancelStart(e){
            let targetEle = e;
            if(!targetEle.classList) targetEle = e.target;
            if(!targetEle.classList.contains('drag')) targetEle = targetEle.parentNode;
            if(!targetEle.classList.contains('drag')) targetEle = targetEle.parentNode;
            if(!targetEle.classList.contains('drag')) targetEle = targetEle.parentNode;
            return !targetEle.classList.contains('drag');
        }

        selectChange(type,text){
            const json = {};
            json[type] = text;
            this.props.setAttributes(json);

        }

        render(){
            const self = this;
            const {className} = this.props;
            const attrs = this.props.attributes;

            return (
                <div className={className}>
                    <div className="title">
                        <h3>Kit UC: Tabla</h3>
                    </div>
                    <div>
                        <span>Etiqueta de Título</span>
                        <SelectControl
                            value={attrs.titleTag}
                            onChange={(text) => self.selectChange("titleTag", text)}
                            options={UCKitWPBlocks.titleTagOptions}
                        />
                    </div>
                    <div>
                        <span>Título</span>
                        <TextControl
                            placeholder="Título"
                            value={ attrs.title }
                            onChange={ ( text ) => { self.selectChange( 'title', text )} }
                        />
                        <small><a href='https://kitdigital.uc.cl/diseno/tipografia#section-01' target='_blank'>¿Cuál etiqueta debo usar?</a></small>
                    </div>
                    <label>
                        <span>Columna 1</span>
                        <TextControl
                            placeholder="Columna 1"
                            value={ attrs.column1 }
                            onChange={ ( text ) => {self.selectChange( 'column1', text )} }
                        />
                    </label>
                    <label>
                        <span>Columna 2</span>
                        <TextControl
                            placeholder="Columna 2"
                            value={ attrs.column2 }
                            onChange={ ( text ) => {self.selectChange( 'column2', text )} }
                        />
                    </label>
                    <ItemContainer
                        items={self.items}
                        onSortEnd={ (...args) => self.onSortEnd(...args) }
                        shouldCancelStart={this.shouldCancelStart}
                        parent={self}
                    />
                    <Button
                        isDefault
                        onClick={ () => self.addItem()  }
                    >{ 'Agregar Item' }</Button>
                </div>
            )
        }
    },

    save(){
        return null;
    }
}
