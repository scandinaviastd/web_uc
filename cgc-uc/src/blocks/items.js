import React from 'react';
import '../editor.scss';
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc';
import { dragHandle } from "../lib/icons";
const { Component, /*createElement, Fragment*/ } = wp.element;
const { Button, IconButton, /* PanelBody,*/ TextControl, SelectControl, CheckboxControl } = wp.components;
const { /* InspectorControls, RichText,*/ MediaUpload } = wp.editor;

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

const ItemElement = SortableElement((props) => {
    const { index, item, parent } = props;
    //console.log('item.type:', item.type);

    const { state } = parent;
    const { attributes } = parent.props;
    //console.log('attributes.type:', attributes.type);
    let $opts = null;
    // Después de definir $opts
    const renderLink = () => {
        return (
            <label>
                <span>Link</span>
                <TextControl
                    className="url"
                    placeholder="Link"
                    value={item.url}
                    onChange={(text) => parent.itemChange('url', text, item)}
                />
            </label>
        )
    }
    //console.log('Item.type:', item);
    if (!item.type || item.type === '') {
        //console.log('Item type is empty:', item);
        $opts = [
            (
                <label>
                    <span>Título</span>
                    <TextControl
                        className="title"
                        placeholder="Título"
                        value={item.title}
                        onChange={(text) => parent.itemChange('title', text, item)}
                    />
                </label>
            ),
            (

                <label>
                    <span>Descripción</span>
                    <TextControl
                        className="desc"
                        placeholder="Descripción"
                        value={item.desc}
                        onChange={(text) => parent.itemChange('desc', text, item)}
                    />
                </label>
            ),
            (
                attributes.withLink && renderLink()
            ),
        ];
    } else {
        const choices = (item.type === 'post' ? (parent.props.posts ? parent.props.posts : []) : item.type === 'page' ? (parent.props.pages ? parent.props.pages : []) : item.type === 'cardHeaderFooter' ? (parent.props.cardHeaderFooter ? parent.props.cardHeaderFooter : []) : item.type === 'cardHorizontal' ? (parent.props.cardHorizontal ? parent.props.cardHorizontal : []) : []).map((post) => {
            return { value: post.id, label: post.title.rendered };
        });
        $opts = [
            (
                <label>
                    <span>{item.type === 'post' ? 'Entrada' : item.type === 'page' ? 'Página' : item.type === 'cardHeaderFooter' ? 'Card con Header y Footer' : 'Card Horizontal'}</span>
                    <SelectControl
                        value={item.type === 'post' ? item.post : item.type === 'page' ? item.page : item.type === 'cardHeaderFooter' ? item.cardHeaderFooter : item.cardHorizontal}
                        onChange={(value) => { parent.itemChange(item.type, value, item) }}
                        options={choices}
                    />
                </label>

            ),
            (//TODO - Código Duplicado

                (attributes.type !== 'backgroundImage' && attributes.type !== 'nestedHover') && <label>
                    <span>Descripción</span>
                    <TextControl
                        className="desc"
                        placeholder="Descripción"
                        value={item.desc}
                        onChange={(text) => parent.itemChange('desc', text, item)}
                    />
                </label>
            )
        ];
    }

    const renderHeader = () => {
        return (
            <label>
                <span>Texto Header</span>
                <TextControl
                    className="textHeader"
                    placeholder="Texto Header"
                    value={item.textHeader}
                    onChange={(text) => parent.itemChange('textHeader', text, item)}
                />
            </label>
        )
    }

    const renderFooter = () => {
        return (
            <label>
                <span>Texto Footer</span>
                <TextControl
                    className="textFooter"
                    placeholder="Texto Footer"
                    value={item.textFooter}
                    onChange={(text) => parent.itemChange('textFooter', text, item)}
                />
            </label>
        )
    }

    const renderNestedHover = () => {
        return (
            <>
                <label>
                    <span>Titulo Hover</span>
                    <TextControl
                        className="tituloHover"
                        placeholder="Titulo Hover"
                        value={item.titleHover}
                        onChange={(text) => parent.itemChange('titleHover', text, item)}
                    />
                </label>
                <label>
                    <span>Texto Hover</span>
                    <TextControl
                        className="textoHover"
                        placeholder="Texto Hover"
                        value={item.textHover}
                        onChange={(text) => parent.itemChange('textHover', text, item)}
                    />
                </label>
            </>
        )
    }

    const renderMediaUpload = () => {
        return (
            <div className="img">
                <MediaUpload
                    onSelect={(value) => parent.selectItemImage(value, item)}
                    render={({ open }) => {
                        return (
                            <button onClick={open}>
                                <div style={{ backgroundImage: 'url(' + (!item.src || item.src === '' ? UCKitWPBlocks.thumbnail : item.src) + ')' }}>
                                </div>
                            </button>
                        );
                    }}
                />
            </div>
        )
    }

    return (
        <div className="uc-kit-item">
            <div className="drag">
                <IconButton icon={dragHandle} />
            </div>
            {parent.shouldRenderMediaUpload(state.type, item) && renderMediaUpload()}
            <div className="info">
                <label>
                    <span>Tipo</span>
                    <SelectControl
                        value={item.type}
                        onChange={(text) => { console.log('Item type change:', item.id, text); parent.itemChange('type', text, item) }}
                        options={$itemTypeOptions}
                    />
                </label>
                {$opts}
                {['cardHeaderFooter'].includes(state.type) && renderHeader()}
                {['cardHeaderFooter'].includes(state.type) && renderFooter()}
                {['nestedHover'].includes(state.type) && renderNestedHover()}
            </div>
            <div className="remove">
                <IconButton
                    icon="no-alt"
                    onClick={() => parent.removeItem(item.id)}
                />
            </div>
        </div>
    );
});

