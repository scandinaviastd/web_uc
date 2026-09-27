<?php
/**
 * Plugin Name: Advanced Walker Logger
 * Description: A logging system for tracking menu item construction in WordPress.
 * Version: 1.0
 * Author: Your Name
 */

// Define a constant to enable or disable logging
define('ENABLE_WALKER_LOG', true);

// Include necessary files
require_once plugin_dir_path(__FILE__) . 'includes/logger-functions.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-advanced-logger.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-custom-walker.php';

// Initialize the logger
$logger = new Advanced_Logger();
add_action('init', function() use ($logger) {
    if (ENABLE_WALKER_LOG) {
        $logger->initialize();
    }
});
?>