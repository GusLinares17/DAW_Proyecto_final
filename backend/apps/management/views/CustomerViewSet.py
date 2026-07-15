from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.management.models import Customer
from apps.management.serializers import CustomerSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get', 'put', 'patch'])
    def me(self, request):
        try:
            customer = request.user.customer_profile
        except AttributeError:
            return Response({"detail": "El usuario no tiene un perfil de cliente asociado."}, status=404)

        if request.method == 'GET':
            serializer = self.get_serializer(customer)
            return Response(serializer.data)

        partial = request.method == 'PATCH'
        serializer = self.get_serializer(customer, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
            
        return Response(serializer.errors, status=400)