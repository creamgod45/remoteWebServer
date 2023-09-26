<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <?php

    /**
     * @var CGArray $Config
     * @var Utils\Utils $Utils
     */

    use Type\Array\CGArray;
    use Utils\ConfigKeyField;

    define("Utils", $Utils);

    function rand_commit($Config)
    {
        $random_number = rand(0, 100) / 100;
        if ($random_number < 0.7) {
            return "<!-- 產生 " . Utils->Get_eng_randoom(1) . " by CGPHP Framework " . Utils->Get_eng_randoom(1) . " 專案名稱: " . $Config->Get(ConfigKeyField::Name->value) . "" . Utils->Get_eng_randoom(1) . " 版本: " . $Config->Get(ConfigKeyField::Version->value) . " " . Utils->Get_eng_randoom(1) . " 作者: " . $Config->Get(ConfigKeyField::Auther->value) . " " . Utils->Get_eng_randoom(1) . " " . (new Utils\Utils())->Get_eng_randoom(5) . " -->";
        }
    }

    echo rand_commit($Config);
    if (!empty($assets)) {
        foreach ($assets as $asset) {
            echo rand_commit($Config) . $asset . rand_commit($Config) . PHP_EOL;
        }
    } ?>

    <title><?= @$title ?></title>
    <?php
    echo rand_commit($Config);
    if (@!empty($script)) { ?>
        <script><?= @$script ?></script>
    <?php } ?>
</head>
<body>
<?php if (@$menu) {
    echo rand_commit($Config);
    include_once "menu.php";
}
include_once @$content;
echo rand_commit($Config); ?>
</body>
<?= @$footer ?>
</html>
<?php
echo rand_commit($Config); ?>