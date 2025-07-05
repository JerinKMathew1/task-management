from rest_framework.permissions import BasePermission

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if hasattr(request.user, 'userprofile'):
            return request.user.userprofile.role == 'admin'
        return request.method in ['GET', 'HEAD']
