<?php
global $post;
$blocks = UCKitWP::parsePost($post->post_content);

// O según el archivo, pasas un contexto distinto:
UCKitWP::drawBlocks($blocks, 'home');
?>