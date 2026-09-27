import React from 'react';
import '../editor.scss';

const {
    InnerBlocks,
    InspectorControls,
    useBlockProps,
} = wp.blockEditor;

const {
    PanelBody,
    TextControl,
    SelectControl,
    Button,
} = wp.components;

const { useDispatch, useSelect } = wp.data;
const { createBlock } = wp.blocks;

const { UCKitWPBlocks } = window;


export default {
    title: 'Kit UC: Acordeón',
    description: 'Acordeón para Kit UC. Permite insertar items con contenido libre.',
    category: 'common',
    icon: 'editor-table',
    keywords: ['uc', 'kit', 'accordion'],
    attributes: {
        title: {
            type: 'text',
            default: '',
        },
        type: {
            type: 'text',
            default: 'accordion',
        },
        titleTag: {
            type: 'text',
            default: 'h2'
        },
        itemTitleTag: {
            type: 'text',
            default: 'h3'
        },
        // 'items' attribute is removed/deprecated for new blocks using InnerBlocks
    },
    edit: (props) => {
        const { attributes, setAttributes, clientId } = props;

        const getSubTitleTagOptions = () => {
            const titleTagValue = attributes.titleTag;
            const titleTagIndex = UCKitWPBlocks.titleTagOptions.findIndex(option => option.value === titleTagValue);
            return UCKitWPBlocks.subTitleTagOptions.slice(titleTagIndex);
        };

        const ALLOWED_BLOCKS = [ 'uc-kit/accordion-item' ];

        // Custom appender component
        const CustomAppender = () => {
            const { insertBlock } = useDispatch('core/block-editor');
            
            const handleAddItem = () => {
                const newBlock = createBlock('uc-kit/accordion-item', {});
                insertBlock(newBlock, undefined, clientId);
            };

            return (
                <div className="uc-accordion-appender">
                    <Button
                        isPrimary
                        icon="plus"
                        onClick={handleAddItem}
                    >
                        Agregar Item
                    </Button>
                </div>
            );
        };

        return (
            <div {...useBlockProps({ 
                style: { 
                    border: '2px solid #ddd', 
                    padding: '10px', 
                    borderRadius: '4px' 
                } 
            })}>
                <div className="title">
                    <h3>Kit UC: Acordeón</h3>
                </div>
                
                <InspectorControls>
                    <PanelBody title="Configuración del Acordeón">
                        <SelectControl
                            label="Etiqueta de Título Principal"
                            value={attributes.titleTag}
                            onChange={(text) => setAttributes({ titleTag: text })}
                            options={UCKitWPBlocks.titleTagOptions}
                        />
                        <SelectControl
                            label="Etiqueta de Título de Items"
                            value={attributes.itemTitleTag}
                            onChange={(text) => setAttributes({ itemTitleTag: text })}
                            options={getSubTitleTagOptions()}
                        />
                    </PanelBody>
                </InspectorControls>

                <div className="editor-controls-inline">
                    <label>
                        <span>Título Principal (Opcional)</span>
                        <TextControl
                            placeholder="Título del Acordeón"
                            value={ attributes.title }
                            onChange={ ( text ) => setAttributes( { title: text } ) }
                        />
                    </label>
                </div>

                <div className="accordion-items-container" style={{ marginTop: '20px' }}>
                    <InnerBlocks 
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={[ ['uc-kit/accordion-item', {}] ]}
                        renderAppender={false}
                    />
                </div>

                <div>
                    <CustomAppender />
                </div>
            </div>
        )
    },

    save: (props) => {
        return <InnerBlocks.Content />;
    }
}
