import os


def run(arg):
    '''запустит и будет наблюдать только за [arg]'''
    tst = "find ./api -name '*.py' | entr python ./manage.py test --keepdb " + arg
    # tst = "find ./api -name '*.py' | entr python ./manage.py test api.tests.tests --keepdb" !!!
    # tst = "find ./api -name '*.py' | entr python ./manage.py test --keepdb"
    # tst = 'watchmedo shell-command --patterns="*.py"  --ignore-directories  --recursive  --command="./manage.py test --keepdb" .'
    # tst = 'watchmedo shell-command --patterns="*.py"  --ignore-directories  --recursive  --command="./manage.py test --keepdb" .'
    os.system(tst)
