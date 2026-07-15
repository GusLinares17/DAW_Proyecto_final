from rest_framework.routers import DefaultRouter
from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.management.views import (
    MenuCategoryViewSet,
    MenuItemViewSet,
    CustomerViewSet,
    TableViewSet,
    ReservationViewSet,
    RegisterView,
)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        data['username'] = self.user.username
        
        try:
            profile = self.user.customer_profile
            data['names'] = profile.names
            data['first_name'] = profile.names.split()[0] if profile.names else self.user.username
            data['father_surname'] = profile.father_surname
            data['mother_surname'] = profile.mother_surname
            data['email'] = profile.email
            data['dni'] = profile.dni
            data['phone'] = profile.phone
        except Exception:
            data['first_name'] = self.user.username
            data['names'] = ''
            data['father_surname'] = ''
            data['mother_surname'] = ''
            data['email'] = self.user.email or ''
            data['dni'] = ''
            data['phone'] = ''
            
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

router = DefaultRouter()

router.register(r'menu-categories', MenuCategoryViewSet, basename='menu-category')
router.register(r'menu-items', MenuItemViewSet, basename='menu-item')
router.register(r'customers', CustomerViewSet, basename='customer')
router.register(r'tables', TableViewSet, basename='table')
router.register(r'reservations', ReservationViewSet, basename='reservation')

urlpatterns = router.urls + [
    path('register/', RegisterView.as_view(), name='register'),

    path('token/', CustomTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('token/refresh/', TokenRefreshView.as_view(),
         name='token_refresh'),
]