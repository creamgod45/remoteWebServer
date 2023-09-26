<?php

/**
 * @var Utils\Utils $Utils
 * @var Server\Request $Request
 * @var Server\Request\ApplicationLayer $ApplicationLayer
 **/

use Nette\Utils\FileSystem;
use Nette\Utils\Json;
use Type\Array\CGArray;
use Utils\Htmlv2;

$Request->HEADER()->Add("Access-Control-Allow-Origin: *");
$Request->HEADER()->Add("Access-Control-Allow-Headers: *");
$Request->HEADER()->JSON_FILE();

$raw_json = file_get_contents('php://input');
function menu(){
    return (new Htmlv2("div"))
        ->close(true)
        ->newLine(true)
        ->attr("class", "shadow-lg p-3 mt-5 mb-5")
        ->attr("style", "background-color: #f8f9fa;border-radius: 2em;")
        ->body(
            (new Htmlv2("h2"))
                ->close(true)
                ->newLine(true)
                ->body("選單")
                ->build().
            (new Htmlv2("div"))
                ->close(true)
                ->newLine(true)
                ->attr("class", "d-flex")
                ->body(
                    (new Htmlv2("button"))
                        ->close(true)
                        ->newLine(true)
                        ->attr("class", "btn btn-success shadow-lg p2 m-1")
                        ->attr("style", "width:128px;height:128px;border-radius:unset;")
                        ->attr("onclick","scopePage('index');")
                        ->body("<i class=\"fa-solid fa-house\"></i>&nbsp;首頁")
                        ->build().
                    (new Htmlv2("button"))
                        ->close(true)
                        ->newLine(true)
                        ->attr("class", "btn btn-warning shadow-lg p2 m-1")
                        ->attr("style", "width:128px;height:128px;border-radius:unset;")
                        ->attr("onclick","scopePage('folder');")
                        ->body("<i class=\"fa-solid fa-folder\"></i>&nbsp;文件")
                        ->build().
                    (new Htmlv2("button"))
                        ->close(true)
                        ->newLine(true)
                        ->attr("class", "btn btn-primary shadow-lg p2 m-1")
                        ->attr("style", "width:128px;height:128px;border-radius:unset;")
                        ->attr("onclick","scopePage('download');")
                        ->body("<i class=\"fa-solid fa-download\"></i>&nbsp;下載")
                        ->build()
                )
                ->build()
        )
        ->build();
}
try {
    $cgarray = new CGArray(Json::decode($raw_json, Json::FORCE_ARRAY));
    $page = $cgarray->Get("page");
    $html = match ($page) {
        "index" => (new Htmlv2("div"))
            ->close(true)
            ->newLine(true)
            ->attr("class", "app container")
            ->body(
                menu().
                (new Htmlv2("div"))
                    ->close(true)
                    ->newLine(true)
                    ->attr("class", "shadow-lg p-3 mt-5 mb-5")
                    ->attr("style", "background-color: #f8f9fa;border-radius: 2em;")
                    ->body("首頁")
                    ->build()
            )->build(),
        "folder" => (new Htmlv2("div"))
            ->close(true)
            ->newLine(true)
            ->attr("class", "app container")
            ->body(
                menu().
                (new Htmlv2("div"))
                    ->close(true)
                    ->newLine(true)
                    ->attr("class", "shadow-lg p-3 mt-5 mb-5")
                    ->attr("style", "background-color: #f8f9fa;border-radius: 2em;")
                    ->body("文件")
                    ->build()
            )->build(),
        default => (new Htmlv2("div"))
            ->close(true)
            ->newLine(true)
            ->attr("class", "test")
            ->body(
                (new Htmlv2("h2"))
                    ->close(true)
                    ->newLine(true)
                    ->attr("class", "text-center")
                    ->body("加載畫面.....(3秒後跳轉)")
                    ->build()
            )->build(),
    };
    $raw = ["build" => $html];
} catch (\Nette\Utils\JsonException $e) {
    exit();
}


echo json_encode($raw);
FileSystem::write("log/" . time() . "_log_api", Json::encode([
    "Headers" => $Request->HEADERS(),
    "php://input" =>file_get_contents('php://input'),
    "Requests" => $Request->Request()->Get(),
    "POST" => $Request->POST()->Get(),
    "GET" => $Request->GET()->Get(),
    "raw" => $raw
], Json::PRETTY));