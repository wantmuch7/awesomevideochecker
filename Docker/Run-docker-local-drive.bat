docker run -d ^
-v "C:\\AwesomeVideoFolder":/var/www/html/collection/data/01:ro ^
-v "D:\\AwesomeVideoFolder":/var/www/html/collection/data/02:ro ^
-v "E:\\AwesomeVideoFolder":/var/www/html/collection/data/03:ro ^
-e ENV_AWE_USERNAME=admin ^
-e ENV_AWE_PASSWORD=admin ^
-p 22333:80 ^
--name=awesomevideochecker ^
--restart always ^
wantmuch7/awesomevideochecker:v1.0.3
pause
