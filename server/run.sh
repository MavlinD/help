#!/bin/bash

#echo $DEBUG
#echo "$core_port"

if [ "$DEBUG" = '0' ]; then
  gunicorn app.wsgi:application -b 0.0.0.0:"$core_port"
else
  python manage.py runserver 0.0.0.0:"$core_port"
fi
