import React from 'react';
import '../editor.scss';
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc';
import { dragHandle } from "../lib/icons";
const { Component, /* createElement, Fragment*/ } = wp.element;
const { Button, IconButton, /* PanelBody,*/ TextControl, SelectControl, CheckboxControl, TextareaControl } = wp.components;
const {/* InspectorControls,*/ RichText, MediaUpload } = wp.editor;
const { withSelect } = wp.data;
/**
 * @property {Object} wp.components
 */

const { UCKitWPBlocks } = window;


class AlertClass extends Component {

	constructor(props) {
		super(...arguments);
		this.props = props;
		this.id = 0;
		if (!this.props.attributes.id) {
			this.generateUniqueId();
		}
	}

	// noinspection JSMethodCanBeStatic
	shouldCancelStart(e) {
		let targetEle = e;
		if (!targetEle.classList) targetEle = e.target;
		if (!targetEle.classList.contains('drag')) targetEle = targetEle.parentNode;
		if (!targetEle.classList.contains('drag')) targetEle = targetEle.parentNode;
		if (!targetEle.classList.contains('drag')) targetEle = targetEle.parentNode;
		return !targetEle.classList.contains('drag');
	}

	selectChange(type, text) {
		const json = {};
		json[type] = text;
		this.props.setAttributes(json);
	}

	selectImage = (media) => {
		const image = { url: media.sizes.full.url, alt: media.alt };
		this.props.setAttributes({ image });
	}

	generateUniqueId() {
		const uniqueId = `alert-${Math.floor(Math.random() * 999999)}`;
		this.props.setAttributes({ id: uniqueId });
	}


