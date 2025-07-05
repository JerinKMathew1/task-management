from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, RegisterView, CustomLoginView

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', CustomLoginView.as_view()),
    path('', include(router.urls)),
]
