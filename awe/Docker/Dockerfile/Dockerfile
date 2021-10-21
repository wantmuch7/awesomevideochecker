FROM php:7.4.16-apache

ENV APP_USER www-data
ENV WORKDIR /var/www/html
ENV TZ Asia/Hong_Kong
ENV ENV_AWE_USERNAME admin
ENV ENV_AWE_PASSWORD admin
ENV EXEC_UID ""
ENV EXEC_GID ""
ENV ENV_AWE_SHARE_PATH ""
ENV ENV_AWE_SHARE_USERNAME ""
ENV ENV_AWE_SHARE_PASSWORD ""
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && \
    apt-get -qqy install --no-install-recommends \
      libapache2-mod-auth-openidc

RUN apt-get install cifs-utils -y

WORKDIR ${WORKDIR}
ADD ./awesomevideo ${WORKDIR}
RUN chown -R ${APP_USER}:${APP_USER} ${WORKDIR}

ADD ./apache-selfsigned.crt /etc/ssl/certs/apache-selfsigned.crt
ADD ./apache-selfsigned.key /etc/ssl/private/apache-selfsigned.key
ADD ./default-ssl.conf /etc/apache2/sites-available/default-ssl.conf

EXPOSE 443 80

ADD run-script.sh /run-script.sh
RUN chmod -v +x /run-script.sh
ENTRYPOINT ["bash", "/run-script.sh"]
