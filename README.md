## HELP Service

#### Использует:

- Django 3
- django-rest-framework (RESTFull API)
- django-rest-auth (REST-AUTH-API)
- django-rest-framework-simplejwt (JWT)
- [Vue 3 & Composition API](https://v3.ru.vuejs.org/ru/guide/composition-api-introduction.html)
- [Quasar](https://quasar.dev/)
- Vite & Rollback
- Nginx & [Gunicorn](https://gunicorn.org/)

#### Запуск

- клонировать
- создать venv
- установить зависимости
- python3 manage.py runserver

#### Docker

- код работает в двух контейнерах
- данные (БД, загружаемые изображения) вынесены в папку /dbs

### Замечания к проекту

- python -m pip --version
- python3 -m pip install --upgrade pip - если зависимости не устанавливаются
- собрать статику
- pm collectstatic

### Tests & Scripts

[тесты](./README-TESTS.md)
