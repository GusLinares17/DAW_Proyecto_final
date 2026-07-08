from django.db import models
from django.contrib.auth.models import User


class BaseModel(models.Model):
    status = models.BooleanField(default=True, null=False)
    created = models.DateTimeField(editable=False, null=False, auto_now_add=True)
    modified = models.DateTimeField(null=False, auto_now=True)
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='%(class)s_created'
    )
    modifier = models.IntegerField(null=True, blank=True)

    class Meta:
        abstract = True