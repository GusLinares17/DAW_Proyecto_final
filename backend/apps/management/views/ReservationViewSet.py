from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.management.models import Reservation
from apps.management.serializers import (
    ReservationSerializer,
    ReservationDetailSerializer,
)


class ReservationViewSet(viewsets.ModelViewSet):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Reservation.objects.all().order_by('-created')
        
        return Reservation.objects.filter(creator=user).order_by('-created')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ReservationDetailSerializer
        return ReservationSerializer

    def perform_create(self, serializer):
        serializer.save(
            customer=self.request.user.customer_profile,
            creator=self.request.user
        )