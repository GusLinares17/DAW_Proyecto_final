from rest_framework import serializers

from apps.management.models import Reservation
from apps.management.serializers.CustomerSerializer import CustomerSerializer
from apps.management.serializers.TableSerializer import TableSerializer


class ReservationSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    table_detail = TableSerializer(source='table', read_only=True)

    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ('customer', 'creator', 'created', 'modified', 'modifier')


class ReservationDetailSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    table = TableSerializer(read_only=True)

    class Meta:
        model = Reservation
        fields = '__all__'