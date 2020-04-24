from django.db import models
from django.contrib.auth.models import User
from django.db.models import F, Sum,Max, Count
import django
from django.contrib.auth import get_user_model
from django.utils import timezone

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
  def mentors(self):
    return UserRelationship.objects.filter(mentee=self.id).values_list('mentor', flat=True)

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


class CommentType(models.Model):

  comment_type = models.CharField(max_length=30)

  def __str__(self):
    return self.comment_type


class CommentThread(models.Model):
  commentType = models.ForeignKey(CommentType, related_name='comment_commentType', on_delete=models.CASCADE) 
  initialComment=models.CharField(max_length=300)
  fromUser = models.ForeignKey(User, related_name='commentthread_from_user', on_delete=models.CASCADE)
  startDate = models.DateTimeField(default=timezone.now)
  subject = models.CharField(max_length=150, blank=True)

  def __str__(self):
    return self.subject



class Comment(models.Model):
  fromUser = models.ForeignKey(User, related_name='comment_from_user', on_delete=models.CASCADE)
  toUser = models.ForeignKey(User, related_name='comment_to_user', on_delete=models.CASCADE, blank=True, null=True)
  commentThread = models.ForeignKey(CommentThread, related_name='comments', on_delete=models.CASCADE) 
  comment = models.CharField(max_length=3000)
  
  date = models.DateTimeField(default=timezone.now)

  def __str__(self):
    return 'from: ' + self.fromUser.username + ' to ' + self.toUser.username +": "+ self.commentThread.subject

class MentorProfile(models.Model):
  photo = models.ImageField(upload_to='profile_photo', blank=False, null=False)
  shortDescription = models.CharField(max_length=150)
  fullDescription = models.TextField()
  # client = models.OneToOneField(Client, related_name='mentor_profile', on_delete=models.CASCADE)
  user = models.OneToOneField(Person, related_name='user_profile', on_delete=models.CASCADE)

  def __str__(self):
    return self.user.username





