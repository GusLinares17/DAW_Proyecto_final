from django.contrib import admin

from .models import MenuCategory
from .models import MenuItem
from .models import Customer
from .models import Table
from .models import Reservation


admin.site.register(MenuCategory)
admin.site.register(MenuItem)
admin.site.register(Customer)
admin.site.register(Table)
admin.site.register(Reservation)