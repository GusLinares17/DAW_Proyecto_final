from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.management.models import Reservation
from apps.management.serializers import (
    ReservationSerializer,
    ReservationDetailSerializer,
)


class ReservationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Reservation.objects.filter(
            customer__user=self.request.user
        )

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ReservationDetailSerializer
        return ReservationSerializer

    def perform_create(self, serializer):
        serializer.save(
            customer=self.request.user.customer_profile,
            creator=self.request.user
        )