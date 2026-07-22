from rest_framework.routers import DefaultRouter
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from apps.management.views import (
    MenuCategoryViewSet,
    MenuItemViewSet,
    CustomerViewSet,
    TableViewSet,
    ReservationViewSet,
    RegisterView,
    CustomTokenObtainPairView,
)

router = DefaultRouter()

router.register(r'menu-categories', MenuCategoryViewSet, basename='menu-category')
router.register(r'menu-items', MenuItemViewSet, basename='menu-item')
router.register(r'customers', CustomerViewSet, basename='customer')
router.register(r'tables', TableViewSet, basename='table')
router.register(r'reservations', ReservationViewSet, basename='reservation')

urlpatterns = router.urls + [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]