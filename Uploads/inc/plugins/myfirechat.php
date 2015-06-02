<?php
/**
 *  MyFireChat Plugin
 *
 *  A Firebase chat plugin for myBB.
 *
 * @package MyFireChat
 * @author  Jacque Schrag and Jared Short
 * @license http://www.gnu.org/licenses/
 * @version 1.01
 */

// Make sure we can't access this file directly from the browser.
if(!defined('IN_MYBB'))
{
	die('This file cannot be accessed directly.');
}

$plugins->add_hook('global_intermediate', 'myfirechat_global');
$plugins->add_hook('index_start', 'myfirechat_index');
$plugins->add_hook('misc_start', 'myfirechat_misc');

function myfirechat_info()
{
	global $lang;
	$lang->load('myfirechat');

	return array(
		'name'			=> 'My Fire Chat',
		'description'	=> $lang->myfirechat_desc,
		'website'		=> 'https://github.com/jnschrag/MyFireChat',
		'author'		=> 'Jacque Schrag & Jared Short',
		'authorsite'	=> 'https://github.com/jnschrag',
		'version'		=> '1.01',
		'compatibility'	=> '18*',
		'codename'		=> 'myfirechat'
	);
}

// Activate: Install Settings & Templates
function myfirechat_activate()
{
	global $db, $lang;
	$lang->load('myfirechat');

	// Settings group array details
	$group = array(
		'name' => 'myfirechat',
		'title' => $db->escape_string($lang->setting_group_myfirechat),
		'description' => $db->escape_string($lang->setting_group_myfirechat_desc),
		'disporder' => 1,
		'isdefault' => 0
	);
	
	$gid = $db->insert_query("settinggroups", $group);

	// add settings
	$settings = array(
		'myfirechat_chat_enabled'	=> array(
			'title'			=> $lang->setting_myfirechat_chat_enabled,
			'description' 	=> $lang->setting_myfirechat_chat_enabled_desc,
			'optionscode'	=> 'yesno',
			'value'			=> 1,
        	'disporder' 	=> 1
		),
		'myfirechat_firebase_url' => array(
			'title'			=> $lang->setting_myfirechat_firebase_url,
			'description' 	=> $lang->setting_myfirechat_firebase_url_desc,
			'optionscode'	=> 'text',
			'value'			=> '',
			'disporder'		=> 2
		),
		'myfirechat_firebase_secret' => array(
			'title'			=> $lang->setting_myfirechat_firebase_secret,
			'description' 	=> $lang->setting_myfirechat_firebase_secret_desc,
			'optionscode'	=> 'text',
			'value'			=> '',
			'disporder'		=> 3
		),
		'myfirechat_global_chat_enabled' => array(
			'title'			=> $lang->setting_myfirechat_global_chat_enabled,
			'description' 	=> $lang->setting_myfirechat_global_chat_enabled_desc,
			'optionscode'	=> 'yesno',
			'value'			=> 0,
			'disporder'		=> 4
		),
		'myfirechat_moderator_groups' => array(
			'title'			=> $lang->setting_myfirechat_moderator_groups,
			'description' 	=> $lang->setting_myfirechat_moderator_groups_desc,
			'optionscode'	=> 'groupselect',
			'value'			=> '3,4,6',
			'disporder'		=> 5
		),
		'myfirechat_moderator_users' => array(
			'title'			=> $lang->setting_myfirechat_moderator_users,
			'description' 	=> $lang->setting_myfirechat_moderator_users_desc,
			'optionscode'	=> 'text',
			'value'			=> '',
			'disporder'		=> 6
		),
		'myfirechat_displayname_username' => array(
			'title'			=> $lang->setting_myfirechat_displayname_username,
			'description' 	=> $lang->setting_myfirechat_displayname_username_desc,
			'optionscode'	=> 'yesno',
			'value'			=> '1',
			'disporder'		=> 7
		),
		'myfirechat_displayname_custom' => array(
			'title'			=> $lang->setting_myfirechat_displayname_custom,
			'description' 	=> $lang->setting_myfirechat_displayname_custom_desc,
			'optionscode'	=> 'text',
			'value'			=> '',
			'disporder'		=> 8
		),
		'myfirechat_defaultroom' => array(
			'title'			=> $lang->setting_myfirechat_defaultroom,
			'description' 	=> $lang->setting_myfirechat_defaultroom_desc,
			'optionscode'	=> 'text',
			'value'			=> '',
			'disporder'		=> 9
		),
		'myfirechat_enable_avatar' => array(
			'title'			=> $lang->setting_myfirechat_enable_avatar,
			'description' 	=> $lang->setting_myfirechat_enable_avatar_desc,
			'optionscode'	=> 'yesno',
			'value'			=> '1',
			'disporder'		=> 10
		),
		'myfirechat_enable_smilies' => array(
			'title'			=> $lang->setting_myfirechat_enable_smilies,
			'description' 	=> $lang->setting_myfirechat_enable_smilies_desc,
			'optionscode'	=> 'yesno',
			'value'			=> '1',
			'disporder'		=> 11
		),
		'myfirechat_enable_basic_mycode' => array(
			'title'			=> $lang->setting_myfirechat_enable_basic_mycode,
			'description' 	=> $lang->setting_myfirechat_enable_basic_mycode_desc,
			'optionscode'	=> 'yesno',
			'value'			=> '1',
			'disporder'		=> 12
		),
		'myfirechat_enable_custom_mycode' => array(
			'title'			=> $lang->setting_myfirechat_enable_custom_mycode,
			'description' 	=> $lang->setting_myfirechat_enable_custom_mycode_desc,
			'optionscode'	=> 'yesno',
			'value'			=> '1',
			'disporder'		=> 13
		),
		'myfirechat_enable_filter' => array(
			'title'			=> $lang->setting_myfirechat_enable_filter,
			'description' 	=> $lang->setting_myfirechat_enable_filter_desc,
			'optionscode'	=> 'yesno',
			'value'			=> '1',
			'disporder'		=> 14
		),
		'myfirechat_flood_control' => array(
			'title'			=> $lang->setting_myfirechat_flood_control,
			'description' 	=> $lang->setting_myfirechat_flood_control_desc,
			'optionscode'	=> 'text',
			'value'			=> '0',
			'disporder'		=> 15
		),
		'myfirechat_max_messages' => array(
			'title'			=> $lang->setting_myfirechat_max_messages,
			'description' 	=> $lang->setting_myfirechat_max_messages_desc,
			'optionscode'	=> 'text',
			'value'			=> '15',
			'disporder'		=> 16
		),
		'myfirechat_max_messages_length' => array(
			'title'			=> $lang->setting_myfirechat_max_messages_length,
			'description' 	=> $lang->setting_myfirechat_max_messages_length_desc,
			'optionscode'	=> 'text',
			'value'			=> '400',
			'disporder'		=> 17
		),
		'myfirechat_max_room_name' => array(
			'title'			=> $lang->setting_myfirechat_max_room_name,
			'description' 	=> $lang->setting_myfirechat_max_room_name_desc,
			'optionscode'	=> 'text',
			'value'			=> '30',
			'disporder'		=> 18
		),
		'myfirechat_guest_enabled' => array(
			'title'			=> $lang->setting_myfirechat_guest_enabled,
			'description' 	=> $lang->setting_myfirechat_guest_enabled_desc,
			'optionscode'	=> 'yesno',
			'value'			=> '0',
			'disporder'		=> 19
		)
	);

	foreach($settings as $name => $setting)
	{
	    $setting['name'] = $name;
	    $setting['gid'] = $gid;

	    $db->insert_query('settings', $setting);
	}
	
	// This is required so it updates the settings.php file as well and not only the database - they must be synchronized!
	rebuild_settings();

	// Include this file because it is where find_replace_templatesets is defined
	require_once MYBB_ROOT.'inc/adminfunctions_templates.php';
	
	// Edit the index template and add our variable to above {$forums}
	find_replace_templatesets('index', '#'.preg_quote('{$forums}').'#', "{\$forums}\n{\$myfirechat}");
	find_replace_templatesets('headerinclude', '/$/', '{$myfirechat_header_scripts}');

	// Add Templates
	$new_template['myfirechat_header_scripts'] = '<script src="https://cdn.firebase.com/js/client/2.0.2/firebase.js"></script>
						<script type="text/javascript" src="{$mybb->asset_url}/inc/plugins/myfirechat/javascript/firechat.js"></script>
						<script type="text/javascript" src="{$mybb->asset_url}/inc/plugins/myfirechat/javascript/myfirechat.js"></script>
						<link type="text/css" rel="stylesheet" href="{$mybb->asset_url}/inc/plugins/myfirechat/css/firechat.css" />';

	$new_template['myfirechat_index'] = '<div id="myfirechat_wrapper"></div>';
	$new_template['myfirechat_global'] = '<div id="myfirechat_wrapper"></div>';

	$new_template['myfirechat_misc'] = '<html>
	<head>
	<title>{$mybb->settings[\'bbname\']} - {$lang->myfirechat}</title>
	{$headerinclude}
	</head>
	<body>
	{$header}
	<div id="myfirechat_wrapper"></div>
	{$footer}
	</body>
	</html>';

	$new_template['myfirechat_popup'] = '<html>
	<head>
	<title>{$mybb->settings[\'bbname\']} - {$lang->myfirechat}</title>
	{$headerinclude}
	</head>
	<body>
	<div class="myfirechat_popup_wrapper">
		<div id="myfirechat_wrapper"></div>
	</div>
	</body>
	</html>';

	$new_template['myfirechat_help_modal'] = '<div class="modal">
	<div style="overflow-y: auto; max-height: 400px;">
		<table cellspacing="{$theme[\'borderwidth\']}" cellpadding="{$theme[\'tablespace\']}" border="0" class="tborder">
			<tr>
				<td class="thead" colspan="3">
					<div><strong>{$lang->myfirechat_help_title}</strong></div>
				</td>
			</tr>
			<tr>
				<td class="tcat">
					Action
				</td>
				<td class="tcat">
					Command Input
				</td>
				<td class="tcat">
					Result
				</td>
			</tr>
			<tr>
				<td class="trow1">
					Dice Roller
				</td>
				<td class="trow1">
					/roll #
				</td>
				<td class="trow1">
					Username rolls a d# and gets (random #).
				</td>
			</tr>
			<tr>
				<td class="trow1">
					Me
				</td>
				<td class="trow1">
					/me (action)
				</td>
				<td class="trow1">
					<em>Username (action).</em>
				</td>
			</tr>
			<tr>
				<td class="trow1">
					Help
				</td>
				<td class="trow1">
					/help
				</td>
				<td class="trow1">
					Displays chat help modal.
				</td>
			</tr>
			<tr>
				<td class="trow1" colspan="3">
					{$smilies_enabled}
					{$basic_mycode_enabled}
					{$custom_mycode_enabled}
				</td>
			</tr>
		</table>
	</div>
	</div>
	';

	foreach($new_template as $title => $template)
	{
		$new_template = array('title' => $db->escape_string($title), 'template' => $db->escape_string($template), 'sid' => '-1', 'version' => '1800', 'dateline' => TIME_NOW);
		$db->insert_query('templates', $new_template);
	}
}

// Deactivate: Delete Templates & Template Edits
function myfirechat_deactivate()
{
	global $db;
	require_once MYBB_ROOT.'inc/adminfunctions_templates.php';

	// Remove templates
	$db->delete_query("templates", "title LIKE 'myfirechat_%'");
	
	// remove template edits
	find_replace_templatesets('index', '#'.preg_quote('{$myfirechat}').'#', '');
	find_replace_templatesets('headerinclude', "#" . preg_quote('{$myfirechat_header_scripts}') . "#i", '');
}

// Uninstall: Delete Settings
function myfirechat_uninstall()
{
	global $db, $mybb;

	if($mybb->request_method != 'post')
	{
		global $page, $lang;
		$lang->load('myfirechat');

		$page->output_confirm_action('index.php?module=config-plugins&action=deactivate&uninstall=1&plugin=myfirechat', $lang->myfirechat_uninstall_message, $lang->myfirechat_uninstall);
	}


	// Remove settings
	$query = $db->simple_select("settinggroups", "gid", "name='myfirechat'");
    $gid = $db->fetch_field($query, 'gid');
    $db->delete_query("settinggroups", "gid='".$gid."'");
    $db->delete_query("settings", "gid='".$gid."'");

	// This is required so it updates the settings.php file as well and not only the database - they must be synchronized!
	rebuild_settings();

}

// Adds MyFireChat's Javascript and CSS files to headerinclude template
$plugins->add_hook('global_start', 'myfirechat_global_start');
function myfirechat_global_start()
{
    global $mybb, $templatelist, $templates, $myfirechat_header_scripts;
    if (isset($templatelist)) {
        $templatelist .= ',';
    }
    $templatelist .= 'myfirechat_header_scripts';
    
    $myfirechat_header_scripts = eval($templates->render('myfirechat_header_scripts'));
}

// Displays chat on the index of the forum
function myfirechat_index()
{
	global $mybb;

	// Only run this function is the setting is set to yes
	if($mybb->settings['myfirechat_chat_enabled'] == 0)
	{
		return;
	}

	global $db, $lang, $templates, $templatelist, $myfirechat, $theme;

	// Load our language file
	$lang->load('myfirechat');

	if (isset($templatelist)) {
        $templatelist .= ',';
    }
    $templatelist .= 'myfirechat_index';

	// Set $myfirechat as our template and use eval() to do it so we can have our variables parsed
	$myfirechat = eval($templates->render('myfirechat_index'));
}

// Displays chat globally in either the header or the footer of the site
function myfirechat_global()
{
	global $mybb;

	// Only run this function is the setting is set to yes
	if($mybb->settings['myfirechat_chat_enabled'] == 0 && $mybb->settings['myfirechat_global_chat_enabled'] == 0)
	{
		return;
	}

	global $db, $lang, $templates, $templatelist, $myfirechat, $theme;

	// Load our language file
	$lang->load('myfirechat');

	if (isset($templatelist)) {
        $templatelist .= ',';
    }
    $templatelist .= 'myfirechat_global';

	// Set $myfirechat as our template and use eval() to do it so we can have our variables parsed
	$myfirechat = eval($templates->render('myfirechat_global'));
}

// Displays chat at misc.php?action=chat & misc.php?action=chatpopup. Also displays the help command modal
function myfirechat_misc()
{
	global $mybb;

	// Only run this function is the setting is set to yes
	if($mybb->settings['myfirechat_chat_enabled'] == 0)
	{
		return;
	}

	if($mybb->input['action'] == "chat") {
		global $lang, $templates, $templatelist, $headerinclude, $header, $footer, $myfirechat;

		if (isset($templatelist)) {
	        $templatelist .= ',';
	    }
	    $templatelist .= 'myfirechat_misc';

		$lang->load('myfirechat');

		add_breadcrumb($lang->myfirechat_page_title, 'misc.php?action=chat');

		$myfirechat = eval($templates->render('myfirechat_misc'));
		output_page($myfirechat);
	}
	elseif($mybb->input['action'] == "chatpopup") {
		global $lang, $templates, $templatelist, $headerinclude, $myfirechat;

		if (isset($templatelist)) {
	        $templatelist .= ',';
	    }
	    $templatelist .= 'myfirechat_chatpopup';

		$lang->load('myfirechat');

		$myfirechat = eval($templates->render('myfirechat_popup'));
		output_page($myfirechat);
	}
	elseif($mybb->input['action'] == "chat_help") {
		global $lang, $templates, $templatelist, $headerinclude, $theme, $myfirechat;

		if (isset($templatelist)) {
	        $templatelist .= ',';
	    }
	    $templatelist .= 'myfirechat_help_modal';

		$lang->load('myfirechat');

		//Check if Smilies, myCode, and custom myCode is enabled
		if($mybb->settings['myfirechat_enable_smilies'] == 1) {
			$smilies_enabled = $lang->myfirechat_help_smilies_enabled;
		}

		if($mybb->settings['myfirechat_enable_basic_mycode'] == 1) {
			$basic_mycode_enabled = $lang->myfirechat_help_basic_mycode_enabled;
		}

		if($mybb->settings['myfirechat_enable_custom_mycode'] == 1) {
			$custom_mycode_enabled = $lang->myfirechat_help_custom_mycode_enabled;
		}

		eval("\$myfirechat = \"".$templates->get("myfirechat_help_modal", 1, 0)."\";");
		echo $myfirechat;
		exit;
	}
}


// Add Viewing Chat to Who's Online List
$plugins->add_hook("fetch_wol_activity_end", "myfirechat_wol");
$plugins->add_hook("build_friendly_wol_location_end", "myfirechat_friendly_location");

function myfirechat_wol($user_activity)
{
    global $db, $mybb, $parameters, $filename, $user, $location;
    if(strpos($user_activity['location'], "misc.php?action=chat"))
    {
        $user_activity['activity'] == "myfirechat";
    }
    return $user_activity;
}
function myfirechat_friendly_location($array)
{
    global $db, $mybb, $user_activity, $parameters, $gid_list, $location_name, $conid_list, $cache;
    
    if($array['user_activity']['location'] == "/misc.php?action=chat")
    {
        $array['location_name'] = "Viewing <a href='/misc.php?action=chat'>Chat</a>";
    }
    return $array;
}

// Adds a hash for guest users
function incrementalHash($seed, $len = 6){
  $hash_full = md5($seed); //hash('sha256', $id);
  $hash_cropped = substr($hash_full, 0, $len);

  return $hash_cropped;
}

// Hook into myBB's ajax call for chat authentication
$plugins->add_hook('xmlhttp', 'myfirechat_ajax');

function myfirechat_ajax()
{
    global $mybb, $charset;

    if($mybb->get_input('action') == 'myfirechat_auth')
    {

    	// Generate Firebase Token and get Firebase URL
    	include_once "myfirechat/FirebaseToken.php";
  		$tokenGen = new Services_FirebaseTokenGenerator($mybb->settings["myfirechat_firebase_secret"]);
  		$firebase = new FirebaseLib($mybb->settings["myfirechat_firebase_url"], $mybb->settings["myfirechat_firebase_secret"]);

  		// Check for if we allow guest posting. If we do, we need to authenticate them.
  		if($mybb->user['uid'] == 0) {

  			if($mybb->settings['myfirechat_guest_enabled'] == 1) {



	  			$uidHash = incrementalHash($mybb->session['sid']);

	  			$token = $tokenGen->createToken(array("uid" => 'myfirechat:anonymous-'.$uidHash, "displayName" => 'Anonymous'.$uidHash));
		  		$url = $mybb->settings["myfirechat_firebase_url"];

		  		$data = array('token' => $token, 'url' => $url, 'defaultroom'=> $mybb->settings["myfirechat_defaultroom"], 'numMaxMessages' => $mybb->settings['myfirechat_max_messages'], 'maxLengthRoomName' => $mybb->settings['myfirechat_max_room_name'], 'maxLengthMessage' => $mybb->settings['myfirechat_max_messages_length'], 'limitWaitTime' => $mybb->settings['myfirechat_flood_control']);

		  		header("Content-type: application/json; charset={$charset}");
		        echo json_encode($data);

		        exit;

		    }

  		}
  		else {
	    	// Check for Custom Display Name, otherwise default to username
	    	if($mybb->settings["myfirechat_displayname_username"] == 0) {
	    		$custom = 'fid'.$mybb->settings['myfirechat_displayname_custom'];
	    		if($mybb->user[$custom] != "") {
	    			$displayName = $mybb->user[$custom];
	    		}
	    		else {
	    			$displayName = $mybb->user['username'];
	    		}
	    	}
	    	else {
	    		$displayName = $mybb->user['username'];
	    	}

	    	if($mybb->settings["myfirechat_enable_avatar"] == 1) {
	    		$avatar = $mybb->user['avatar'];
	    	}
	    	else {
	    		$avatar = "";
	    	}


	    	// We could make this configurable
	    	$myfirechatuid = 'myfirechat:'.$mybb->user['uid'];

	  		$token = $tokenGen->createToken(array("uid" => $myfirechatuid, "displayName" => $displayName, "avatar" => $avatar));
	  		$url = $mybb->settings["myfirechat_firebase_url"];


	  		// Check if the user is a moderator of chat, if so, tell Firebase
	  		// Check if user's UID is set to be a chat moderator
	  		$moderatorPath = 'moderators/'.$myfirechatuid;
	  		$modusers = explode(",",$mybb->settings['myfirechat_moderator_users']);
	  		if(in_array($mybb->user['uid'], $modusers))
	  		{
	  			$response = $firebase->set($moderatorPath, true);
	  		}
	  		else {
	  			$firebase->delete($moderatorPath);
	  		}

	  		// Check if user is a part of the groups set to be a chat moderator
	  		$modgroups = explode(",",$mybb->settings['myfirechat_moderator_groups']);
	  		if(in_array($mybb->user['usergroup'],$modgroups))
	  		{
	  			$response = $firebase->set($moderatorPath, true);
	  		}
	  		else {
	  			$firebase->delete($moderatorPath);
	  		}
	  		
	  		// Create JSON array
	  		$data = array('token' => $token, 'url' => $url, 'defaultroom'=> $mybb->settings["myfirechat_defaultroom"], 'numMaxMessages' => $mybb->settings['myfirechat_max_messages'], 'maxLengthRoomName' => $mybb->settings['myfirechat_max_room_name'], 'maxLengthMessage' => $mybb->settings['myfirechat_max_messages_length'], 'limitWaitTime' => $mybb->settings['myfirechat_flood_control']);

	  		header("Content-type: application/json; charset={$charset}");
	        echo json_encode($data);

	        exit;
	  	}

    }

    if($mybb->get_input('action') == 'myfirechat_mybbcodes')
    {

  		$mycode = array();

  		// Basic MyCode Enabled?
  		if($mybb->settings["myfirechat_enable_basic_mycode"] == 1) {
  			$mycode[] = enableBasicMyCode();
  		}

  		// Custom MyCode Enabled?
  		if($mybb->settings["myfirechat_enable_custom_mycode"] == 1) {
  			$mycode[] = enableCustomMyCode();
  		}

  		header("Content-type: application/json; charset={$charset}");
        echo json_encode($mycode);

        exit;
    }

    if($mybb->get_input('action') == 'myfirechat_smilies')
    {

  		// Smilies Enabled?
  		if($mybb->settings["myfirechat_enable_smilies"] == 1) {
  			$smilies = enableSmilies();
  		}

  		header("Content-type: application/json; charset={$charset}");
        echo json_encode($smilies);

        exit;
    }

    if($mybb->get_input('action') == 'myfirechat_wordfilter')
    {

  		// Smilies Enabled?
  		if($mybb->settings["myfirechat_enable_filter"] == 1) {
  			$filter = enableWordFilter();
  		}

  		header("Content-type: application/json; charset={$charset}");
        echo json_encode($filter);

        exit;
    }
}

function enableSmilies() {
	global $cache;
	$smilies = $cache->read('smilies');
	return $smilies;
}

function enableCustomMyCode() {
	global $cache;
	$mycode = $cache->read('mycode');
	return $mycode;
}

function enableBasicMyCode() {
	$standard_mycode = array();

	$standard_mycode['b']['regex'] = "/\[b\](.*?)\[\/b\]/si";
	$standard_mycode['b']['replacement'] = "<span style=\"font-weight: bold;\">$1</span>";

	$standard_mycode['u']['regex'] = "/\[u\](.*?)\[\/u\]/si";
	$standard_mycode['u']['replacement'] = "<span style=\"text-decoration: underline;\">$1</span>";

	$standard_mycode['i']['regex'] = "/\[i\](.*?)\[\/i\]/si";
	$standard_mycode['i']['replacement'] = "<span style=\"font-style: italic;\">$1</span>";

	$standard_mycode['s']['regex'] = "/\[s\](.*?)\[\/s\]/si";
	$standard_mycode['s']['replacement'] = "<del>$1</del>";

	$standard_mycode['copy']['regex'] = "/\(c\)/i";
	$standard_mycode['copy']['replacement'] = "&copy;";

	$standard_mycode['tm']['regex'] = "/\(tm\)/i";
	$standard_mycode['tm']['replacement'] = "&#153;";

	$standard_mycode['reg']['regex'] = "/\(r\)/i";
	$standard_mycode['reg']['replacement'] = "&reg;";

	$standard_mycode['color']['regex'] = "/\[color=([a-zA-Z]*|\#?[\da-fA-F]{3}|\#?[\da-fA-F]{6})](.*?)\[/color\]/si";
	$standard_mycode['color']['replacement'] = "<span style=\"color: $1;\">$2</span>";

	return $standard_mycode;
}

function enableWordFilter() {
	global $cache;
	$filter = $cache->read('badwords');
	return $filter;
}

// Include the Firebase API Wrapper
require_once( MYBB_ROOT.'inc/plugins/myfirechat/FirebaseAPIWrapper.php');