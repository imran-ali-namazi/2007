<ul class="nav-menu">
<?php
menu('/content/', ['no-ul'=>true, 'exclude-files' => ['wp-import']]);
foreach (am_var('sections') as $slug) {
	$name = humanize($slug);
	echo '<li class="drop-down"><a>' . $name . '</a>';
	menu('/' . $slug . '/');
	echo '</li>';
} ?>

</ul>
