from django.db import models
import uuid
from django.contrib.auth.models import User

from .BaseModel import BaseModel


class Customer(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='customer_profile'
    )

    dni = models.CharField(unique=True, null=True, blank=True, max_length=8)
    names = models.CharField(null=False, blank=False, max_length=155)
    father_surname = models.CharField(null=False, blank=False, max_length=155)
    mother_surname = models.CharField(null=False, blank=False, max_length=155)
    email = models.EmailField(unique=True, null=True, blank=True, max_length=255)
    phone = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        db_table = "customers"
        ordering = ['father_surname', 'mother_surname', 'names']

    def save(self, *args, **kwargs):
        self.names = self.names.upper()
        self.father_surname = self.father_surname.upper()
        self.mother_surname = self.mother_surname.upper()
        return super(Customer, self).save(*args, **kwargs)

    def __str__(self):
        return "%s %s %s" % (self.names, self.father_surname, self.mother_surname)