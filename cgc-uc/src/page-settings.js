const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { ToggleControl } = wp.components;
const { useSelect, useDispatch } = wp.data;
const { __ } = wp.i18n;

const LocalMenuToggle = () => {
  const postType = useSelect((select) =>
    select("core/editor").getCurrentPostType(),
  );
  const meta = useSelect(
    (select) => select("core/editor").getEditedPostAttribute("meta") || {},
  );
  const { editPost } = useDispatch("core/editor");

  if (postType !== "page") {
    return null;
  }

  const isEnabled =
    meta._uc_local_menu_enabled !== undefined
      ? meta._uc_local_menu_enabled
      : true;

  return (
    <PluginDocumentSettingPanel
      name="uc-local-menu-panel"
      title={__("Configuración de página", "kit-uc")}
    >
      <ToggleControl
        label={__("Menú local", "kit-uc")}
        help={
          isEnabled
            ? __(
              "El menú local se mostrará en esta página.",
              "kit-uc",
            )
            : __(
              "El menú local estará oculto en esta página.",
              "kit-uc",
            )
        }
        checked={!!isEnabled}
        onChange={(value) =>
          editPost({ meta: { _uc_local_menu_enabled: value } })
        }
      />
    </PluginDocumentSettingPanel>
  );
};

registerPlugin("uc-local-menu", { render: LocalMenuToggle });
