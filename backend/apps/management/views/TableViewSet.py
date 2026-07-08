from rest_framework import viewsets

from apps.management.models import Table
from apps.management.serializers import TableSerializer


class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.filter(status=True, available=True)
    serializer_class = TableSerializer