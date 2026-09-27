import React from 'react';
import '../editor.scss';
const {
    Component,
} = wp.element;
const {
    TextControl,
    SelectControl,
} = wp.components;

const { UCKitWPBlocks } = window;

export default {
    title: 'Kit UC Sección',
    description: 'Sección para Kit UC',
    category: 'common',
    icon: 'layout',
    // supports: { html: false, },
    keywords: ['uc', 'kit', 'section'],
    attributes: {
        title: {
            type: 'string',
            default: '',
        },
        titleTag: {
            type: 'string',
            default: 'h2',
        },
        type: {
            type: 'string',
            default: '',
        },
        itemTitleTag: {
            type: 'string',
            default: 'h3',
        },
        extra: {
            type: 'string',
            default: '',
        },
        button: {
            type: 'string',
            default: '',
        },
        url: {
            type: 'string',
            default: '',
        },
    },
    edit: class extends Component {

        constructor(props) {
            super(...arguments);
            this.props = props;
        }

        textChange(type,text){
            const json = {};
            json[type] = text;
            this.props.setAttributes(json);
        }

        getSubTitleTagOptions() {
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
                    <h3>Kit UC Sección</h3>
                    <div>
                        <span>Etiqueta de Título</span>
                        <SelectControl
                            value={attrs.titleTag}
                            onChange={(text) => self.textChange("titleTag", text)}
                            options={UCKitWPBlocks.titleTagOptions}
                        />
                    </div>
                    <label>
                        <span>Título</span>
                        <TextControl
                            placeholder="Título"
                            value={ attrs.title }
                            onChange={ ( text ) => self.textChange( 'title', text ) }
                        />
                    </label>
                    {/* <label>
                        <span>Tipo</span>
                        <SelectControl
                            value={ attrs.type }
                            onChange={ ( text ) => { self.textChange( 'type', text ) } }
                            options={ UCKitWPBlocks.section }
                        />
                    </label> */}
                    <div>
                        <span>Etiqueta de Subtítulo</span>
                            <SelectControl
                                value={attrs.itemTitleTag}
                                onChange={(text) => self.textChange("itemTitleTag", text)}
                                options={this.getSubTitleTagOptions()}
                            />
                        <small><a href='https://kitdigital.uc.cl/diseno/tipografia#section-01' target='_blank'>¿Cuál etiqueta debo usar?</a></small>
                    </div>
                    {/* <label>
                        <span>Tipo (Extra)</span>
                        <TextControl
                            placeholder="Tipo (Extra)"
                            value={ attrs.extra }
                            onChange={ ( text ) => self.textChange( 'extra', text ) }
                        />
                    </label> */}
                    <label>
                        <span>Botón</span>
                        <TextControl
                            placeholder="Botón"
                            value={ attrs.button }
                            onChange={ ( text ) => self.textChange( 'button', text ) }
                        />
                    </label>
                    <label>
                        <span>Link</span>
                        <TextControl
                            placeholder="Link"
                            value={ attrs.url }
                            onChange={ ( text ) => self.textChange( 'url', text ) }
                        />
                    </label>
                </div>
            )
        }
    },

    save(){
        return null;
    }
}
