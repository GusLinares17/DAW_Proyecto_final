from django.db import models
import uuid

from .BaseModel import BaseModel


class Table(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    number = models.PositiveIntegerField(unique=True, null=False)
    capacity = models.PositiveIntegerField(null=False, default=2)
    location = models.CharField(null=True, blank=True, max_length=155)
    available = models.BooleanField(default=True, null=False)

    class Meta:
        db_table = "tables"
        ordering = ['number']

    def __str__(self):
        return "Mesa %s" % (self.number)