from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.parsers import FileUploadParser
from rest_framework import permissions
from rest_framework.permissions import BasePermission

from django.db.models import F



import json

from django.http import HttpResponse
from django.db.models import Avg
# from .models import Client
# from .serializers import ClientSerializer, PopulateClientSerializer
from .models import Skill
from .serializers import SkillSerializer
from .models import MentorProfile
from .serializers import MentorProfileSerializer
from .models import Role, Person, Comment
from .serializers import RoleSerializer
from .models import UserRelationship, CommentThread
from .serializers import PopulateUserSerializer, UserRelationshipSerializer
from .serializers import CommentsSerializer,CommentThreadSerializer




class IsOwnerOrReadOnly(BasePermission):
  def has_object_permission(self, request, view, obj):
    if request.method in permissions.SAFE_METHODS:
      return True

    return request.user == obj.user


# Create your views here.
# List Views
# class ClientsListView(ListCreateAPIView):
#   queryset = Client.objects.all()
#   serializer_class = PopulateUserSerializer

#   def get(self, request):
#     print("clients")
#     clients = Client.objects.all()
#     serializer = PopulateClientSerializer(clients, many=True)
#     return Response(serializer.data)

class UsersListView(ListCreateAPIView):
  queryset = Person.objects.all()
  serializer_class = PopulateUserSerializer

  def get(self, request):
    print("users")
    users = Person.objects.all()
    serializer = PopulateUserSerializer(users, many=True)
    return Response(serializer.data)

class CommentsListView(ListCreateAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentsSerializer

  def get(self, request):
    fromUser = request.GET.get('fromUser','')

    if (fromUser):
      queryset = Comment.objects.filter(fromUser=fromUser)
    else:
      queryset = Comment.objects.all()
    
    serializer = CommentsSerializer(queryset, many=True)

    return Response(serializer.data)
    
  

class CommentDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentsSerializer

  def get(self, request, pk):
    queryset = Comment.objects.filter(pk=pk)
    
    serializer = CommentsSerializer(queryset, many=True)

    return Response(serializer.data)
  
    

class SkillsListView(ListCreateAPIView):
  queryset = Skill.objects.all()
  serializer_class = SkillSerializer


class MentorProfilesListView(ListCreateAPIView):
  queryset = MentorProfile.objects.all()
  serializer_class = MentorProfileSerializer


class RolesListView(ListCreateAPIView):
  queryset = Role.objects.all()
  serializer_class = RoleSerializer


class UserRelationshipListView(ListCreateAPIView):
  queryset = UserRelationship.objects.all()
  serializer_class = UserRelationshipSerializer


def TopVotesListView(request):

    rels=(UserRelationship.objects.values('mentor').annotate(topVotes=Avg("votes")).order_by("-topVotes")[:5]).annotate(name=F('mentor__first_name'), photo=F('mentor__user_profile__photo'), shortDescription=F('mentor__user_profile__shortDescription')).values('mentor','name','photo','shortDescription','topVotes')
 
    data=json.dumps(list(rels))
  
    return HttpResponse(data, content_type='application/json')

# {'id': 'mentor','first_name':'mentor__first_name','photo':'mentor__user_profile__photo','shortDescription':'mentor__user_profile__shortDescription'  }

# Detailed View
# class ClientDetailView(RetrieveUpdateDestroyAPIView):
#   queryset = Client.objects.all()
#   serializer_class = PopulateClientSerializer
#   permission_classes = (IsOwnerOrReadOnly, )

#   def get(self, request, pk):
#     client = Client.objects.get(pk=pk)
#     # todo check client not null
#     self.check_object_permissions(request, client)
#     serializer = PopulateClientSerializer(client)

#     return Response(serializer.data)

class UserDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Person.objects.all()
  serializer_class = PopulateUserSerializer
  # permission_classes = (IsOwnerOrReadOnly, )

  def get(self, request, pk):
    person = Person.objects.get(pk=pk)
    # todo check client not null
    self.check_object_permissions(request, person)
    serializer = PopulateUserSerializer(person)

    return Response(serializer.data)


class CommentThreadView(ListCreateAPIView):
  queryset = CommentThread.objects.all()
  serializer_class = CommentThreadSerializer
  # permission_classes = (IsOwnerOrReadOnly, )

class CommentThreadDetailView(RetrieveUpdateDestroyAPIView):
  queryset = CommentThread.objects.all()
  serializer_class = CommentThreadSerializer
  # permission_classes = (IsOwnerOrReadOnly, )

  def get(self, request, pk):
    print('ola')
    thread = CommentThread.objects.get(pk=pk)
    # todo check client not null
    # self.check_object_permissions(request, thread)
    serializer = CommentThreadSerializer(thread)

    return Response(serializer.data)


class SkillDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Skill.objects.all()
  serializer_class = SkillSerializer


class MentorProfileDetailView(RetrieveUpdateDestroyAPIView):
  queryset = MentorProfile.objects.all()
  serializer_class = MentorProfileSerializer

  def get(self, request, pk):
    queryset = MentorProfile.objects.filter(user=pk)
    
    serializer = MentorProfileSerializer(queryset, many=True)

    return Response(serializer.data)



class RoleDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Role.objects.all()
  serializer_class = RoleSerializer


# class MentorRelationshipDetailView(RetrieveUpdateDestroyAPIView):
#   queryset = MentorRelationship.objects.all()
#   serializer_class = MentorRelationshipSerializer

#   def get(self, request, pk):
#     queryset = MentorRelationship.objects.filter(mentor=pk)
    
#     serializer = MentorRelationshipDetailSerializer(queryset, many=True)

#     return Response(serializer.data)


# class FileUploadView(APIView):
#     parser_class = (FileUploadParser,)

#     def post(self, request, *args, **kwargs):

#       file_serializer = FileSerializer(data=request.data)

#       if file_serializer.is_valid():
#           file_serializer.save()
#           return Response(file_serializer.data, status=status.HTTP_201_CREATED)
#       else:
#           return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)