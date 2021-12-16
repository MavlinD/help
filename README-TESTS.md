### Tests & Scripts

```bash
- watchmedo shell-command  --patterns="*.py"  --ignore-directories  --recursive  --command="./manage.py test" .
  (запускает вотчер тестов)

- python3 manage.py runscript command -v3
  (выполняет скрипт run в файле scripts/command.py)
  
- python3 manage.py runscript watch -v3
  (запуск первого теста)
  
- find ./api -name '*.py' | entr python ./manage.py test --keepdb
  (мониторит изменения в файлах и запускает указанную команду, здесь запуск тестов без создания тестовой бд)

- sudo apt-get install entr
  http://eradman.com/entrproject/ - использовал это
  https://beyondgrep.com/ - ack
  Or, for extra credit, combine it with ack:
  $ ack --python | entr python ./manage.py test
  If you want it to even find new files as you add them:
  $ until ack -f --python | entr -d python ./manage.py test; do sleep 1; done
  
- pm test api.tests.tests
  (запустит только файл tests из папки api/tests)
  
- pm runscript watch --script-args api.tests.tests
  (запустит и будет наблюдать только за api.tests.tests)
  
- http POST http://127.0.0.1:8000/api/token/ username=mdv password=123
  (запрос на выдачу jwt токена)
  
- pytest 
  (запуск тестов с помощью pytest, при этом предупреждения не выведутся)

- pytest -Walways 
  (запуск тестов pytest с предупреждениями)
  
- ptw
  (запуск вотчера для pytest)
  
- ptw api/tests/tests_auth_jwt.py
  (вотчер pytest для определенного файла)
  
- pytest api/tests/tests_auth_jwt.py::LoginUserApiTest
  (запуск определенного теста)
  
- ptw --runner "pytest --picked --testmon"
  (запускает только измененные тесты, очень удобно)
  
- ptw 
  (теперь tox.ini содержит модифицированный раннер и, соответственно запускает только измененные тесты, причем запоминает ранее запущенные между запусками вотчера)
  
- pm runscript tests.mail_send
  (отправит тестовое письмо на реальный сервер)
  
  Заметка к тестам: если тестируется с авторизацией на удаленном сервисе, то
  для для прохождения тестов необходимо, чтобы данный сервис был в сети 
  
```

#### Заполнить БД тестовыми данными

```bash
	python manage.py pm fill_articles
#	добавить 20 статей
	pm fill_articles  --iterations 20
#	добавить 20 категорий
	pm fill_categories  --iterations 20
```

#### Миграции в django
```bash
#	отмена миграции
	python manage.py migrate your_app zero
```
