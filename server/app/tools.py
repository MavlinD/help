import functools
import hashlib
import json
import locale
import random
import sys
import traceback
import time
from datetime import datetime

from colorama import Fore
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from app import settings

locale.setlocale(locale.LC_ALL, 'ru_RU.UTF-8')


class Color:
	"""
	terminal colors
	https://scriptim.github.io/bash-prompt-generator/
	"""
	MAGENTA = '\033[95m'
	MAGENTA2 = '\033[0;38;5;201m'
	DEEPSKYBLUE = '\033[0;38;5;31m'
	STEELBLUE = '\033[0;38;5;67m'
	LITESLATEGRAY = '\033[0;38;5;103m'
	GRAY33 = '\033[0;38;5;139m'
	PINK3 = '\033[0;38;5;175m'
	PALEVIOLETRED = '\033[0;38;5;211m'
	WHITE = '\033[37m'
	black = '\033[30m'
	CYAN = '\033[96m'
	CYAN3 = '\033[0;38;5;43m'
	DARKCYAN = '\033[36m'
	BLUE = '\033[94m'
	BLUE2 = '\033[0;38;5;33m'
	NAVYBLUE = '\033[0;38;5;18m'
	DEEPSKYBLUE2 = '\033[0;38;5;39m'
	TURQUOSE = '\033[0;38;5;45m'
	VIOLET = '\033[0;38;5;177m'
	PURPLE = '\033[0;38;5;200m'
	GREEN = '\033[92m'
	GREEN2 = '\033[0;38;5;49m'
	ORANGE = '\033[0;38;5;214m'
	YELLOW = '\033[93m'
	YELLOW2 = '\033[0;38;5;228m'
	CORNFLOWERBLUE = '\033[0;38;5;69m'
	RED = '\033[91m'
	BOLD = '\033[1m'
	UNDERLINE = '\033[4m'
	end = '\033[0m'

	@classmethod
	def rnd(cls, arg):
		"""
		случайным образом расцвечивает
		@param arg: any
		"""
		attributes_list = [attribute for attribute in dir(cls) if attribute[0].isupper()]
		# print()
		print(getattr(cls, random.choice(attributes_list)) + repr(arg))

	@classmethod
	def pdict(cls, arg=None, indent=0, key_color='CYAN3', val_color='GREEN'):
		"""
		печать словаря в цвете
		@param arg: dict or str
		@return:
		"""
		if arg is None:
			arg = {}
		if type(arg) is str:
			arg = json.loads(arg)
		for key, val in arg.items():
			if isinstance(val, dict):
				cls.pdict(val, 3, 'VIOLET', 'ORANGE')
				continue
			print(
				f"{' ' * indent}{getattr(cls, key_color)}{Color.BOLD}{key} {cls.CORNFLOWERBLUE}=> {getattr(cls, val_color)}{val}")
		# print()


def nestedGet(d, p, default=None):
	"""
	возвращает вложеннные атрибуты
	# nestedGet(obj, ['foo', 'bar', 'baz'] - пример вызова
	# print nestedGet({"a":{"b":{"c":1}}},["a","b","c"]) #1
	# print nestedGet({"a":{"bar":{"c":1}}},["a","b","c"]) #None
	@param d: dict
	@param p: list
	@param default: значение по умолчанию
	@return: any

	"""
	if len(p) > 1:
		try:
			prop = nestedGet(d.get(p[0]), p[1:])
			if not prop:
				return default
			return prop
		except AttributeError:
			return default
	if len(p) == 1:
		try:
			return d.get(p[0], default)
		except AttributeError:
			return default


def my_round(arg, prec=2):
	"""
	округляет
	@param arg: float | str
	@param prec: int
	@return: float
	"""
	# assert type(float(arg)) == float
	return round(float(arg), prec)


def timer(func):
	"""
	декоратор, определяет время выполнения
	@rtype: str
	"""

	@functools.wraps(func)
	def wrapper_timer(*args, **kwargs):
		name = func.__name__
		tic = time.perf_counter()
		value = func(*args, **kwargs)
		toc = time.perf_counter()
		elapsed_time = toc - tic
		ln = len(name) + 15
		format_time = f"{elapsed_time:0.3f} seconds"
		print('-' * ln)
		print('\033[0;38;5;211m' + f"{name}: {format_time}")
		print('-' * ln)
		if value:
			value['elapsed_time'] = format_time
		return value

	return wrapper_timer


def get_quarter(_date):
	"""
	возвращает квартал
	@param _date: date
	@return: int
	"""
	return round((_date.month - 1) / 3 + 1)


def convert_date(_date, date_format_in="%Y-%m-%dT%H:%M:%S.%fZ", date_format_out='%Y-%m-%d'):
	"""
	форматирует дату - конвертирует одну временнУю строку в другую
	@param _date: строка
	@param date_format_in: входящий формат
	@param date_format_out: формат вывода
	@return: строка
	"""
	dt = None
	try:
		dt = datetime.strptime(_date, date_format_in)
		dt = datetime.strftime(dt, date_format_out)
		return dt
	except Exception:
		return dt


