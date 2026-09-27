import React from 'react';
import '../editor.scss';
import {
    arrayMove,
    SortableContainer,
    SortableElement,
} from 'react-sortable-hoc';
import { dragHandle } from "../lib/icons";
const {
    Component,
    // createElement,
    // Fragment,
} = wp.element;
const {
    Button,
    IconButton,
    // PanelBody,
    TextControl,
    SelectControl,
    CheckboxControl
} = wp.components;
const {
    // InspectorControls,
    // RichText,
    MediaUpload,
} = wp.editor;
const { withSelect } = wp.data;
/**
 * @property {Object} wp.components
 */

const { UCKitWPBlocks } = window;

const $itemTypeOptions = [
    { value: '', label: 'Enlace' },
    { value: 'page', label: 'Página' },
    { value: 'post', label: 'Entrada' },
];

const CarouselElement = SortableElement((props)=>{
    const {index,item,parent} = props;
    let $opts = null;
    if(!item.type || item.type === ''){
        $opts = [
            (
                <label>
                    <span>Título</span>
                    <TextControl
                        className="title"
                        placeholder="Título"
                        value={ item.title }
                        onChange={ ( text ) => parent.itemChange( 'title', text, item ) }
                    />
                </label>
            ),
            (
                <label>
                    <span>Descripción</span>
                    <TextControl
                        className="desc"
                        placeholder="Descripción"
                        value={ item.desc }
                        onChange={ ( text ) => parent.itemChange( 'desc', text, item ) }
                    />
                </label>
            ),
            (
                <label>
                    <span>Link</span>
                    <TextControl
                        className="url"
                        placeholder="Link"
                        value={ item.url }
                        onChange={ ( text ) => parent.itemChange( 'url', text, item ) }
                    />
                </label>
            )
        ];
    }
    else {
        const choices = (item.type === 'post' ? (parent.props.posts ? parent.props.posts : []) : (parent.props.pages ? parent.props.pages : [])).map((post)=>{
            /**
             * @property {String} post.title.rendered
             */
            return { value: post.id, label: post.title.rendered };
        });
        $opts = [
            (
                <label>
                    <span>{ item.type === 'post' ? 'Entrada' : 'Página' }</span>
                    <SelectControl
                        value={ item.post }
                        onChange={ ( post ) => { parent.itemChange( 'post', post, item ) } }
                        options={ choices }
                    />
                </label>
            ),
        ];
    }

    return (
        <div className="uc-kit-item">
            <div className="drag">
                <IconButton
                    icon={dragHandle}
                />
            </div>
            <div className="img">
                <MediaUpload
                    onSelect={ ( value ) => parent.selectItemImage( value, item ) }
                    render={ ({open}) => {
                        return (
                            <button onClick={open}>
                                <div style={ {backgroundImage:'url('+(!item.src || item.src === '' ? UCKitWPBlocks.thumbnail : item.src)+')'} }>
                                </div>
                            </button>
                        );
                    }}
                />
            </div>
            <div className="info">
                <label>
                    <span>Tipo</span>
                    <SelectControl
                        value={ item.type }
                        onChange={ ( text ) => {
                                parent.itemChange( 'type', text, item )
                            }
                        }
                        options={ $itemTypeOptions }
                    />
                </label>
                { $opts }
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

const CarouselContainer = SortableContainer((props)=>{
    const {parent,items} = props;
    return (
        <div className="item-container">
            {
                items.map((item,index) => {
                    return (
                        <CarouselElement
                            key={`item_${item.id}`}
                            item={item}
                            index={index}
                            parent={parent}
                        />
                    );
                })
            }
        </div>
    )
});

class CarouselClass extends Component {

    constructor(props) {
        super(...arguments);
        this.props = props;
        this.id = 0;
        this.items = [ ...this.props.attributes.items ];
    }

    addItem(){
        this.id++;
        this.items.push( {
            id: this.id,
            type: '',
            post: 0,
            title: '',
            src: '',
            desc: '',
            url: '',
            alternative: '',
        } );
        this.props.setAttributes( { items:[...this.items] } );
    }
    removeItem( index ){
        this.items.splice( index, 1 );
        this.props.setAttributes( { items:[...this.items] } );
    }

    selectItemImage( value, item ){
        /**
         * @property {String} value.sizes.full.url
         */
        item.src = value.sizes.full.url;
        item.alternative = value.alt;
        this.props.setAttributes( { items:[...this.items] } );
    }

    itemChange(type, text, item){
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

    selectChange(type, text) {
        if (this.props.attributes[type] !== text) {
            const json = {};
            json[type] = text;
            this.props.setAttributes(json);
        }
    }

    getSubTitleTagOptions() {
        if (!this.props.attributes.titleTagEnabled) {
            return UCKitWPBlocks.titleTagOptions; // Devuelve todas las opciones si el título no está habilitado
        }
        const titleTagValue = this.props.attributes.titleTag;
        const titleTagIndex = UCKitWPBlocks.titleTagOptions.findIndex(option => option.value === titleTagValue);
        return UCKitWPBlocks.subTitleTagOptions.slice(titleTagIndex);
    }

    render(){
        const self = this;
        const {className} = this.props;
        const attrs = this.props.attributes;
        return (
            <div className={className}>
                <div className="title">
                    <h3>Kit UC Carruseles</h3>
                    {/* <SelectControl
                        value={ attrs.type }
                        onChange={ ( text ) => { self.selectChange( 'type', text ) } }
                        options={ UCKitWPBlocks.carousel }
                    /> */}
                </div>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <div style={{ minWidth: '85%' }}>
                        <span>Etiqueta de Título</span>
                        <SelectControl
                            value={attrs.titleTag}
                            onChange={(text) => self.selectChange("titleTag", text)}
                            options={UCKitWPBlocks.titleTagOptions}
                            disabled={!attrs.titleTagEnabled}
                        />
                    </div>
                    <div style={{ marginLeft: '10px', marginTop: '25px' }}>
                        <CheckboxControl
                            label="Activar Título"
                            checked={attrs.titleTagEnabled}
                            onChange={(checked) => self.selectChange("titleTagEnabled", checked)}
                        />
                    </div>
                </div>
                <label>
                    <span>Título</span>
                    <TextControl
                        placeholder="Título"
                        value={ attrs.title }
                        onChange={ ( text ) => self.selectChange( 'title', text ) }
                    />
                </label>
                <div>
                    <span>Etiqueta de Subtítulo</span>
                    <SelectControl
                        value={attrs.itemTitleTag}
                        onChange={(text) => self.selectChange("itemTitleTag", text)}
                        options={this.getSubTitleTagOptions()}
                    />
                </div>
                <small><a href='https://kitdigital.uc.cl/diseno/tipografia#section-01' target='_blank'>¿Cuál etiqueta debo usar?</a></small>
                <CarouselContainer
                    items={self.items}
                    onSortEnd={ (...args) => self.onSortEnd(...args) }
                    shouldCancelStart={this.shouldCancelStart}
                    parent={self}
                />
                <Button
                    isDefault
                    onClick={ () => self.addItem()  }
                >{ 'Agregar Carousel' }</Button>
            </div>
        )
    }
}

export default {
    title: 'Kit UC Carruseles',
    description: 'Carruseles para Kit UC',
    category: 'common',
    icon: 'excerpt-view',
    keywords: ['uc', 'kit', 'carousel'],
    attributes: {
        title: {
            type: 'text',
            default: 'test',
        },
        titleTagEnabled: {
            type: 'boolean',
            default: '',
        },
        titleTag: {
            type: 'text',
            default: 'h2',
        },
        itemTitleTag:
        {
            type: 'text',
            default: 'h3',
        },
        type: {
            type: 'text',
            default: 'slider',
        },
        items: {
            type: 'array',
            default: [],
        }
    },
    edit: withSelect(select => {
        /**
         * @property {Function} select.getCurrentPostId
         * @property {Function} select.getEntityRecords
         */
        const currentPostId = select('core/editor').getCurrentPostId();
        const query = {
            per_page: -1,
            exclude: currentPostId
        };
        return {
            posts: select('core').getEntityRecords('postType', 'post', query),
            pages: select('core').getEntityRecords('postType', 'page', query),
        }
    })(CarouselClass),
    save(){
        return null;
    }
}
