from django.db import models
from django.contrib.auth.models import User
from django.db.models import F, Sum,Max, Count
import django
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Person(User):
  

  class Meta:
    proxy = True
    
  @property
  def roles(self):
    return User_Role.objects.filter(user=self.id).values_list('role__name', flat=True)



  @property
  def skills(self):
    return User_Skill.objects.filter(user=self.id).values_list('skill__name', flat=True)


  @property
  def mentees(self):
    return UserRelationship.objects.filter(mentor=self.id).values_list('mentee', flat=True)


  @property
  def votes(self):
    return UserRelationship.objects.filter(mentor=self.id).aggregate(sumVotes=Sum('votes')).get('sumVotes')


  @property
  def topVotes(self):
    return UserRelationship.objects.values('mentor').annotate(topVotes=Sum("votes")).order_by("-topVotes")[:5] 
    

class Role(models.Model):
  name = models.CharField(max_length=30)

  def __str__(self):
    return self.name


class Skill(models.Model):
  name = models.CharField(max_length=50)

  def __str__(self):
    return self.name


class User_Role(models.Model):
  user = models.ForeignKey(User, related_name='user_role_user', on_delete=models.CASCADE)
  role = models.ForeignKey(Role, related_name='user_role_role', on_delete=models.CASCADE)

  class Meta:
    unique_together = (('user', 'role',))

class User_Skill(models.Model):
  user = models.ForeignKey(User, related_name='user_skills_user', on_delete=models.CASCADE)
  skill = models.ForeignKey(Skill, related_name='user_skills_skill', on_delete=models.CASCADE)

  class Meta:
    unique_together = (('user', 'skill',))

class UserRelationship(models.Model):
    mentor = models.ForeignKey(User, related_name='mentor', on_delete=models.CASCADE)
    mentee = models.ForeignKey(User, related_name='mentee', on_delete=models.CASCADE)

    votes = models.IntegerField(blank=True, null=True, default=0)
  
    @property
    def votesCount(self):
      return UserRelationship.objects.filter(mentor=self.mentor).aggregate(sumVotes=Sum('votes')).get("sumVotes")

    
    class Meta:
      unique_together = (('mentor', 'mentee',))

# class Client(models.Model):
#   user = models.ForeignKey(User, related_name='clients', on_delete=models.CASCADE)

#   role = models.ManyToManyField(Role, related_name='users', blank=True)
#   mentor_skills = models.ManyToManyField(Skill, related_name='mentor_skills', blank=True)
#   # mentee_skills = models.ManyToManyField(Skill, related_name='mentee_skills',blank=True)

#   mentor_relationship = models.ManyToManyField('self', through='MentorRelationship', symmetrical=False)
#   # mentor_profile = models.OneToOneField(MentorProfile, related_name='mentor_profile', on_delete=models.CASCADE)

#   def __str__(self):
#     return self.user.username
  
#   @property
#   def role_names(self):
#     return self.role.values_list('name', flat=True)

#   @property
#   def mentor_skills_names(self):
#     return self.mentor_skills.values_list('name', flat=True)

#   @property
#   def mentee_skills_names(self):
#     return self.mentee_skills.values_list('name', flat=True)

#   @property
#   def mentees(self):
#     # return self.mentor_relationship.values_list('from_mentor', flat=True)
#     return MentorRelationship.objects.filter(mentor=self.id).values_list('mentee', flat=True)


#   @property
#   def votes(self):
#     c = MentorRelationship.objects.filter(mentor=self.id).aggregate(sumVotes=Sum('votes'))
#     return c.get('sumVotes')


#   @property
#   def topVotes(self):
#     relationships= MentorRelationship.objects.values('mentor').annotate(topVotes=Sum("votes")).order_by("-topVotes")[:5] 
#     return relationships

class MentorProfile(models.Model):
  photo = models.ImageField(upload_to='profile_photo', blank=True)
  shortDescription = models.CharField(max_length=150)
  fullDescription = models.CharField(max_length=3000)
  # client = models.OneToOneField(Client, related_name='mentor_profile', on_delete=models.CASCADE)
  user = models.OneToOneField(Person, related_name='user_mentor_profile', on_delete=models.CASCADE)



# class MentorRelationship(models.Model):
 
#   mentor = models.ForeignKey(Client, related_name='mentor', on_delete=models.CASCADE)
#   mentee = models.ForeignKey(Client, related_name='mentee', on_delete=models.CASCADE)

#   votes = models.IntegerField(blank=True, null=True)
  
#   @property
#   def votesCount(self):
#     c = MentorRelationship.objects.filter(mentor=self.mentor).aggregate(sumVotes=Sum('votes'))
#     return c.get("sumVotes")
  
 
    
#   class Meta:
#     unique_together = ('mentor', 'mentee')





