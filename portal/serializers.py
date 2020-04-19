from rest_framework import serializers
from .models import Role, Skill, MentorProfile, Person

class RoleSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Role
    fields = ('id', 'name')

class SkillSerializer(serializers.ModelSerializer):
  class Meta:
    model = Skill
    fields = ('id', 'name')


# class ClientSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = Client
#     fields = ('id', 'role', 'mentor_skills', 'user')


# class MentorRelationshipSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = MentorRelationship
#     fields = ('id', 'mentor', 'mentee','votes','votesCount')

# class MentorRelationshipDetailSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = MentorRelationship
#     fields =  ('mentees','votesCount')


class MentorProfileSerializer(serializers.ModelSerializer):

  class Meta:
    model = MentorProfile
    fields = '__all__'



class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorProfile
        fields = "__all__"


# class PopulateClientSerializer(serializers.ModelSerializer):

#   role_names = serializers.ReadOnlyField()
#   mentor_skills_names = serializers.ReadOnlyField()
#   votes = serializers.ReadOnlyField()
#   mentor_profile = MentorProfileSerializer(read_only=True)


#   class Meta:
#     model = Client
#     fields = ('id', 'role_names','mentor_skills_names', 'mentor_profile', 'mentees','votes')




class PopulateUserSerializer(serializers.ModelSerializer):

  roles = serializers.ReadOnlyField()
  skills = serializers.ReadOnlyField()
  mentees = serializers.ReadOnlyField()
  
  votes = serializers.ReadOnlyField()
  user_mentor_profile = MentorProfileSerializer(read_only=True)
  
  class Meta:
    model = Person
    fields = ('id', 'roles','skills','mentees','votes','user_mentor_profile')




