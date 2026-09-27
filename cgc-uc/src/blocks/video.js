import React from 'react';
import '../editor.scss';
const { Component, Fragment } = wp.element;
const { TextControl, SelectControl } = wp.components;
const { InspectorControls } = wp.editor;

class VideoClass extends Component {

	constructor(props) {
		super(...arguments);
		this.props = props;
		this.id = 0;
		if (!this.props.attributes.id) {
			this.generateUniqueId();
		}
	}

	selectChange(type, text) {
		const json = {};
		json[type] = text;
		this.props.setAttributes(json);
	}

	generateUniqueId() {
		const uniqueId = `video-${Math.floor(Math.random() * 999999)}`;
		this.props.setAttributes({ id: uniqueId });
	}

	getEmbedUrl(url) {
		if (!url) {
			return '';
		}
		if (strpos(url, 'youtube.com') !== -1 || strpos(url, 'youtu.be') !== -1) {
			const matchShort = url.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/);
			if (matchShort) {
				return `//www.youtube.com/embed/${matchShort[1]}`;
			}
			const matchLong = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9\-_]+)/);
			if (matchLong) {
				return `//www.youtube.com/embed/${matchLong[1]}`;
			}
		}
		return url;
	}

	render() {
		const self = this;
		const { className } = this.props;
		const attrs = this.props.attributes;
		const size = attrs.size || 'medium';
		const embedUrl = self.getEmbedUrl(attrs.url);

		return (
			<Fragment>
				<InspectorControls>
					<div style={{ padding: '12px' }}>
						<TextControl
							label="URL del video (YouTube, Vimeo u otro)"
							value={attrs.url || ''}
							onChange={(text) => self.selectChange('url', text)}
							type="url"
							placeholder="https://www.youtube.com/watch?v=..."
						/>
						<SelectControl
							label="Tamaño del video"
							value={size}
							options={[
								{ label: 'Pequeño (480px)', value: 'small' },
								{ label: 'Mediano (720px)', value: 'medium' },
								{ label: 'Grande (960px)', value: 'large' },
								{ label: 'Completo (100%)', value: 'full' },
							]}
							onChange={(text) => self.selectChange('size', text)}
						/>
						<TextControl
							label="Caption (opcional)"
							value={attrs.caption || ''}
							onChange={(text) => self.selectChange('caption', text)}
						/>
					</div>
				</InspectorControls>
				<div className={className}>
					<div className="title">
						<h3>Kit UC Video</h3>
					</div>
					{embedUrl ? (
						<figure className={`uc-media-frame uc-video uc-video--${size}`}>
							<div className="uc-video__ratio">
								<iframe src={embedUrl} allowfullscreen></iframe>
							</div>
							{attrs.caption ? (
								<div className="caption d-flex flex-row mt-12 align-items-center">
									<span>{attrs.caption}</span>
									&nbsp;&nbsp;
									<a target="_blank" href={attrs.url} className="uc-btn text-weight--bold">
										Ver más
										&nbsp;
										<i className="uc-icon icon-size--sm">launch</i>
									</a>
								</div>
							) : null}
						</figure>
					) : (
						<p style={{ padding: '1rem', background: '#f5f5f5', border: '1px dashed #ccc' }}>
							Ingresa una URL de video (YouTube o Vimeo) en el panel lateral.
						</p>
					)}
				</div>
			</Fragment>
		);
	}
}

function strpos(haystack, needle) {
	return haystack.indexOf(needle) !== -1;
}

export default {
	title: 'Kit UC Video',
	description: 'Componente de video con marco Kit Digital y tamaño configurable',
	category: 'common',
	icon: 'video-alt3',
	keywords: ['uc', 'kit', 'video', 'youtube', 'vimeo'],
	attributes: {
		url: {
			type: 'string',
			default: '',
		},
		size: {
			type: 'string',
			default: 'medium',
		},
		caption: {
			type: 'string',
			default: '',
		},
		id: {
			type: 'string',
			default: '',
		},
	},
	edit: VideoClass,
	save() {
		return null;
	}
}