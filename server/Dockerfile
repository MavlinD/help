FROM python:3.9

ARG USERNAME=appuser
ENV PYTHONDONTWRITEBYTECODE=False
ENV ACCEPT_EULA=Y
ENV PYTHONUNBUFFERED=1
ENV APP_HOME=/home/$USERNAME

# set locale to datetime
RUN apt-get update && \
    apt-get install -y locales && \
    sed -i -e 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales

ENV LANG ru_RU.UTF-8
ENV LC_ALL ru_RU.UTF-8

# добавим редактор внутрь образа - для отладки
RUN curl https://getmic.ro | bash
RUN mv micro /usr/bin

RUN useradd --create-home $USERNAME

USER $USERNAME
RUN pip install --upgrade pip

WORKDIR $APP_HOME
RUN mkdir -p static
RUN mkdir -p src
WORKDIR $APP_HOME/src

COPY req.txt req.txt
RUN pip install -r req.txt --no-warn-script-location
COPY . .

USER root
COPY run.sh .
RUN chmod +x run.sh

# иначе бд джанги будет ридонли, даже несмотря на правильные разрешения внитри контейнера
RUN mkdir -p /home/$USERNAME/dbs
RUN chown -R $USERNAME:$USERNAME /home/$USERNAME/dbs

USER $USERNAME
# modify path variable
ENV PATH="/home/$USERNAME/.local/bin:$PATH"

# команда в композе запуститься в контексте рабочей папки
ENTRYPOINT ["bash", "run.sh"]
# параметр, пока не требуется
CMD ["DEBUG"]
