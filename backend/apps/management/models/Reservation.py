from django.db import models
from django.core.exceptions import ValidationError
import uuid

from .BaseModel import BaseModel
from .Customer import Customer
from .Table import Table


class Reservation(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    reservation_date = models.DateField(null=False, blank=False)
    reservation_time = models.TimeField(null=False, blank=False)
    guests = models.PositiveIntegerField(null=False, default=1)

    class Meta:
        db_table = "reservations"
        ordering = ['reservation_date', 'reservation_time', 'customer']

    def clean(self):
        if self.guests > self.table.capacity:
            raise ValidationError("La cantidad de invitados supera la capacidad de la mesa.")

    def save(self, *args, **kwargs):
        self.clean()
        return super(Reservation, self).save(*args, **kwargs)

    def __str__(self):
        return "%s %s %s" % (self.customer, self.reservation_date, self.reservation_time)