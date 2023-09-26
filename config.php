<?php

require "autoload.php";

use Type\Array\CGArray;
use Utils\ConfigKeyField;

$CGArray = new CGArray();
$CGArray->Set(ConfigKeyField::Name->value, "遠端加載頁面伺服器系統");
$CGArray->Set(ConfigKeyField::Description->value, "用於遠端連接伺服器網站資源。");
$CGArray->Set(ConfigKeyField::Version->value, "1.0.0");
$CGArray->Set(ConfigKeyField::Auther->value, "creamgod45");

return $CGArray;