from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.parsers import FileUploadParser
from rest_framework import permissions
from rest_framework.permissions import BasePermission

from django.db.models import F
from rest_framework import status



import json

from django.http import HttpResponse
from django.db.models import Avg

from .models import Skill
from .serializers import SkillSerializer
from .models import MentorProfile
from .serializers import MentorProfileSerializer
from .models import Role, Person, Comment
from .serializers import RoleSerializer
from .models import UserRelationship, CommentThread
from .serializers import PopulateUserSerializer, UserRelationshipSerializer
from .serializers import CommentsSerializer,CommentThreadSerializer, FileSerializer, CommentThreadDetailSerializer




class IsOwnerOrReadOnly(BasePermission):
  def has_object_permission(self, request, view, obj):
    if request.method in permissions.SAFE_METHODS:
      return True

    return request.user == obj.user



class UsersListView(ListCreateAPIView):
  queryset = Person.objects.all()
  serializer_class = PopulateUserSerializer

  def get(self, request):
    print("users")
    users = Person.objects.all()
    serializer = PopulateUserSerializer(users, many=True)
    return Response(serializer.data)

class CommentsListView(ListCreateAPIView):
  queryset = Comment.objects.all().order_by('-startDate')
  serializer_class = CommentsSerializer

  def get(self, request):

    
    serializer = CommentsSerializer(queryset, many=True)

    return Response(serializer.data)
    
  

class CommentDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentsSerializer

  def get(self, request, pk):
    queryset = Comment.objects.filter(pk=pk)
    
    serializer = CommentsSerializer(queryset, many=True)

    return Response(serializer.data)

class CommentThreadView(ListCreateAPIView):
  queryset = CommentThread.objects.all().order_by('-startDate')
  serializer_class = CommentThreadSerializer


class CommentThreadDetailView(RetrieveUpdateDestroyAPIView):
  queryset = CommentThread.objects.all()
  serializer_class = CommentThreadDetailSerializer


  def get(self, request, pk):
    thread = CommentThread.objects.get(pk=pk)

    serializer = CommentThreadDetailSerializer(thread)

    return Response(serializer.data)
    
    

class SkillsListView(ListCreateAPIView):
  queryset = Skill.objects.all()
  serializer_class = SkillSerializer


class MentorProfilesListView(ListCreateAPIView):
  queryset = MentorProfile.objects.all()
  serializer_class = MentorProfileSerializer


  def post(self, request, *args, **kwargs):

    file_serializer = FileSerializer(data=request.data)

    if file_serializer.is_valid():
        file_serializer.save()
        return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MentorProfileDetailView(RetrieveUpdateDestroyAPIView):
  queryset = MentorProfile.objects.all()
  serializer_class = MentorProfileSerializer

  def get(self, request, pk):
    queryset = MentorProfile.objects.filter(user=pk)
    
    serializer = MentorProfileSerializer(queryset, many=True)

    return Response(serializer.data)
  
  # def put(self, request, *args, **kwargs):
  #   file_serializer = FileSerializer(data=request.data)

  #   if file_serializer.is_valid():
  #       file_serializer.save()
  #       return Response(file_serializer.data, status=status.HTTP_201_CREATED)
  #   else:
  #       return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  #   print("puttttt")
  #   return self.update(request, *args, **kwargs)


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



class SkillDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Skill.objects.all()
  serializer_class = SkillSerializer




class RoleDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Role.objects.all()
  serializer_class = RoleSerializer



class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):

      file_serializer = FileSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.save()
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)