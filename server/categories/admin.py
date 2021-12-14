from django.utils.translation import ugettext as _

from django.contrib import admin
from django.utils.html import format_html
from mptt.admin import MPTTModelAdmin, TreeRelatedFieldListFilter
from mptt.admin import DraggableMPTTAdmin

from articles.models import Article
from articles.views import Articles
from .models import Category


@admin.register(Category)
class MyDraggableMPTTAdmin(DraggableMPTTAdmin):
	"""
	форма в админке для таскаемого списка
	"""
	list_display = ('tree_actions', 'indented_title', 'icon', 'id', 'slug',
							'related_articles_cumulative_count', 'related_articles_count')
	list_display_links = ('indented_title', 'id',)

	def get_queryset(self, request):
		qs = super().get_queryset(request)

		# Add cumulative product count
		qs = Category.objects.add_related_count(
			qs,
			Article,
			'category',
			'articles_cumulative_count',
			cumulative=True)

		# Add non cumulative product count
		qs = Category.objects.add_related_count(qs,
															 Article,
															 'category',
															 'articles_count',
															 cumulative=False)
		return qs

	def related_articles_count(self, instance):
		return instance.articles_count

	related_articles_count.short_description = 'Связанных статей (только для указанной категории)'

	def related_articles_cumulative_count(self, instance):
		return instance.articles_cumulative_count

	related_articles_cumulative_count.short_description = 'Статей в категории (всё дерево)'

	def something(self, instance):
		return format_html(
			'<div style="text-indent:{}px">{}</div>',
			instance._mpttfield('level') * self.mptt_level_indent,
			instance.label,  # Or whatever you want to put here
		)

	something.short_description = _('something nice')

