from rest_framework import serializers
from .models import Role, Skill, MentorProfile, Person, Comment, CommentThread, UserRelationship

class RoleSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Role
    fields = ('id', 'name')


class SkillSerializer(serializers.ModelSerializer):
  class Meta:
    model = Skill
    fields = ('id', 'name')


class UserRelationshipSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserRelationship
    fields = '__all__'


class MentorProfileSerializer(serializers.ModelSerializer):
  photo = serializers.SerializerMethodField()
  class Meta:
    model = MentorProfile
    fields = '__all__'

  def get_photo(self, obj):
        if obj.photo:
            return obj.photo.url


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorProfile
        fields = "__all__"


class PopulateUserSerializer(serializers.ModelSerializer):
  roles = serializers.ReadOnlyField()
  skills = serializers.ReadOnlyField()
  mentees = serializers.ReadOnlyField()
  mentors = serializers.ReadOnlyField() 
  votes = serializers.ReadOnlyField()
  user_profile = MentorProfileSerializer(read_only=True)
  
  class Meta:
    model = Person
    fields = ('id', 'first_name', 'roles','skills','mentees','mentors','votes','user_profile')




class CommentsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = "__all__"


class CommentThreadSerializer(serializers.ModelSerializer):

  class Meta:
    model = CommentThread
    fields = "__all__"


class CommentThreadDetailSerializer(serializers.ModelSerializer):
  comments = serializers.SerializerMethodField()
  
  class Meta:
    model = CommentThread
    fields = ('id', 'commentType','initialComment','fromUser','startDate','subject','comments')

  def get_comments(self, instance):
        comments = instance.comments.all().order_by('-date')
        return CommentsSerializer(comments, many=True).data

