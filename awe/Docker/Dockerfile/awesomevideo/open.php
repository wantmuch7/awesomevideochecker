<?php
header("Access-Control-Allow-Origin: *");
include_once(__DIR__ . '/index.php');

define('DIR_SEPARATOR', '\\');
$code = $_GET['code'];

$targetFolder = [];
if(array_key_exists($code, $fileArray)){
    $startPos = strlen(DATA_PATH);
    $path = $fileArray[$code];
    if(is_array($path)){
        foreach($path as $record){
            if(file_exists($record)){
                $temp = './collection/data' . str_replace(DIR_SEPARATOR, '/', mb_substr($record, $startPos));
                $targetFolder[] = mb_substr($temp, 0, mb_strrpos($temp, '/'));
            }
        }
    }
    else{
        if(file_exists($path)){
            $targetFolder[] = './collection/data' . str_replace(DIR_SEPARATOR, '/', mb_substr($path, $startPos));
        }
    }
}

$targetFolder = array_unique($targetFolder);
foreach($targetFolder as $record){
    echo '<a href="'.$record.'" class="awe-open-link" target="_blank">Open Folder</a> ';
}