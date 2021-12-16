FROM nginx

RUN rm /etc/nginx/nginx.conf
COPY nginx.conf.template /etc/nginx/nginx.conf
COPY proxy.conf /etc/nginx/
RUN rm /etc/nginx/conf.d/default.conf

# for dev
RUN curl https://getmic.ro | bash
RUN mv micro /usr/bin

ARG USERNAME=appuser
RUN useradd --create-home $USERNAME

# После запуска контейнера nginx считывает файлы шаблонов,
# расположенные в /etc/nginx/templates/*.templates,
# и вызывает envsubstr, который считывает сохраненные переменные среды.
# Затем он сохраняет значение в /etc/nginx/conf.d.

COPY sites /etc/nginx/templates/
COPY ./nginxconfig.io /etc/nginx/nginxconfig.io

WORKDIR /etc/nginx/
