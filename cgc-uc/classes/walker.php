<?php

class Desktop_Nav extends Walker_Nav_menu
{

    function start_lvl(&$output, $depth = 0, $args = array())
    { //ul
        $indent = str_repeat("\t", $depth);
        $submenu = ($depth > 0) ? ' sub-menu' : '';
        $output .= "\n$indent<ul class=\"$submenu\">\n";
    }

    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
    { //li a span

        $indent = ($depth) ? str_repeat("\t", $depth) : '';

        $li_attributes = '';
        $class_names = $value = '';

        $classes = empty($item->classes) ? array() : (array)$item->classes;
        if (is_array($args)) {
            $args = (object) $args;
        }
        $classes[] = ($args->walker->has_children) ?? new stdClass();
        $args->walker->has_children = $args->walker->has_children ?? false;
        $args->before = $args->before ?? '';
        $args->link_before = $args->link_before ?? '';
        $args->link_after = $args->link_after ?? '';
        $args->after = $args->after ?? '';
        $classes[] = ($args->walker->has_children) ? '' : '';
        $classes[] = ($item->current) ? 'active' : '';
        $classes[] = 'menu-item-' . $item->ID;
        if ($depth && $args->walker->has_children) {
            $classes[] = 'dropdown-submenu';
        }

        $classes[] = 'nav-item';

        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        $class_names = ' class="' . esc_attr($class_names) . '"';

        $id = apply_filters('nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args);
        $id = strlen($id) ? ' id="' . esc_attr($id) . '"' : '';

        $output .= $indent . '<li' . $id . $value . $class_names . $li_attributes . '>';

        $attributes = !empty($item->attr_title) ? ' title="' . esc_attr($item->attr_title) . '"' : '';
        $attributes .= !empty($item->target) ? ' target="' . esc_attr($item->target) . '"' : '';
        $attributes .= !empty($item->xfn) ? ' rel="' . esc_attr($item->xfn) . '"' : '';
        $attributes .= !empty($item->url) ? ' href="' . esc_attr($item->url) . '"' : '';
        $active = ($item->current || $item->current_item_ancestor) ? ' active' : '';
        $attributes .= ($args->walker->has_children) ? ' class="' . $active . '" data-toggle="dropdown"' : ' class="uc-btn btn-inline' . $active . '"';

        $item_output = $args->before;
        $item_output .= '<a' . $attributes . '>';
        $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;
        $item_output .= ($depth == 0 && $args->walker->has_children) ? ' <b class="caret"></b></a>' : '</a>';
        $item_output .= $args->after;

        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }

    /*
        function end_el(){ // closing li a span

        }

        function end_lvl(){ // closing ul

        }
    */
}


class Mobile_Nav extends Walker_Nav_Menu
{
    private $open = '';

    function start_lvl(&$output, $depth = 0, $args = array())
    {
        // Indentación según la profundidad
        $indent = str_repeat("\t", $depth);
        // Siempre usar 'list-children' como clase para los submenús
        $submenu = 'list-children';
        $output .= "\n$indent<ul class=\"$submenu\">\n";

        // Agregar el enlace de cierre si es necesario
        if (!empty($this->open)) {
            // Enlace de cierre personalizado según la profundidad
            $close_link = '<li class="list-item">
                <a href="#" class="list-close' . ($depth > 0 ? ' text-color--gray' : '') . '">
                    ' . ($depth > 0 ? '<span class="uc-icon">arrow_back_ios</span>' : '<div class="uc-icon icon-size--sm">arrow_back_ios</div>') . $this->open . '
                </a>
            </li>';
            $output .= $close_link;
        }
    }

    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
    {
        // Indentación según la profundidad
        $indent = ($depth) ? str_repeat("\t", $depth) : '';

        $li_attributes = '';
        $class_names = $value = '';

        // Obtener las clases del elemento y agregar 'list-item'
        $classes = empty($item->classes) ? array() : (array)$item->classes;
        $classes[] = 'list-item';

        // Asegurar que $args es un objeto y asignar valores predeterminados
        if (is_array($args)) {
            $args = (object) $args;
        }
        $args->walker = $args->walker ?? new stdClass();
        $args->walker->has_children = $args->walker->has_children ?? false;
        $args->before = $args->before ?? '';
        $args->link_before = $args->link_before ?? '';
        $args->link_after = $args->link_after ?? '';
        $args->after = $args->after ?? '';

        // Agregar 'has-list-children' si el elemento tiene hijos
        if ($args->walker->has_children) {
            $classes[] = 'has-list-children';
        }

        // Construir la cadena de clases
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        $class_names = ' class="' . esc_attr($class_names) . '"';

        // Construir el ID del elemento
        $id = apply_filters('nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args);
        $id = strlen($id) ? ' id="' . esc_attr($id) . '"' : '';

        // Iniciar el elemento <li>
        $output .= $indent . '<li' . $id . $value . $class_names . $li_attributes . '>';

        // Construir los atributos del enlace <a>
        $attributes = !empty($item->attr_title) ? ' title="' . esc_attr($item->attr_title) . '"' : '';
        $attributes .= !empty($item->target) ? ' target="' . esc_attr($item->target) . '"' : '';
        $attributes .= !empty($item->xfn) ? ' rel="' . esc_attr($item->xfn) . '"' : '';

        // Si el elemento tiene hijos, ajustar el enlace y guardar el título para el cierre
        if ($args->walker->has_children) {
            $this->open = apply_filters('the_title', $item->title, $item->ID);
            $attributes .= ' href="#" class="list-open"';
        } else {
            $this->open = '';
            $attributes .= !empty($item->url) ? ' href="' . esc_attr($item->url) . '"' : '';
        }

        // Construir la salida del elemento
        $item_output = $args->before;
        $item_output .= '<a' . $attributes . '>';
        $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;

        // Agregar el icono si el elemento tiene hijos
        if ($args->walker->has_children) {
            $item_output .= ' <i class="uc-icon icon-size--sm">arrow_forward_ios</i>';
        }

        $item_output .= '</a>';
        $item_output .= $args->after;

        // Agregar el elemento al output
        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }


    /*
        function end_el(){ // closing li a span

        }

        function end_lvl(){ // closing ul

        }
    */
}

class Desplegable_Nav extends Walker_Nav_menu
{
    // Almacena temporalmente la URL y título del padre en nivel 0
    private $parent_url  = '';
    private $parent_text = '';

