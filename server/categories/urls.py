from django.urls import path, re_path
from .views import CategoryViewSet, GetCategory, Categories, CategoryManagement, \
	CategoriesFamily, RootCategories, CategoryViewSetInsert, CategoryViewSetWithChildren, \
	GetArticlesByCategory, CategoryOne

category = CategoryViewSet.as_view({
	'put': 'create',
	'patch': 'partial_update',
	'delete': 'destroy',
})

full_category = CategoryViewSetWithChildren.as_view({'get': 'list'})

urlpatterns = [
	path('create/', category, name='category-create'),
	path('insert/', CategoryViewSetInsert.as_view({'put': 'put'}), name='category-insert'),
	path('delete/<int:pk>/', category, name='category-delete'),
	path('update/<int:pk>/', category, name='category-update'),
	path('move/', CategoryManagement.as_view({'post': 'move'}), name='category-move'),
	path('<int:pk>/', GetCategory.as_view({'get': 'get'}), name='category'),
	# this url need for breadcrambs
	path('family/<int:pk>/', CategoriesFamily.as_view({'get': 'get'}), name='category-family'),
	path('slug/<slug:slug>/', CategoriesFamily.as_view({'get': 'get'}), name='category-family-slug'),
	path('roots/', RootCategories.as_view({'get': 'get'}), name='categories-roots'),
	path('list/<int:pk>/', full_category, name='categories-list'),
	path('list/', full_category, name='categories-list-full'),
	path('<slug:slug>/', GetArticlesByCategory.as_view({'get': 'list'}), name='category-slug'),
	path('only/<slug:slug>/', CategoryOne.as_view({'get': 'get'}), name='category-by-slug'),
	path('', Categories.as_view({'get': 'list'}), name='categories'),

]
