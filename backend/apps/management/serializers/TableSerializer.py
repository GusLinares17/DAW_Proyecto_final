from rest_framework import serializers

from apps.management.models import Table


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'
        read_only_fields = ('creator', 'modifier', 'created', 'modified')