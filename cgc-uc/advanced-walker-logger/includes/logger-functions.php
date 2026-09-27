<?php

function log_walker_event($message, $level = 'info') {
    if (!defined('ENABLE_WALKER_LOG') || !ENABLE_WALKER_LOG) {
        return;
    }

    // Include the Advanced_Logger class
    if (!class_exists('Advanced_Logger')) {
        require_once plugin_dir_path(__FILE__) . 'class-advanced-logger.php';
    }

    $logger = new Advanced_Logger();
    switch ($level) {
        case 'debug':
            $logger->log_debug($message);
            break;
        case 'info':
            $logger->log_info($message);
            break;
        case 'warning':
            $logger->log_warning($message);
            break;
        case 'error':
            $logger->log_error($message);
            break;
        default:
            $logger->log_info($message);
            break;
    }
}