const ItemContainer = SortableContainer((props) => {
    const { parent, items } = props;
    return (
        <div className="item-container">
            {
                items.map((item, index) => {
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

class ItemClass extends Component {
    constructor(props) {
        super(...arguments);
        this.props = props;
        this.id = 0;
        this.state = {
            type: props.attributes.type || '',
            items: props.attributes.items || [],
        }
    }

    addItem() {
        this.id++;
        const newItem = {
            id: this.id,
            alternative: '',
            type: '',
            post: 0,
            title: '',
            src: '',
            desc: '',
            textHeader: '',
            textFooter: '',
            url: '',
            titleHover: '',
            textHover: '',
        };
        const items = [...this.state.items, newItem];
        const reindexedItems = this.reindexItems(items);
        //console.log('Adding item:', newItem);

        this.setState({ items: reindexedItems });
        this.props.setAttributes({ items: reindexedItems });
    }

    reindexItems(items) {
        return items.map((item, index) => ({
            ...item,
            id: index + 1
        }));
    }

    removeItem(id) {
        //console.log('Removing item with id:', id);

        let items = this.state.items.filter(item => item.id !== id);
        items = this.reindexItems(items);
        // console.log('Remaining items:', items);

        this.setState({ items });
        this.props.setAttributes({ items });
    }


    selectItemImage(value, item) {
        //console.log('Selecting image for item:', item.id, value);

        const items = this.state.items.map(i => {
            if (i.id === item.id) {
                return {
                    ...i,
                    src: value.sizes.full.url,
                    alternative: value.alt,
                };
            }
            return i;
        });
        this.setState({ items });
        this.props.setAttributes({ items });
    }

    itemChange(type, value, item) {
        const updatedItems = this.state.items.map(i => {
            if (i.id === item.id) {
                const updatedItem = { ...i, [type]: value };

                // Resetear campos irrelevantes si se cambia el tipo
                if (type === 'type') {
                    if (value === 'post') {
                        updatedItem.page = '';
                        updatedItem.url = '';
                    } else if (value === 'page') {
                        updatedItem.post = '';
                        updatedItem.url = '';
                    } else {
                        updatedItem.post = '';
                        updatedItem.page = '';
                    }
                }

                // Rellenar descripción automáticamente si es 'post' o 'page'
                if ((type === 'post' || type === 'page') && value) {
                    const selectedItems = type === 'post' ? this.props.posts : this.props.pages;
                    const selectedItem = selectedItems ? selectedItems.find(p => p.id == value) : null;

                    if (selectedItem) {
                        if (!updatedItem.desc || updatedItem.desc.trim() === '') {
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = selectedItem.excerpt.rendered;
                            const plainText = tempDiv.textContent || tempDiv.innerText || '';
                            updatedItem.desc = plainText;
                        }
                    }
                }

                return updatedItem;
            }
            return i;
        });

        this.setState({ items: updatedItems });
        this.props.setAttributes({ items: updatedItems });
    }


    onSortEnd = ({ oldIndex, newIndex }) => {
        //console.log('Sorting items from', oldIndex, 'to', newIndex);

        let items = arrayMove(this.state.items, oldIndex, newIndex);
        items = this.reindexItems(items);
        this.setState({ items });
        this.props.setAttributes({ items });
    }

    shouldCancelStart(e) {
        let targetEle = e;
        if (!targetEle.classList) targetEle = e.target;
        if (!targetEle.classList.contains('drag')) targetEle = targetEle.parentNode;
        if (!targetEle.classList.contains('drag')) targetEle = targetEle.parentNode;
        if (!targetEle.classList.contains('drag')) targetEle = targetEle.parentNode;
        return !targetEle.classList.contains('drag');
    }

    selectChange(type, text) {
        const attributes = { ...this.props.attributes, [type]: text };
        this.props.setAttributes(attributes);
    }

    getSubTitleTagOptions() {
        const titleTagValue = this.props.attributes.titleTag;
        const titleTagIndex = UCKitWPBlocks.titleTagOptions.findIndex(option => option.value === titleTagValue);
        const titleActivate = this.props.attributes.titleTagEnabled;

        let subtitleOptions = [];
        if (!titleActivate ) {
            if (((titleTagIndex > 0 && titleTagIndex !== UCKitWPBlocks.titleTagOptions.length - 1))) {
                subtitleOptions = UCKitWPBlocks.subTitleTagOptions.slice(titleTagIndex);
            } else {
                switch (titleTagIndex) {
                case UCKitWPBlocks.titleTagOptions.length - 1:
                    subtitleOptions = UCKitWPBlocks.subTitleTagOptions.slice(titleTagIndex - 1);
                    break;
                default:
                    subtitleOptions = UCKitWPBlocks.subTitleTagOptions.slice(titleTagIndex);
                    break;
                }
            }
        } else {
            switch (titleTagIndex) {
                case 0:
                    subtitleOptions = UCKitWPBlocks.subTitleTagOptions.slice(titleTagIndex + 2);
                    break;
                case UCKitWPBlocks.titleTagOptions.length - 1:
                    subtitleOptions = UCKitWPBlocks.subTitleTagOptions.slice(titleTagIndex + 1);
                    break;
                default:
                    subtitleOptions = UCKitWPBlocks.subTitleTagOptions.slice(titleTagIndex + 1);
                    break;
            }
        }
        const subTitleTag2 = this.props.attributes.itemTitleTag;
        return this.getOptionSubtitleTag(subTitleTag2, titleActivate, subtitleOptions);
    }

    getOptionSubtitleTag(subTitleValue, titleActivate, subTitleTagOptions) {
        let optionSubtitle = subTitleTagOptions;
        if (titleActivate && subTitleValue === 'h2') {
            this.props.attributes.titleTagEnabled = false;
            optionSubtitle = UCKitWPBlocks.subTitleTagOptions.slice(index + 1);
        }
        return optionSubtitle;
    }

    onClickHandler = (text) => {
        this.setState({ type: text });
    }

    shouldRenderMediaUpload(type, item) {
        const typesToShowUpload = ['about', 'banners', 'cardHorizontal', 'backgroundImage', 'nestedHover', 'withImage'];
        const typesContent = ['post', 'page'];
        // console.log('type:', type);
        // console.log('this:', this);
        // console.log('ITEM:', item);
        console.log('typesToShowUpload.includes(type) && !typesContent.includes(this.state.type):', typesToShowUpload.includes(type) && !typesContent.includes(item.type));

        return typesToShowUpload.includes(type) && !typesContent.includes(item.type);
    }

    render() {
        const self = this;
        const { className } = this.props;
        const attrs = this.props.attributes;
        const items = this.state.items;
        //console.log('Rendering ItemClass with items:', items);

        return (
            <div className={className}>
                <div className="title">
                    <h3>Kit UC Cards</h3>
                    <SelectControl
                        value={attrs.type}
                        onChange={(text) => { self.selectChange("type", text); self.onClickHandler(text) }}
                        options={UCKitWPBlocks.items}
                    />
                    <div>
                        <CheckboxControl
                            label="¿Con enlace?"
                            checked={attrs.withLink}
                            onChange={(checked) => self.selectChange("withLink", checked)}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                        value={attrs.title}
                        onChange={(text) => self.selectChange('title', text)}
                        disabled={!attrs.titleTagEnabled}
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
                {items.some(item => item.type === 'post' || item.type === 'page') && (
                    <p className='textPostPage'>*Si escoges Entrada/Página, se usará la imagen destacada de dicha Entrada/Página</p>
                )}
                <ItemContainer
                    items={items}
                    onSortEnd={this.onSortEnd}
                    shouldCancelStart={this.shouldCancelStart}
                    parent={self}
                />
                <Button isDefault onClick={() => self.addItem()}>
                    {'Agregar Item'}
                </Button>
            </div>
        );
    }
}

export default {
    title: 'Kit UC Cards',
    description: 'Cards para Kit UC',
    category: 'common',
    icon: 'excerpt-view',
    keywords: ['uc', 'kit', 'items'],
    attributes: {
        title: {
            type: 'text',
            default: '',
        },
        titleTagEnabled: {
            type: 'boolean',
            default: '',
        },
        titleTag: {
            type: 'text',
            default: 'h2',
        },
        itemTitleTag: {
            type: 'text',
            default: 'h3',
        },
        withLink: {
            type: 'boolean',
            default: false,
        },
        type: {
            type: 'text',
            default: '',
        },
        items: {
            type: 'array',
            default: [],
        },
    },
    edit: withSelect((select) => {
        const currentPostId = select('core/editor').getCurrentPostId();
        const query = {
            per_page: -1,
            exclude: currentPostId,
        };
        return {
            posts: select('core').getEntityRecords('postType', 'post', query),
            pages: select('core').getEntityRecords('postType', 'page', query),
        };
    })(ItemClass),
    save() {
        return null;
    },
};
