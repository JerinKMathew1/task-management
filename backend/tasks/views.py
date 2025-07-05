from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User

from .models import Task
from .serializers import TaskSerializer, RegisterSerializer
from .permissions import IsAdminOrReadOnly

#  For real-time task updates
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


#  Task ViewSet with role-based access, filtering, and real-time updates
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['priority', 'due_date', 'assigned_to']

    def perform_create(self, serializer):
        task = serializer.save()
        self.notify_clients(task)

    def perform_update(self, serializer):
        task = serializer.save()
        self.notify_clients(task)

    def notify_clients(self, task):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "tasks",  
            {
                "type": "send_task_update",
                "data": {
                    "id": task.id,
                    "title": task.title,
                    "completed": task.completed,
                    "priority": task.priority,
                    "assigned_to": task.assigned_to.username,
                    "due_date": task.due_date.isoformat(),
                }
            }
        )


#  User Registration View
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "message": "User registered successfully.",
                "token": token.key,
                "username": user.username,
                "email": user.email,
                "role": user.userprofile.role if hasattr(user, 'userprofile') else 'unknown'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#  Custom Login View (returns role info)
class CustomLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = token.user
        return Response({
            'token': token.key,
            'username': user.username,
            'email': user.email,
            'role': user.userprofile.role if hasattr(user, 'userprofile') else 'unknown'
        })
