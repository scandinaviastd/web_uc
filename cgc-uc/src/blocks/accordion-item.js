import React from "react";
import "../editor.scss";

const { InnerBlocks, RichText } = wp.blockEditor;

const { TextControl, Button } = wp.components;

const { useDispatch } = wp.data;

export default {
    title: "Kit UC: Item Acordeón",
    description: "Item para el Acordeón",
    category: "common",
    icon: "minus",
    parent: ["uc-kit/accordion"],
    attributes: {
        title: {
            type: "string",
            default: "",
        },
        // We can add more attributes here if needed, like keeping 'desc' for backward compat or just rely on InnerBlocks
    },
    edit: (props) => {
        const { attributes, setAttributes, className, clientId } = props;
        const { removeBlock } = useDispatch("core/block-editor");

        const handleRemoveItem = () => {
            removeBlock(clientId);
        };

        return (
            <div className={className}>
                <div className="accordion-item-editor">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <label>Título del Item</label>
                            <TextControl
                                value={attributes.title}
                                onChange={(value) =>
                                    setAttributes({ title: value })
                                }
                                placeholder="Escribe el título del item..."
                            />
                        </div>
                        <Button
                            isDestructive
                            icon="trash"
                            onClick={handleRemoveItem}
                            style={{ background: "#dd3d3d", color: "#fff" }}
                        >
                            Eliminar Item
                        </Button>
                    </div>
                    <div
                        className="accordion-item-content-editor"
                        style={{
                            border: "1px dashed #ccc",
                            padding: "10px",
                            marginTop: "10px",
                        }}
                    >
                        <p>
                            <strong>Contenido del Item:</strong>
                        </p>
                        <InnerBlocks />
                    </div>
                </div>
            </div>
        );
    },
    save: (props) => {
        return <InnerBlocks.Content />;
    },
};