	render() {
		const self = this;
		const { className } = this.props;
		const attrs = this.props.attributes;

		// Determinar si mostrar campos adicionales
		const showAdditionalFields = (attrs.type === 'warning' || attrs.type === 'error') && (attrs.alertMode !== 'simple' && attrs.alertMode !== 'card');
		const cardMode = attrs.alertMode === 'card';
		//console.log(showAdditionalFields);
		return (
			<div className={className}>
				<div className="title">
					<h3>Kit UC Alerta</h3>
					<div style={{ minWidth: '25%', margin: 'auto' }}>
						<SelectControl
							label="Seleccione modo de alerta"
							labelPosition="top"
							value={attrs.alertMode}
							onChange={(text) => { /*console.log(text);*/ self.selectChange("alertMode", text) }}
							options={UCKitWPBlocks.alertMode}
						/>
					</div>
					<div style={cardMode ? { display: 'none' } : { minWidth: '25%', margin: 'auto' }}>
						<SelectControl
							label="Seleccione tipo de alerta"
							labelPosition="top"
							value={attrs.type}
							onChange={(text) => { self.selectChange("type", text) }}
							options={UCKitWPBlocks.alert}
						/>
					</div>
					<div style={attrs?.alertMode === 'card' ? { minWidth: '25%', marginLeft: 'auto', marginRight: 'auto' } : {display: 'none'}}>
						<CheckboxControl
							label="Usar imagen"
							checked={attrs.withImage}
							onChange={(checked) => self.selectChange("withImage", checked)}
						/>
					</div>
					<div style={attrs?.alertMode === 'simple' ? { minWidth: '25%', marginLeft: 'auto', marginRight: 'auto' } : {display: 'none'}}>
						<CheckboxControl
							label="Mostar Ícono Cerrar"
							checked={attrs.withClose}
							onChange={(checked) => self.selectChange("withClose", checked)}
						/>
					</div>

				</div>
				{/* {console.log(attrs?.alertMode == 'card')} */}
				<div style={attrs?.alertMode !== 'simple' ? { display: 'flex', alignItems: 'center' } : {display: 'none'}}>
					<div style={{ minWidth: '85%' }}>
						<span>Etiqueta del Título de la alerta</span>
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
				<div style={attrs?.alertMode == 'simple' ? {display: 'none'} : {}}>
					<span>Título</span>
					<TextControl
						placeholder="Título"
						value={attrs.title}
						onChange={(text) => self.selectChange('title', text)}
						disabled={!attrs.titleTagEnabled}
					/>
				</div>
				<div style={attrs?.alertMode != 'card' ? {display: 'none'} : {}}>
					<span>Label</span>
					<TextControl
						placeholder="Label"
						value={attrs.label}
						onChange={(text) => self.selectChange('label', text)}
					/>
				</div>
				<div style={attrs?.alertMode != 'card' ? {display: 'none'} : {}}>
					<span>Enlace</span>
					<TextControl
						placeholder="Enlace"
						value={attrs.link}
						onChange={(text) => self.selectChange('link', text)}
					/>
				</div>
				<small style={attrs?.alertMode == 'simple' ? {display: 'none'} : {}}><a href='https://kitdigital.uc.cl/diseno/tipografia#section-01' target='_blank'>¿Cuál etiqueta debo usar?</a></small>
				<div style={(attrs.alertMode === 'card' && attrs.withImage) ? { display: 'flex', margin: 'auto' } : {display: 'block'}} >
					{(attrs.alertMode == 'card' && attrs.withImage) ? (
						<div className='uc-kit-item' style={{ margin: '0 1rem', borderStyle: 'none' }}>
							<div className="img">
								<MediaUpload
									onSelect={this.selectImage}
									allowedTypes={['image']}
									value={attrs.image.id} // Manejar el caso de undefined como se mencionó anteriormente
									render={({ open }) => {
										return (
											<button onClick={open} >
												<div style={{ backgroundImage: `url(${attrs.image.url || UCKitWPBlocks.thumbnail})` }}>
												</div>
											</button>
										)
									}}
								/>
							</div>
						</div>
					) : null}
					<div style={(attrs.alertMode == 'card' && attrs.withImage) ? {width: '69rem'} : {width: 'auto', display: 'block'} }>
						<span>Descripción</span>
						<RichText
							value={attrs.description}
							className={className}
							style={attrs.alertMode === 'card' ? { minHeight: '8rem' } : {display: 'block'} }
							onChange={(text) => self.selectChange("description", text)}
						/>
					</div>
				</div>

				{showAdditionalFields && (
					<div style={{ marginTop: '25px' }}>
						<span>Lugar de Contacto</span>
						<TextControl
							value={attrs.lugarContacto}
							onChange={(text) => self.selectChange("lugarContacto", text)}
						/>
						<span>Número de Contacto</span>
						<TextControl
							value={attrs.numeroContacto}
							onChange={(text) => self.selectChange("numeroContacto", text)}
							type="number"
						/>
						<span>Más Información (URL)</span>
						<TextControl
							value={attrs.masInformacion}
							onChange={(text) => self.selectChange("masInformacion", text)}
							type="url"
						/>
					</div>
				)}
			</div>
		);
	}
}

export default {
	title: 'Kit UC Alert',
	description: 'Alerta para Kit UC',
	category: 'common',
	icon: 'excerpt-view',
	keywords: ['uc', 'kit', 'alert'],
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
		description: {
			type: 'html',
			default: '',
		},
		label: {
			type: 'text',
			default: '',
		},
		link: {
			type: 'url',
			default: '',
		},
		lugarContacto: {
			type: 'text',
			default: '',
		},
		numeroContacto: {
			type: 'number',
			default: '',
		},
		masInformacion: {
			type: 'url',
			default: '',
		},
		image: {
			type: 'object',
			default: {
				url: '',
				alt: ''
			}
		},
		withImage: {
			type: 'boolean',
			default: false
		},
		withClose: {
			type: 'boolean',
			default: false
		},
		type:
		{
			type: 'text',
			default: ''
		},
		alertMode:
		{
			type: 'text',
			default: ''
		},
		id: {
			type: 'string',
			default: '',
		},
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
	})(AlertClass),
	save() {
		return null;
	}
}