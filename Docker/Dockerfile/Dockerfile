FROM php:7.4.16-apache

ENV APP_USER www-data
ENV WORKDIR /var/www/html
ENV TZ Asia/Hong_Kong
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && \
    apt-get -qqy install --no-install-recommends \
      libapache2-mod-auth-openidc

RUN apt-get install cifs-utils -y

WORKDIR ${WORKDIR}
ADD ./awesomevideo ${WORKDIR}
RUN chown -R ${APP_USER}:${APP_USER} ${WORKDIR}

EXPOSE 443 80

ADD run-script.sh /run-script.sh
RUN chmod -v +x /run-script.sh
ENTRYPOINT ["bash", "/run-script.sh"]
