// import { __ } from '@wordpress/i18n';
import './style.scss';
import Items from './blocks/items';
import Section from './blocks/section';
import Table from './blocks/table';
import Accordion from './blocks/accordion';
import AccordionItem from './blocks/accordion-item';
import Carousel from './blocks/carousel';
//import Schedule from './blocks/schedule';
import Alert from './blocks/alert';
import Divider from './blocks/divider';
import Video from './blocks/video';
import "./page-settings";
/**
 * @property {Object} wp.blocks
 */
const {registerBlockType} = wp.blocks;
registerBlockType('uc-kit/items', Items);
registerBlockType('uc-kit/section', Section);
registerBlockType('uc-kit/table', Table);
registerBlockType('uc-kit/accordion', Accordion);
registerBlockType('uc-kit/accordion-item', AccordionItem);
registerBlockType('uc-kit/carousel', Carousel);
//registerBlockType('uc-kit/schedule', Schedule);
registerBlockType('uc-kit/alert', Alert);
registerBlockType('uc-kit/divider', Divider);
registerBlockType('uc-kit/video', Video);