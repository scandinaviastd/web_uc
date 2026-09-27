import React from 'react';
import '../editor.scss';
const {
    Component,
} = wp.element;
const {
    TextControl,
    SelectControl,
    FormTokenField,
    CheckboxControl
} = wp.components;

const { UCKitWPBlocks } = window;

export default {
    title: 'Kit UC Agenda',
    description: 'Agenda para Kit UC',
    category: 'common',
    icon: 'layout',
    // supports: { html: false, },
    keywords: ['uc', 'kit', 'agenda'],
    attributes: {
        title: {
            type: 'text',
            default: '',
        },
        titleTag: {
            type: 'text',
            default: '',
        },
        itemTitleTag:
        {
            type: 'text',
            default: ''
        },
        type: {
            type: 'text',
            default: '',
        },
		host: {
            type: 'text',
            default: 'https://agenda.uc.cl'
        },
        token: {
			type: 'text',
			default: 'b5e2f0a90ea94eed7d8df27f6c9ffdf8e790caedfb7d4aae26f836f7716aa1e5b713964cefb99b77c59add08e98358a98487b9c6b08452e8023d8854dd957ca1f69a30344918778c589da06dbad24ca4d535b4a53f6be4ebb45659d50cb690bd441e1511fe582d43825625d4cd1487f8bc006519a7635999a4f2608a63501a44'
		},
        organizers: {
            type: 'array',
            default: [],
        },
        audience: {
            type: 'array',
            default: [],
        },
        fromDate: {
            type: 'text',
            default: '',
        },
        toDate: {
            type: 'text',
            default: '',
        },
        featuredEvents: {
            type: 'boolean',
            default: ''
        },
        hideImg: {
            type: 'boolean',
            default: ''
        },
        hideTag: {
            type: 'boolean',
            default: ''
        },

    },
    edit: class extends Component {

        constructor(props) {
            super(...arguments);
            this.props = props;
        }
        state = {
            organizersData: [],
            audiencesData: [],
            typeActivitiesData: []
        };

        textChange(type, text) {
            const json = {};
            json[type] = text;
            this.props.setAttributes(json);
        }

        async componentDidMount() { //TODO: Algo relacionado a .mark da problemas acá
            try {
                const organizersData = await this.fetchOrganizers();
                const audiencesData = await this.fetchAudiences();
                const typeActivitiesData = await this.fetchTypeActivities();
                this.setState({
                    organizersData,
                    audiencesData,
                    typeActivitiesData
                });
            } catch (error) {
                console.error("Error during fetching:", error);
            }
        }

        async fetchOrganizers() {
            const response = await fetch('https://agenda.uc.cl/api/organizers/all?api_token=b5e2f0a90ea94eed7d8df27f6c9ffdf8e790caedfb7d4aae26f836f7716aa1e5b713964cefb99b77c59add08e98358a98487b9c6b08452e8023d8854dd957ca1f69a30344918778c589da06dbad24ca4d535b4a53f6be4ebb45659d50cb690bd441e1511fe582d43825625d4cd1487f8bc006519a7635999a4f2608a63501a44', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            });
            const data = await response.json();
            console.log(data.organizers);
            const organizersOptions = data.organizers.map(org => ({
                label: org.name,
                // Comentado para evitar problemas
                // value: typeof org.term_id.toString === 'function' ? org.term_id.toString() : String(org.term_id)
                value: '' // Valor por defecto
            }));
            return organizersOptions;
        }

        async fetchAudiences() {
            const response = await fetch('https://agenda.uc.cl/api/audiences?api_token=b5e2f0a90ea94eed7d8df27f6c9ffdf8e790caedfb7d4aae26f836f7716aa1e5b713964cefb99b77c59add08e98358a98487b9c6b08452e8023d8854dd957ca1f69a30344918778c589da06dbad24ca4d535b4a53f6be4ebb45659d50cb690bd441e1511fe582d43825625d4cd1487f8bc006519a7635999a4f2608a63501a44', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const audiencesOptions = data.audiences.map(aud => ({
                label: aud.name,
                // Comentado para evitar problemas
                // value: typeof aud.term_id.toString === 'function' ? aud.term_id.toString() : String(aud.term_id)
                value: '' // Valor por defecto
            }));
            return audiencesOptions;
        }

        async fetchTypeActivities() {
            const response = await fetch('https://agenda.uc.cl/api/types_of_activities?api_token=b5e2f0a90ea94eed7d8df27f6c9ffdf8e790caedfb7d4aae26f836f7716aa1e5b713964cefb99b77c59add08e98358a98487b9c6b08452e8023d8854dd957ca1f69a30344918778c589da06dbad24ca4d535b4a53f6be4ebb45659d50cb690bd441e1511fe582d43825625d4cd1487f8bc006519a7635999a4f2608a63501a44', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const typeActivitiesOptions = data.types_of_activities.map(act => ({
                label: act.name,
                // Comentado para evitar problemas
                // value: typeof act.term_id.toString === 'function' ? act.term_id.toString() : String(act.term_id)
                value: '' // Valor por defecto
            }));
            return typeActivitiesOptions;
        }

        getSubTitleTagOptions() {
            const titleTagValue = this.props.attributes.titleTag;
            switch(titleTagValue) {
                case 'h3':
                    return UCKitWPBlocks.subTitleTagOptions.filter(option => option.value !== 'h3'); // Todas excepto h3
                case 'h2':
                default:
                    return UCKitWPBlocks.subTitleTagOptions;  // Todas las opciones por defecto
            }
        }

        render(){
            const self = this;
            const {className} = this.props;
            const attrs = this.props.attributes;
            const { organizersData } = this.state;
            return (
                <div className={className}>
                    <div className="title">
						<h3>Kit UC Agenda</h3>
						<SelectControl
							value={ attrs.type }
							onChange={ ( text ) => { self.textChange( 'type', text ) } }
							options={ UCKitWPBlocks.schedule }
						/>
                    </div>
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
                    <div>
                        <span>Etiqueta de Subtítulo</span>
                            <SelectControl
                                value={attrs.itemTitleTag}
                                onChange={(text) => self.textChange("itemTitleTag", text)}
                                options={this.getSubTitleTagOptions()}
                            />
                        <small><a href='https://kitdigital.uc.cl/diseno/tipografia#section-01' target='_blank'>¿Cuál etiqueta debo usar?</a></small>
                    </div>
                    <label>
                        <span>Host</span>
                        <TextControl
                            placeholder="Host"
                            value={ attrs.host }
                            onChange={ ( text ) => self.textChange( 'host', text ) }
                        />
                    </label>
                    <label>
                        <span>Token</span>
                        <TextControl
                            placeholder="Token"
                            value={ attrs.token }
                            onChange={ ( text ) => self.textChange( 'token', text ) }
                        />
                    </label>
                    <div>
                        <span>Organizadores</span>
                        <FormTokenField
                            value={attrs.organizers}
                            onChange={(text) => self.textChange('organizers', text)}
                            suggestions={organizersData.map(org => org.label)}
                        />
					</div>
                    <div>
                        <span>Audiencia</span>
                        <FormTokenField
                            value={attrs.audience}
                            onChange={(text) => self.textChange('audience', text)}
                            suggestions={this.state.audiencesData.map(aud => aud.label)}
                        />
					</div>
                    <div>
                        <span>Tipo de Actividad</span>
                        <FormTokenField
                            value={attrs.typeActivities}
                            onChange={(text) => self.textChange('typeActivities', text)}
                            suggestions={this.state.typeActivitiesData.map(act => act.label)}
                        />
					</div>
                    <div>
                        <span>Desde</span>
                        <TextControl
                            value={ attrs.fromDate }
                            type="date"
                            onChange={ ( text ) => self.textChange( 'fromDate', text ) }
                        />

                    </div>
                    <div>
                        <span>Hasta</span>
                        <TextControl
                            value={ attrs.toDate }
                            type="date"
                            onChange={ ( text ) => self.textChange( 'toDate', text ) }
                        />
                    </div>
                    <div>
                        <span>Otras Opciones</span>
                        <CheckboxControl
                            label="Solo eventos destacados"
                            checked={attrs.titleTagEnabled}
                            onChange={(checked) => self.textChange("titleTagEnabled", checked)}
                        />
                        <CheckboxControl
                            label="Ocultar imágenes de card"
                            checked={attrs.hideImg}
                            onChange={(checked) => self.textChange("hideImg", checked)}
                        />
                        <CheckboxControl
                            label="Ocultar tagline del tipo de actividad"
                            checked={attrs.hideTag}
                            onChange={(checked) => self.textChange("hideTag", checked)}
                        />
                    </div>

                </div>
            )
        }
    },

    save(){
        return null;
    }
}
