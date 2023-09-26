<?php

use Utils\HTML;
use Utils\Htmlv2;

/**
 * @var Utils\Utils $Utils
 * @var Server\Request $Request
 * @var Server\Request\ApplicationLayer $ApplicationLayer
 */

$title = "首頁";
$assets = [];
$content = "@Home.php";
$footer = "";
$script = '';
$menu = true;
include_once "templates/layout.php";
