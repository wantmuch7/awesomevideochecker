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

if [ "$EXEC_UID" != "" ] && [ "$EXEC_GID" != "" ];then
useradd www-runner
usermod -u $EXEC_UID -o -m www-runner -d /var/www/html
groupmod -g $EXEC_GID www-runner
chown www-runner:www-runner $WORKDIR/cache.json
chown www-runner:www-runner $WORKDIR/cross.png
chown www-runner:www-runner $WORKDIR/delete_cache.php
chown www-runner:www-runner $WORKDIR/index.php
chown www-runner:www-runner $WORKDIR/open.php
chown www-runner:www-runner $WORKDIR/tick.png
chown www-runner:www-runner $WORKDIR/collection
sed -i 's/User \${APACHE_RUN_USER}/User www-runner/' /etc/apache2/apache2.conf
sed -i 's/Group \${APACHE_RUN_GROUP}/Group www-runner/' /etc/apache2/apache2.conf
fi

chmod 777 $WORKDIR/cache.json
chmod 777 $WORKDIR/cross.png
chmod 777 $WORKDIR/delete_cache.php
chmod 777 $WORKDIR/index.php
chmod 777 $WORKDIR/open.php
chmod 777 $WORKDIR/tick.png
chmod 777 $WORKDIR/collection
chmod 777 $WORKDIR/collection/data

a2enmod ssl
a2enmod headers
a2enconf ssl-params
a2ensite default-ssl
echo "Restart apache"
apache2-foreground
