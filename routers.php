<?php
/**
 * @var Utils\Utils $Utils
 * @var bool $routers
 */

if (@!$routers) exit();

switch (router(1)) {
    case 'api':
        switch (router(2)) {
            case "remote":
                include_once "router/api/remote.php";
        }
        break;
    case 'index.php':
        include_once "router/@Home.php";
        break;
    default:
        $Utils->goto_page([0, '/index.php']);
        break;
}