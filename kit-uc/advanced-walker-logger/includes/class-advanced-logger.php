<?php

class Advanced_Logger {
    private $log_file;

    public function __construct() {
        $this->log_file = WP_CONTENT_DIR . '/logs/walker-log.txt';
    }

    public function log($message, $level = 'info') {
        if (!defined('ENABLE_WALKER_LOG') || !ENABLE_WALKER_LOG) {
            return;
        }

        $timestamp = current_time('Y-m-d H:i:s');
        $log_entry = "[$timestamp] [$level] $message" . PHP_EOL;

        file_put_contents($this->log_file, $log_entry, FILE_APPEND);
    }

    public function debug($message) {
        $this->log($message, 'debug');
    }

    public function info($message) {
        $this->log($message, 'info');
    }

    public function warning($message) {
        $this->log($message, 'warning');
    }

    public function error($message) {
        $this->log($message, 'error');
    }
}