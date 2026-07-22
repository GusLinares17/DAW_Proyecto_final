from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from apps.management.models import Reservation, Customer
from apps.management.serializers.ReservationSerializer import ReservationSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Reservation.objects.all().order_by('-created')
        return Reservation.objects.filter(creator=user).order_by('-created')

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_staff:
            customer_id = self.request.data.get('customer')
            customer = get_object_or_404(Customer, id=customer_id)
            serializer.save(customer=customer, creator=user.id.id)
        else:
            serializer.save(customer=user.customer_profile, creator=user)

    def perform_update(self, serializer):
        user = self.request.user
        if user.is_staff:
            customer_id = self.request.data.get('customer')
            if customer_id:
                customer = get_object_or_404(Customer, id=customer_id)
                serializer.save(customer=customer, modifier=user.id)
            else:
                serializer.save(modifier=user.id)
        else:
            serializer.save(modifier=user.id)