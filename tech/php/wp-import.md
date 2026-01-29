```
<?php

write_posts(get_pages($db_prefix = 'wp_'), $site_name = 'cselian blog');
write_posts(get_posts($db_prefix), $site_name);

function write_posts($posts, $site_name) {
	$br = '<br />' . PHP_EOL;
	$dir = __DIR__ . '/from-2013/';
	if (!is_dir($dir)) mkdir($dir);

	echo 'Writing to ' .  $site_name . $br;
	foreach ($posts as $ix => $p) {
		$subdir = $dir . ($p['slug'] ? $p['slug'] . '/' : '');
		if ($subdir != $dir) {
			echo 'Writing to ' . $p['slug'] . $br;
			if (!is_dir($subdir)) mkdir($subdir);
		}
		$fil = $subdir . $p['post_name'] . '.txt';
		$id = '<!--post_id: ' . $p['id'] . ' / post_date: ' . $p['post_date'] . '-->' . PHP_EOL;
		$raw = $p['post_content'];
		$raw = str_replace('http://cselian.com/blob/', '[url]', $raw);
		file_put_contents($fil, $id . $raw);
		echo 'Wrote: ' . $fil . $br;
		//	if ($ix == 5) break;
	}
}

// #region db functions

function get_pages($prefix)
{
	$sql = str_replace('%prefix%', $prefix, "
select id, post_name, post_content, '' as slug, p.post_date from %prefix%posts p
	where post_type in ('page') AND post_status = 'publish'");
	return db_select($sql);
}

function get_posts($prefix)
{
	$sql = str_replace('%prefix%', $prefix, "
select id, post_name, post_content, t.slug, p.post_date from %prefix%posts p
	left outer join %prefix%term_relationships r on r.object_id = p.ID
	left outer join %prefix%term_taxonomy tt on r.term_taxonomy_id = tt.term_id
	left outer join %prefix%terms t on t.term_id = tt.term_taxonomy_id
	where post_type in ('post') AND post_status = 'publish' AND tt.taxonomy = 'category'");
	return db_select($sql);
}

function db_select($query)
{
	$db = [ 'username' => 'root', 'password' => '', 'database' => 'cselian_blog' ];

	$mysqli = new mysqli("localhost", $db['username'], $db['password'], $db['database']) or die(mysqli_error());
	if ($mysqli->connect_errno) { printf("Connect failed: %s\n", $mysqli->connect_error); exit(); }

	$result = $mysqli->query($query);
	$rows = $result->fetch_all(MYSQLI_ASSOC);

	$result->free();
	$mysqli->close();

	return $rows;
}
?>
```
