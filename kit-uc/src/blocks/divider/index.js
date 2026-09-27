const { __ } = wp.i18n;
export default {
  title: __("Divisor UC Kit", "starter-block"),
  icon: "minus",
  category: "kit-uc",
  edit: function () {
    return wp.element.createElement("hr", {
      style: {
        border: 0,
        height: "1px",
        width: "100%",
        overflow: "hidden",
        background: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjEiIHZpZXdCb3g9IjAgMCA4IDEiPiAgPHBvbHlnb24gZmlsbD0iI2QwZDVkZCIgZmlsbC1ydWxlPSJldmVub2RkIiBwb2ludHM9IjAgMSAwIDAgMyAwIDMgMSIvPjwvc3ZnPg==) center center repeat",
        margin: "8px 0",
      },
    });
  },
  save: function () {
    return null; // Componente renderizado por PHP
  },
};
