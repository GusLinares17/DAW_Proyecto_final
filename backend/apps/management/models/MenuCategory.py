from django.db import models
import uuid

from .BaseModel import BaseModel


class MenuCategory(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(unique=True, null=False, blank=False, max_length=155)
    description = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        db_table = "menu_categories"
        ordering = ['name']

    def save(self, *args, **kwargs):
        self.name = self.name.upper()
        return super(MenuCategory, self).save(*args, **kwargs)

    def __str__(self):
        return "%s" % (self.name)