    function start_lvl(&$output, $depth = 0, $args = array())
    {
        $indent = str_repeat("\t", $depth);
        // Clases para cada nivel de submenú
        $submenu = ($depth > 0) ? 'uc-navbar-dropdown_child' : 'uc-navbar-dropdown_menu uc-navbar-dropdown_menu--footer';
        $output .= "\n$indent<ul class=\"$submenu\">\n";
    }

    // Aquí inicias cada <li> y su <a>
    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
    {
        $indent = ($depth) ? str_repeat("\t", $depth) : '';

        $li_attributes = '';
        $class_names   = $value = '';
        $classes       = empty($item->classes) ? array() : (array) $item->classes;

        // Normalizamos $args, para prevenir warnings si vienen en array
        if (is_array($args)) {
            $args = (object) $args;
        }
        $args->walker->has_children = $args->walker->has_children ?? false;
        $args->before     = $args->before     ?? '';
        $args->link_before = $args->link_before ?? '';
        $args->link_after = $args->link_after ?? '';
        $args->after      = $args->after      ?? '';

        // Clases según la profundidad
        switch ($depth) {
            case 0:
                $classes[] = 'nav-item';
                break;
            case 1:
                $classes[] = 'dropdown_item--heading';
                break;
            default:
                $classes[] = 'uc-navbar-dropdown_item';
                break;
        }
        if ($args->walker->has_children && $depth == 0) {
            $classes[] = 'uc-navbar-dropdown';
        }

  
        if ($item->current) {
            $classes[] = 'active';
        }


        $classes[] = 'menu-item-' . $item->ID;
        global $is_dark ;
        $classes[] =  $is_dark ? 'dark' : 'light';

        // Unimos clases
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        $class_names = ' class="' . esc_attr($class_names) . '"';

        // ID del <li>
        $id_attr = apply_filters('nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args);
        $id_attr = strlen($id_attr) ? ' id="' . esc_attr($id_attr) . '"' : '';

        // Iniciamos <li>
        $output .= $indent . '<li' . $id_attr . $value . $class_names . $li_attributes . '>';

        // Atributos del <a>
        $attributes  = !empty($item->attr_title) ? ' title="'  . esc_attr($item->attr_title) . '"' : '';
        $attributes .= !empty($item->target)     ? ' target="' . esc_attr($item->target)     . '"' : '';
        $attributes .= !empty($item->xfn)        ? ' rel="'    . esc_attr($item->xfn)        . '"' : '';

        // Comportamiento: si es nivel 0 y tiene hijos,
        // GUARDAMOS la URL, pero NO la usamos en el href.
        if ($depth === 0 && $args->walker->has_children) {
            $this->parent_url  = !empty($item->url) ? esc_attr($item->url) : '';
            $this->parent_text = apply_filters('the_title', $item->title, $item->ID);
            // Ponemos href="#" o vacío para que no sea clickeable
            $attributes .= ' href="#" class="uc-btn btn-inline"';
        } else {
            // Normal: usar la URL si la hay
            $href = !empty($item->url) ? esc_attr($item->url) : '';
            $attributes .= ' href="' . $href . '" class="uc-btn';
            // Si es depth=0 sin hijos, le agregamos btn-inline
            if ($depth === 0) {
                $attributes .= ' btn-inline';
            }
            $attributes .= '"';
        }

        // Armamos el output final
        $item_output  = $args->before;
        $item_output .= '<a' . $attributes . '>';
        $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;
        

        // Icono de flecha si es padre
        if ($args->walker->has_children && $depth == 0) {
            $is_dark ?  $item_output .= ' <i class="uc-icon icon-color--white">arrow_drop_down</i>' :  $item_output .= ' <i class="uc-icon">arrow_drop_down</i>';
        }
        $item_output .= '</a>';
        $item_output .= $args->after;


        // Filtro final
        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
       
    }

    // Insertar el footer en end_lvl()
    function end_lvl(&$output, $depth = 0, $args = array())
    {
        // Solo nos interesa si estamos cerrando el nivel 0 (el primer submenú)
        if ($depth === 0) {
            // Añadimos un <div> o <li> al final que apunte a la URL del padre
            if (!empty($this->parent_url)) {
                $output .= '
            <div class="dropdown_item--footer">
                <a href="' . $this->parent_url . '" class="uc-btn">
                    Clic para ir a ' . esc_html($this->parent_text) . '
                    <i class="uc-icon uc-icon--arrow-forward ml-4"></i>
                </a>
            </div>';
            }
            // Reseteamos para evitar arrastrar la URL a otros menús
            $this->parent_url  = '';
            $this->parent_text = '';
        }
        // Cerramos el <ul>
        $indent = str_repeat("\t", $depth);
        $output .= "$indent</ul>\n";
    }
}
