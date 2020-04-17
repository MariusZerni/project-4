from rest_framework import serializers
from .models import Role, Skill, Client, MentorProfile, MenteeProfile, MentorRelationship

class RoleSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Role
    fields = ('id', 'name')

class SkillSerializer(serializers.ModelSerializer):
  class Meta:
    model = Skill
    fields = ('id', 'name')


class ClientSerializer(serializers.ModelSerializer):
  class Meta:
    model = Client
    fields = ('id', 'role', 'mentor_skills', 'mentee_skills', 'user')


class MentorRelationshipSerializer(serializers.ModelSerializer):
  class Meta:
    model = MentorRelationship
    fields = ('id', 'from_mentor', 'to_mentee','votes','votesCount')

class MentorRelationshipDetailSerializer(serializers.ModelSerializer):
  class Meta:
    model = MentorRelationship
    fields =  ('to_mentees','votesCount')


class MentorProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = MentorProfile
    fields = ('photo', 'shortDescription', 'fullDescription')


class MenteeProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = MenteeProfile
    fields = ('photo', 'shortDescription', 'fullDescription')


class PopulateClientSerializer(serializers.ModelSerializer):

  role_names = serializers.ReadOnlyField()
  mentor_skills_names = serializers.ReadOnlyField()
  mentee_skills_names = serializers.ReadOnlyField()
  mentees = serializers.ReadOnlyField()

  votes = serializers.ReadOnlyField()
  topVotes = serializers.ReadOnlyField()
  

  
  mentor_profile = MentorProfileSerializer(many=True, read_only=True)
  mentee_profile = MenteeProfileSerializer(many=True, read_only=True)

  # mentor_profile = serializers.RelatedField(read_only=True)
  # mentee_profile = serializers.RelatedField(read_only=True)

  class Meta:
    model = Client
    fields = ('id', 'role_names','mentor_skills_names', 'mentee_skills_names', 'mentor_profile', 'mentee_profile', 'mentees','votes')

    # fields = ('id', 'role_names','mentor_skills_names', 'mentee_skills_names', 'mentor_relationship', 'user')


