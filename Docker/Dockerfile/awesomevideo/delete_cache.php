<?php
header("Access-Control-Allow-Origin: *");
define('CACHE_FILE', __DIR__ . '/cache.json');

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

if(file_exists(CACHE_FILE)){
    writeCache(CACHE_FILE, '');
}
echo 'done';