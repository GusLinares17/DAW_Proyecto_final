from rest_framework import viewsets

from apps.management.models import MenuItem
from apps.management.serializers import MenuItemSerializer


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.filter(status=True, available=True)
    serializer_class = MenuItemSerializer