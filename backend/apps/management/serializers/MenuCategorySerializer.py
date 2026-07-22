from rest_framework import serializers

from apps.management.models import MenuCategory, MenuItem
from apps.management.serializers.MenuItemSerializer import MenuItemSerializer


class MenuCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuCategory
        fields = '__all__'
        read_only_fields = ('creator', 'modifier', 'created', 'modified')


class MenuCategoryDetailSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    def get_items(self, obj):
        items = MenuItem.objects.filter(
            category=obj,
            status=True,
            available=True
)
        return MenuItemSerializer(items, many=True).data

    class Meta:
        model = MenuCategory
        fields = '__all__'