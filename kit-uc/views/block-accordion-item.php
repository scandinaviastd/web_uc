<?php
/**
 * View for Accordion Item
 * Args expected: title, innerBlocks, context (optional), itemTitleTag (optional), parentId (id of accordion), index
 */
// If we are strictly following the pattern where render logic is in the view:
// We need to know the parent ID to link the collapse. 
// AND we need to render the inner content.
// NOTE: arguments passed from uc-kit.php need to be ensured.
$title = $args['title'] ?? '';
$itemTitleTag = $args['itemTitleTag'] ?? 'h3';
$innerBlocks = $args['innerBlocks'] ?? [];
$parentId = $args['parentId'] ?? uniqid('acc-');
$index = $args['index'] ?? 0;
$collapseId = "col-{$parentId}-{$index}";
// Render inner content
// Since we are inside a view and might not have access to UCKitWP::kitPageDraw easily unless it's static (which it is).
// We'll capture the output of inner blocks.
ob_start();
if (!empty($innerBlocks)) {
    foreach ($innerBlocks as $childBlock) {
        // Use UCKitWP to draw child blocks (paragraphs, images, etc)
        // Ensure class exists
        if (class_exists('UCKitWP')) {
            UCKitWP::kitPageDraw($childBlock);
        } else {
            // Fallback for standard rendering if something is wrong
            echo apply_filters('the_content', render_block($childBlock));
        }
    }
}
$content = ob_get_clean();
?>
<div class="uc-collapse uc-card">
    <a class="uc-collapse_heading" data-collapse="<?php echo $collapseId ?>">
        <?php echo "<{$itemTitleTag} class='h4'>"; ?><?php echo $title ?><?php echo "</{$itemTitleTag}>"; ?>
        <span class="uc-btn btn-inline ml-auto"><i class="uc-icon icon-shape--rounded">keyboard_arrow_down</i></span>
    </a>
    <div class="uc-collapse_body" data-toggle="<?php echo $collapseId ?>">
        <div class="uc-card_body">
            <?php echo $content; ?>
        </div>
    </div>
</div>