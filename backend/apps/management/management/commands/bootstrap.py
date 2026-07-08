import os
from decimal import Decimal

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.db import transaction

from apps.management.models import MenuCategory, MenuItem, Table


class Command(BaseCommand):
    help = 'Inicializa el sistema con usuario administrador y datos base.'

    @transaction.atomic
    def handle(self, *args, **options):
        admin_user = self.create_admin_user()

        categories = self.create_categories(admin_user)
        self.create_menu_items(admin_user, categories)
        self.create_tables(admin_user)

        self.stdout.write(
            self.style.SUCCESS('Sistema inicializado correctamente.')
        )

    def create_admin_user(self):
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@saborperuano.com')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

        user, created = User.objects.get_or_create(username=username)

        user.email = email
        user.is_staff = True
        user.is_superuser = True

        if password:
            user.set_password(password)

        user.save()

        message = 'Administrador creado.' if created else 'Administrador verificado.'
        self.stdout.write(message)

        return user

    def create_categories(self, admin_user):
        data = [
            ('ENTRADAS', 'Platos ligeros para iniciar.'),
            ('PLATOS PRINCIPALES', 'Especialidades de la gastronomía peruana.'),
            ('BEBIDAS', 'Bebidas frías y tradicionales.'),
            ('POSTRES', 'Dulces tradicionales para finalizar.'),
        ]

        categories = {}

        for name, description in data:
            category, created = MenuCategory.objects.update_or_create(
                name=name,
                defaults={
                    'description': description,
                    'creator': admin_user,
                    'status': True,
                }
            )

            categories[name] = category

            if created:
                self.stdout.write(f'Categoría creada: {name}')

        return categories

    def create_menu_items(self, admin_user, categories):
        data = [
            ('PAPA A LA HUANCAÍNA', 'Papa sancochada con crema de ají amarillo.', Decimal('18.00'), 'ENTRADAS'),
            ('OCOPA', 'Entrada tradicional con salsa de huacatay.', Decimal('18.00'), 'ENTRADAS'),
            ('LOMO SALTADO', 'Carne salteada con papas fritas y arroz.', Decimal('35.00'), 'PLATOS PRINCIPALES'),
            ('AJÍ DE GALLINA', 'Pollo deshilachado en crema de ají amarillo.', Decimal('32.00'), 'PLATOS PRINCIPALES'),
            ('ARROZ CON MARISCOS', 'Arroz preparado con mariscos y especias.', Decimal('38.00'), 'PLATOS PRINCIPALES'),
            ('CHICHA MORADA', 'Bebida tradicional de maíz morado.', Decimal('8.00'), 'BEBIDAS'),
            ('LIMONADA', 'Limonada natural.', Decimal('7.00'), 'BEBIDAS'),
            ('MAZAMORRA MORADA', 'Postre tradicional de maíz morado.', Decimal('10.00'), 'POSTRES'),
        ]

        for name, description, price, category_name in data:
            item, created = MenuItem.objects.update_or_create(
                name=name,
                category=categories[category_name],
                defaults={
                    'description': description,
                    'price': price,
                    'available': True,
                    'creator': admin_user,
                    'status': True,
                }
            )

            if created:
                self.stdout.write(f'Plato creado: {name}')

    def create_tables(self, admin_user):
        data = [
            (1, 2, 'Salón principal'),
            (2, 4, 'Salón principal'),
            (3, 4, 'Terraza'),
            (4, 6, 'Terraza'),
            (5, 2, 'Ventana'),
        ]

        for number, capacity, location in data:
            table, created = Table.objects.update_or_create(
                number=number,
                defaults={
                    'capacity': capacity,
                    'location': location,
                    'available': True,
                    'creator': admin_user,
                    'status': True,
                }
            )

            if created:
                self.stdout.write(f'Mesa creada: {number}')