from django.db import models
import uuid

from .BaseModel import BaseModel
from .MenuCategory import MenuCategory


class MenuItem(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(MenuCategory, on_delete=models.CASCADE)
    name = models.CharField(null=False, blank=False, max_length=155)
    description = models.CharField(null=True, blank=True, max_length=255)
    price = models.DecimalField(null=False, blank=False, max_digits=8, decimal_places=2)
    available = models.BooleanField(default=True, null=False)

    class Meta:
        db_table = "menu_items"
        ordering = ['category', 'name']

    def save(self, *args, **kwargs):
        self.name = self.name.upper()
        return super(MenuItem, self).save(*args, **kwargs)

    def __str__(self):
        return "%s %s" % (self.category, self.name)