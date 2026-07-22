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
            ('SOPAS Y CHUPES', 'Tradición en cada cucharada con recetas ancestrales.'),
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
            # ENTRADAS
            ('PAPA A LA HUANCAÍNA', 'Papa sancochada cubierta con una cremosa y ligeramente picante salsa de ají amarillo y queso fresco.', Decimal('18.00'), 'ENTRADAS'),
            ('OCOPA AREQUIPEÑA', 'Clásica entrada del sur cubierta con salsa de huacatay, maní y galleta, acompañada de huevo duro y aceituna.', Decimal('18.00'), 'ENTRADAS'),
            ('ROCOTO RELLENO', 'Rocoto horneado relleno de un jugoso picadillo de carne, pasas y maní, coronado con queso derretido.', Decimal('25.00'), 'ENTRADAS'),
            ('CEVICHE CLÁSICO', 'Pesca del día marinada en fresco jugo de limón, ají limo, cebolla roja y culantro, acompañado de camote y choclo.', Decimal('35.00'), 'ENTRADAS'),
            ('ANTICUCHOS', 'Trozos de corazón de res marinados en ají panca y vinagre, cocinados a la parrilla con papas doradas.', Decimal('22.00'), 'ENTRADAS'),
            
            # SOPAS Y CHUPES
            ('CHUPE DE CAMARONES', 'Sustanciosa y concentrada sopa de camarones de río con queso fresco, leche, habas y un toque de huacatay.', Decimal('45.00'), 'SOPAS Y CHUPES'),
            ('ADOBO AREQUIPEÑO', 'Trozos de cerdo marinados en chicha de jora, vinagre y especias, cocidos a fuego lento en olla de barro.', Decimal('38.00'), 'SOPAS Y CHUPES'),
            
            # PLATOS PRINCIPALES
            ('LOMO SALTADO', 'Trozos de lomo fino flameados al wok con cebolla, tomate, ají amarillo y salsa de soya, con papas crujientes.', Decimal('35.00'), 'PLATOS PRINCIPALES'),
            ('AJÍ DE GALLINA', 'Suave pollo deshilachado envuelto en una crema de ají amarillo, pan y pecanas, servido con arroz blanco.', Decimal('32.00'), 'PLATOS PRINCIPALES'),
            ('ARROZ CON MARISCOS', 'Arroz graneado y sabroso, preparado con una fina selección de mariscos, arvejas, pimientos y especias locales.', Decimal('38.00'), 'PLATOS PRINCIPALES'),
            ('CUY CHACTADO', 'Cuy entero frito al estilo tradicional bajo una piedra, logrando una piel muy crujiente. Acompañado de papas doradas.', Decimal('48.00'), 'PLATOS PRINCIPALES'),
            ('SECO DE CORDERO', 'Tierno guiso de cordero macerado y cocido en chicha de jora y culantro, servido con arroz y frijoles canarios.', Decimal('40.00'), 'PLATOS PRINCIPALES'),
            
            # BEBIDAS
            ('CHICHA MORADA', 'Refrescante bebida tradicional a base de la cocción de maíz morado, piña, manzana, canela y clavo.', Decimal('8.00'), 'BEBIDAS'),
            ('LIMONADA FROZEN', 'Limonada natural licuada con hielo, ideal para refrescar el paladar.', Decimal('7.00'), 'BEBIDAS'),
            ('PISCO SOUR', 'Nuestro cóctel bandera, preparado con pisco quebranta, jugo de limón recién exprimido, jarabe de goma y clara de huevo.', Decimal('20.00'), 'BEBIDAS'),
            ('INKA KOLA', 'La bebida del sabor nacional.', Decimal('6.00'), 'BEBIDAS'),
            
            # POSTRES
            ('MAZAMORRA MORADA', 'Dulce y espeso postre tradicional limeño a base de maíz morado y frutas secas.', Decimal('10.00'), 'POSTRES'),
            ('QUESO HELADO', 'Postre tradicional arequipeño y artesanal preparado con leche fresca, coco, vainilla y espolvoreado con canela.', Decimal('12.00'), 'POSTRES'),
            ('SUSPIRO A LA LIMEÑA', 'Base de suave manjar blanco y yemas, cubierta por un ligero merengue italiano al oporto.', Decimal('15.00'), 'POSTRES'),
            ('PICARONES', 'Crujientes aros fritos de masa de zapallo y camote, bañados generosamente en miel de chancaca e higo.', Decimal('14.00'), 'POSTRES'),
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
            (6, 8, 'Salón principal - VIP'),
            (8, 2, 'Terraza'),
            (9, 6, 'Salón privado'),
            (10, 4, 'Salón principal'),
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