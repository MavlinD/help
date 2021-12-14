import os

from slugify import slugify

from app.tools import Color
from .models import Image
from .serializers import ImageSerializer
from rest_flex_fields.views import FlexFieldsModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser


class ImageViewSet(FlexFieldsModelViewSet):
	"""
	представление для работы с изображениями
	"""
	permission_classes = [IsAdminUser]
	serializer_class = ImageSerializer
	queryset = Image.objects.all()

	def create(self, request):
		# print(Color.CYAN + '\n' + repr(request.data))
		image = request.data.get('image')
		file_name, file_extension = os.path.splitext(image.name)
		image.name = f"{slugify(file_name)}{file_extension}"
		return super().create(request)
