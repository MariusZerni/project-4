from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView

from rest_framework import permissions
from rest_framework.permissions import BasePermission

from .models import Client
from .serializers import ClientSerializer, PopulateClientSerializer
from .models import Skill
from .serializers import SkillSerializer
from .models import MentorProfile
from .serializers import MentorProfileSerializer
from .models import MenteeProfile
from .serializers import MenteeProfileSerializer
from .models import Role
from .serializers import RoleSerializer
from .models import MentorRelationship
from .serializers import MentorRelationshipSerializer


class IsOwnerOrReadOnly(BasePermission):
  def has_object_permission(self, request, view, obj):
    if request.method in permissions.SAFE_METHODS:
      return True

    return request.user == obj.user


# Create your views here.
# List Views
class ClientsListView(ListCreateAPIView):
  queryset = Client.objects.all()
  serializer_class = ClientSerializer

  def get(self, request):
    print("clients")
    clients = Client.objects.all()
    serializer = PopulateClientSerializer(clients, many=True)
    return Response(serializer.data)
  

class SkillsListView(ListCreateAPIView):
  queryset = Skill.objects.all()
  serializer_class = SkillSerializer


class MentorProfilesListView(ListCreateAPIView):
  queryset = MentorProfile.objects.all()
  serializer_class = MentorProfileSerializer


class MenteeProfilesListView(ListCreateAPIView):
  queryset = MenteeProfile.objects.all()
  serializer_class = MenteeProfileSerializer


class RolesListView(ListCreateAPIView):
  queryset = Role.objects.all()
  serializer_class = RoleSerializer


class MentorsRelationshipListView(ListCreateAPIView):
  queryset = MentorRelationship.objects.all()
  serializer_class = MentorRelationshipSerializer


# Detailed View
class ClientDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Client.objects.all()
  serializer_class = ClientSerializer
  permission_classes = (IsOwnerOrReadOnly, )

  def get(self, request, pk):
    client = Client.objects.get(pk=pk)
    self.check_object_permissions(request, client)
    serializer = PopulateClientSerializer(client)

    return Response(serializer.data)


class SkillDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Skill.objects.all()
  serializer_class = SkillSerializer


class MentorProfileDetailView(RetrieveUpdateDestroyAPIView):
  queryset = MentorProfile.objects.all()
  serializer_class = MentorProfileSerializer

  def get(self, request, pk):
    queryset = MentorProfile.objects.filter(client=pk)
    
    serializer = MentorProfileSerializer(queryset, many=True)

    return Response(serializer.data)


class MenteeProfileDetailView(RetrieveUpdateDestroyAPIView):
  queryset = MenteeProfile.objects.all()
  serializer_class = MenteeProfileSerializer


class RoleDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Role.objects.all()
  serializer_class = RoleSerializer


class MentorRelationshipDetailView(RetrieveUpdateDestroyAPIView):
  queryset = MentorRelationship.objects.all()
  serializer_class = MentorRelationshipSerializer