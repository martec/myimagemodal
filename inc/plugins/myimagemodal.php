<?php
/**
 * My Image Modal
 * https://github.com/martec
 *
 * Copyright (C) 2015-2015, Martec
 *
 * My Image Modal is licensed under the GPL Version 3, 29 June 2007 license:
 *	http://www.gnu.org/copyleft/gpl.html
 *
 * @fileoverview My Image Modal - Open image link in modal for Mybb
 * @author Martec
 * @requires jQuery and Mybb
 */

// Disallow direct access to this file for security reasons
if(!defined("IN_MYBB"))
{
	die("Direct initialization of this file is not allowed.<br /><br />Please make sure IN_MYBB is defined.");
}

define('MIM_PLUGIN_VER', '1.0.0');

function myimagemodal_info()
{
	global $lang;

	return array(
		'name'			=> 'My Image Modal',
		'description'	=> 'Open image link in modal for Mybb',
		'website'		=> '',
		'author'		=> 'martec',
		'authorsite'	=> '',
		'version'		=> MIM_PLUGIN_VER,
		'compatibility' => '18*'
	);

}

function myimagemodal_activate()
{
	global $db;

	require_once MYBB_ROOT."inc/adminfunctions_templates.php";

	find_replace_templatesets(
		'headerinclude',
		'#' . preg_quote('{$stylesheets}') . '#i',
		'<script type="text/javascript" src="{$mybb->asset_url}/jscripts/myimagemodal.js?ver='.MIM_PLUGIN_VER.'"></script>
{$stylesheets}'
	);
}

function myimagemodal_deactivate()
{
	global $db;
	require_once MYBB_ROOT."inc/adminfunctions_templates.php";

	find_replace_templatesets(
		'headerinclude',
		'#' . preg_quote('<script type="text/javascript" src="{$mybb->asset_url}/jscripts/myimagemodal.js?ver='.MIM_PLUGIN_VER.'"></script>
{$stylesheets}') . '#i',
		'{$stylesheets}'
	);	
}
?>