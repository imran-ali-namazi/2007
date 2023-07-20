<?php
function before_render() {
	foreach (am_var('sections') as $slug) {
		$path = am_var('path') . '/' . $slug . '/';
		$extension = '.txt';
		$file = $path . am_var('node') . $extension;
		if (file_exists($file)) {
			am_var('fol', $path);
			am_var('section', $slug);
			$hasDirectory = is_dir($path . am_var('node'));
			am_var('simple-section', !$hasDirectory);
			am_var('file', $file);
			break;
		}
	}
}

function did_render_page() {
	if ($section = am_var('section')) {
		$meta = substr(explode('-->', disk_file_get_contents(am_var('file')))[0], 4);
		echo '<h1>' . humanize(am_var('node')) . '</h1>';
		echo '<h2>' . substr($meta, 0, -9) . '</h2><hr />';
		renderFile(am_var('file'));
		return true;
	}

	return false;
}

function before_file() {
	echo '<hr class="above-header-content" />' . am_var('nl');
	echo '<div id="content" class="content container ' . am_var('node') . '">';
	if (am_var('node') != 'index') echo '<section>';
}

function after_file() {
	if (am_var('node') != 'index') echo '</section>';
	echo '</div>';
}

function site_humanize($txt, $field = 'title') {
	$pages = [
		'yieldmore' => 'YieldMore 2013',
		'pocs' => 'POCs',
	];

	if (array_key_exists($key = strtolower($txt), $pages))
		return $pages[$key];

	return $txt;
}
?>
