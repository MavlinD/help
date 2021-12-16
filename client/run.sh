#!/bin/bash
# этот ф-л запустит сервис jsm
# echo "$PWD"
# echo "$NODE_ENV"

cd client
# ls -al

echo "устанавливаю зависимости"
pnpm i

echo "собираю клиента"
pnpm build
