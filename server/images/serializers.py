from app.tools import Color
from .models import Image

from versatileimagefield.serializers import VersatileImageFieldSerializer
from rest_flex_fields import FlexFieldsModelSerializer


class ImageSerializer(FlexFieldsModelSerializer):
	"""
	сериалайзер для изображений
	"""
	image = VersatileImageFieldSerializer(
		sizes=[
			('url', 'url'),
			# ('full_size', 'url'),
			# ('thumbnail', 'thumbnail__100x100'),
		]
	)

	class Meta:
		model = Image
		fields = ['pk', 'name', 'image']
