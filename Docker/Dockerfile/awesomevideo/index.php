<?php
header("Access-Control-Allow-Origin: *");
define('DATA_PATH', __DIR__ . '/collection/data');
define('CACHE_FILE', __DIR__ . '/cache.json');

$code = $_GET['code'];
if($code == ''){
    echo 'Please pass the code to URL';
    exit;
}

function writeCache($file, $content){
    $fp = fopen($file, "r+");

    if (flock($fp, LOCK_EX)) {  // acquire an exclusive lock
        ftruncate($fp, 0);      // truncate file
        fwrite($fp, $content);
        fflush($fp);            // flush output before releasing the lock
        flock($fp, LOCK_UN);    // release the lock
    } else {
        echo "Couldn't get the lock!";
    }

    fclose($fp);
}


$isVideoExists = false;

if(($content = file_get_contents(CACHE_FILE)) != ''){
    $fileArray = json_decode($content, true);
}
else{
    $fileArray = [];
}

if(array_key_exists($code, $fileArray)){
    $path = $fileArray[$code];
    $cachePath = [];
    if(is_array($path)){
        foreach($path as $record){
            if(file_exists($record)){
                $cachePath[] = $record;
                $isVideoExists = true;
                break;
            }
        }
    }
    else{
        if(file_exists($path)){
            $cachePath[] = $path;
            $isVideoExists = true;
        }
    }
    if($isVideoExists && count($cachePath) != count($fileArray)){
        $fileArray[$code] = $cachePath;
        writeCache(CACHE_FILE, json_encode(($fileArray)));
    }
}

if($isVideoExists == false){
    $output = shell_exec('find '.DATA_PATH.' -type f -iname "*'.$code.'*"');
    if(strlen(str_replace("\n", '', $output)) > 0){
        $array = explode("\n", $output);
        $isVideoExists = true;
        $fileArray[$code] = $array;
        writeCache(CACHE_FILE, json_encode(($fileArray)));
    }
    else if(array_key_exists($code, $fileArray)){
        unset($fileArray[$code]);
        writeCache(CACHE_FILE, json_encode(($fileArray)));
    }
}

if($isVideoExists){
    echo '<img src="tick.png" alt="exists" class="awe-indicator" style="vertical-align: middle;" />';
}
else{
    echo '<img src="cross.png" alt="not exists" class="awe-indicator" />';
}