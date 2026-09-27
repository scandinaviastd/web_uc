# Advanced Walker Logger

The Advanced Walker Logger is a WordPress plugin designed to enhance the logging capabilities of menu item construction within WordPress themes. By extending the `Walker_Nav_Menu` class, this plugin provides detailed logging of menu items, including their names, CSS classes, depth levels, and IDs.

## Features

- **Logging Levels**: Supports multiple logging levels: debug, info, warning, and error.
- **Custom Walker**: Extends the `Walker_Nav_Menu` class to log menu item construction.
- **Log File**: All logs are stored in a dedicated file located in the `logs` directory.
- **Enable/Disable Logging**: Easily toggle logging on or off using the `ENABLE_WALKER_LOG` constant.

## Installation

1. Download the plugin files and place them in the `wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Optionally, set the `ENABLE_WALKER_LOG` constant in your `wp-config.php` file to enable logging:
   ```php
   define('ENABLE_WALKER_LOG', true);
   ```

## Usage

Once activated, the plugin will automatically log menu item construction events. You can view the logs in the `logs/walker-log.txt` file. The log entries will include:

- **Item Name**: The title of the menu item.
- **CSS Classes**: The classes applied to the menu item.
- **Depth Level**: The depth of the menu item in the hierarchy.
- **Item ID**: The unique ID of the menu item.

## Viewing Logs

To view the logs, simply open the `logs/walker-log.txt` file in a text editor. The logs will be formatted for easy reading, with each entry timestamped and categorized by its logging level.

## Contributing

Contributions are welcome! If you have suggestions for improvements or additional features, please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.