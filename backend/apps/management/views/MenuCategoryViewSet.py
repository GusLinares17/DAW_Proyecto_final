from rest_framework import viewsets

from apps.management.models import MenuCategory
from apps.management.serializers import (
    MenuCategorySerializer,
    MenuCategoryDetailSerializer,
)


class MenuCategoryViewSet(viewsets.ModelViewSet):
    queryset = MenuCategory.objects.filter(status=True)

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return MenuCategoryDetailSerializer
        return MenuCategorySerializer