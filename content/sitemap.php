<?php
foreach (am_var('items-with-submenu') as $slug) {
	$name = humanize($slug);
	echo '<h1>' . $name . '</h1>';
	menu('/content/' . $slug . '/');
	echo '<hr />';
} ?>