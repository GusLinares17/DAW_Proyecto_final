from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly

from apps.management.models import MenuItem
from apps.management.serializers import MenuItemSerializer


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.filter(status=True, available=True)
    serializer_class = MenuItemSerializer
    
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]