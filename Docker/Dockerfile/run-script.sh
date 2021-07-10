#!/usr/bin/env bash

sed -i "s/AllowOverride None/AllowOverride All/g" /etc/apache2/apache2.conf

if [ "$ENV_AWE_USERNAME" != "" ] && [ "$ENV_AWE_PASSWORD" != "" ];then
    htpasswd -cb /var/www/.htpasswd $ENV_AWE_USERNAME $ENV_AWE_PASSWORD
	echo "" >> /var/www/html/collection/.htaccess
	echo "AuthUserFile /var/www/.htpasswd" >> /var/www/html/collection/.htaccess
	echo "AuthType Basic" >> /var/www/html/collection/.htaccess
	echo 'AuthName "My restricted Area"' >> /var/www/html/collection/.htaccess
	echo "Require valid-user" >> /var/www/html/collection/.htaccess
fi

if [ "$ENV_AWE_SHARE_PATH" != "" ] && [ "$ENV_AWE_SHARE_USERNAME" != "" ] && [ "$ENV_AWE_SHARE_PASSWORD" != "" ];then
mount -t cifs -o username=$ENV_AWE_SHARE_USERNAME,password=$ENV_AWE_SHARE_PASSWORD,iocharset=utf8 "$ENV_AWE_SHARE_PATH" /var/www/html/collection/data
fi

echo "Restart apache"
apache2-foreground
