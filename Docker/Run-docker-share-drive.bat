docker run -d ^
-e ENV_AWE_SHARE_PATH="\\192.168.X.XX\Your Awesome Video Folder" ^
-e ENV_AWE_SHARE_USERNAME="Your Share Drive Login Name" ^
-e ENV_AWE_SHARE_PASSWORD="Your Share Drive Password" ^
-e ENV_AWE_USERNAME=admin ^
-e ENV_AWE_PASSWORD=admin ^
-p 22333:80 ^
--name=awesomevideochecker ^
--restart always ^
--privileged ^
-it ^
--cap-add ^
SYS_ADMIN --cap-add DAC_READ_SEARCH ^
wantmuch7/awesomevideochecker:v1.0.3 bash
pause
