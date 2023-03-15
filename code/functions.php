<?php
function before_render() {
}

function before_file() {
	echo '<div id="content" class="content container ' . am_var('node') . '">';
	if (am_var('node') != 'index') echo '<section>';
}

function after_file() {
	if (am_var('node') != 'index') echo '</section>';
	echo '</div>';
}
?>
