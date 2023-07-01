<ul class="nav-menu">
<?php
menu('/content/', ['no-ul'=>true, 'exclude-files' => ['wp-import']]);
foreach (am_var('items-with-submenu') as $slug) {
	$name = humanize($slug);
	echo '<li class="drop-down"><a>' . $name . '</a>';
	menu('/content/' . $slug . '/');
	echo '</li>';
} ?>

</ul>