def get_date(_date, date_format_in="%Y-%m-%dT%H:%M:%S.%fZ", default=None):
	"""
	делает из строки времени объект времени либо то, что требуется
	@param _date: строка
	@param default: что вернуть, если получить время из строки не удалось
	@param date_format_in: входящий формат
	@return: объект времени или дефолтное значение
	"""
	dt = default
	try:
		dt = datetime.strptime(_date, date_format_in)
		return dt
	except Exception:
		return dt


def crc(*args):
	"""
	возвращает контрольную сумму в виде MD5 хеша
	@param args: list
	@return: str
	"""
	_hash = hashlib.md5(str([args]).encode('utf-8'))
	return _hash.hexdigest()


def my_err_handler(func):
	"""
	обработчик исключений в представлениях, исп-ся как декоратор
	"""

	def wrapper(*args, **kwargs):
		try:
			return func(*args, **kwargs)
		except AssertionError as err:
			resp = {'message': f'{err}'}
			data = {**resp}
			_status = resp.get('status', status.HTTP_400_BAD_REQUEST)
			return Response(data=data, status=_status)
		except ObjectDoesNotExist as err:
			resp = {'message': f'Объекта не существует: {err}'}
			data = {**resp}
			_status = resp.get('status', status.HTTP_400_BAD_REQUEST)
			return Response(data=data, status=_status)
		except Exception as err:
			print()
			_len = 100
			print(Color.BOLD + Color.CYAN + '-' * _len)
			exc_type, exc_value, exc_traceback = sys.exc_info()
			# print(Color.RED + '\n' + traceback.print_last())
			# print(Color.RED + '\n' + repr(err.stack))
			# print("*** print_tb:")
			# traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
			# print("*** print_exception:")
			# # exc_type below is ignored on 3.5 and later
			# traceback.print_exception(exc_type, exc_value, exc_traceback,
			#                           limit=2, file=sys.stdout)
			# print("*** print_exc:")
			# traceback.print_exc(limit=2, file=sys.stdout)
			# print("*** format_exc, first and last line:")
			# formatted_lines = traceback.format_exc().splitlines()
			# print(formatted_lines[0])
			# print(formatted_lines[-1])
			# print("*** format_exception:")
			# exc_type below is ignored on 3.5 and later
			# print(repr(traceback.format_tb(exc_traceback)))
			# print("*** tb_lineno:", exc_traceback.tb_lineno)
			# traceback.extract_tb(traceback, 1)
			# print(Color.RED + '\n' + traceback.format_exc(-1))
			# print(Color.RED + repr(traceback.format_tb(exc_traceback)))
			# print(Color.YELLOW2 + repr(traceback.format_exception(exc_type, exc_value, exc_traceback)))
			for err in enumerate(traceback.format_exception(exc_type, exc_value, exc_traceback)):
				if err[0] % 2:
					print(Color.GREEN2 + repr(err[1]))
					# print(Color.YELLOW + repr(err[1]))
				else:
					# print(Color.MAGENTA2 + repr(err[1]))
					print(Color.YELLOW2 + repr(err[1]))

			# Color.rnd(err)
			print()
			print(Color.YELLOW + repr(err))
			print()
			# print(Color.RED + '\n' + repr(traceback.format_tb(exc_traceback, -1)))
			print(Color.BOLD + Color.DARKCYAN + '=' * _len)
			if type(err) == AssertionError:
				if type(err.args[0]) == dict:
					# print(Color.MAGENTA + '\n' + repr({**err.args[0]}))
					_status = err.args[0].get('status', status.HTTP_400_BAD_REQUEST)
					return Response(data={**err.args[0]}, status=_status)

			resp = {'message': str(err)}
			data = {**resp}
			_status = resp.get('status', status.HTTP_400_BAD_REQUEST)
			return Response(data=data, status=_status)

	return wrapper


def resp_handler(func):
	"""
	обработчик ответов в представлениях, исп-ся как декоратор
	"""

	def wrapper(*args, **kwargs):
		resp = func(*args, **kwargs)
		data = {**resp}
		data.pop('status')
		_status = resp.get('status')
		data['version'] = settings.VERSION
		# if _status == status.HTTP_200_OK:
		# нужно запросить токен доступа
		# request = kwargs.get('request')
		# request = args[1]
		# access = RefreshToken.for_user(request.user)
		# data['access'] = str(access.access_token)
		# print(Color.GREEN + '\n' + repr(self.Payload.object))
		# print(Color.GREEN + '\n' + repr(self.Payload.tpl))
		# print(Color.GREEN + '\n' + repr(data))
		return Response(data=data, status=_status)

	return wrapper


def set_to_obj(arg):
	"""
	рекурсивное создание объекта из строки вида 'foo.bar.baz'
	@param arg: str
	@return: dict
	"""
	resp = {}
	if type(arg) == str:
		_arg = arg.split('.')
		return set_to_obj(_arg)
	if len(arg) > 1:
		resp[arg[0]] = set_to_obj(arg[1:])
		return resp
	resp[arg[0]] = {}
	return resp
