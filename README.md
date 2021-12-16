## HELP Service

#### Использует

- Django 3
- django-rest-framework (RESTFull API)
- django-rest-auth (REST-AUTH-API)
- django-rest-framework-simplejwt (JWT)
- [Vue 3 & Composition API](https://v3.ru.vuejs.org/ru/guide/composition-api-introduction.html)
- [Quasar](https://quasar.dev/)
- Vite & Rollback
- Nginx & [Gunicorn](https://gunicorn.org/)

#### Deploy

1. Клонируем код
2. заполняем env.production и .env по шаблону
3. ```docker-compose up jsm``` (dcup jsm) - устанавливаем зависимости и собираем клиентскую часть. Если меняются переменные окружения, то необходимо пересобрать сборку, тк сборщик использует статическую интерполяцию переменных окружения, короче они вставляются в код как есть, а не в виде ссылок. То есть ```dcup jsm``` делаем в любом случае).
4. ```dcup``` - запускаем проект.

#### Локальный запуск

1. клонировать
2. ```pnpm i``` (pi) - установка зависимостей
3. заполняем env.development по шаблону
4. запустить [бекенд](server/README.md) локально или установить ссылку в env.development, переменная VITE_api_server_name
5. ```p dev``` - запустить клиента

#### Docker

- код работает в двух контейнерах
- данные (БД, загружаемые изображения) вынесены в папку /dbs

### Сервисные команды

- ```python3 -m pip install --upgrade pip``` - если зависимости не устанавливаются
- ```pm collectstatic``` - собрать статику
- ```git rm --cached client/.bash_history``` - удалить ф-л из индекса

### [Tests & Scripts](./README-TESTS.md)
