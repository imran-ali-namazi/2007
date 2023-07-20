<?php

include_once 'functions.php';
am_var('local', $local = startsWith($_SERVER['HTTP_HOST'], 'localhost'));

bootstrap([
	'name' => 'Cselian Tech',
	'byline' => 'All things of Imran Ali Namazi, since 2005',
	'safeName' => 'amadeus',
	
	'version' => [ 'id' => '1', 'date' => '15 Mar 2023', ],

	'folder' => 'content/',
	'support_page_parameters' => true,
	'sections' => [
		'yieldmore',
		'writing',
		'pocs',
		'shared',
		'tech',
	],

	'start_year' => '2005',
	'theme' => 'biz-land',
	//'image-in-logo' => '-logo.png?fver=3',

	'styles' => ['styles'],
	'google-analytics' => 'UA-166048963-1',

	'uses' => 'custom-image-background',
	'banner' => 'featured-services',

	'email' => 'team@yieldmore.org',
	'phone' => '+919841223313',
	'address' => 'Devakalam,<br />Chennai, India',

	'social' => [
	],

	'url' => $local ? replace_vars('http://localhost%port%/cselian/', 'port') : 'https://cselian.com/',
	'path' => SITEPATH,
]);

$fwe = SITEPATH . '/pocs/' . am_var('node') . '.';
if (disk_one_of_files_exist($fwe)) am_var('folder', 'pocs/'); //this way, render will search here and we dont need a complex did_render_page supporting multiple extensions

render();
?>
