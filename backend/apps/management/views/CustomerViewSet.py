from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.management.models import Customer
from apps.management.serializers import CustomerSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]