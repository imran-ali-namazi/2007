<?php
foreach (am_var('sections') as $slug) {
	$name = humanize($slug);
	echo '<h1>' . $name . '</h1>';
	menu('/' . $slug . '/');
	echo '<hr />';
} ?>
