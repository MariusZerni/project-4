from django.urls import path
from .views import SkillsListView, SkillDetailView, MentorProfilesListView, MentorProfileDetailView, RolesListView, RoleDetailView, TopVotesListView, UsersListView, UserDetailView, CommentDetailView, CommentsListView



urlpatterns = [

  path('', UsersListView.as_view()),
  path('users', UsersListView.as_view()),
  path('comment', CommentsListView.as_view()),
  path('users/<int:pk>/', UserDetailView.as_view()),
  path('comment/<int:pk>/', CommentDetailView.as_view()),


  # path('', ClientsListView.as_view()),
  # path('clients', ClientsListView.as_view()),
  
  path('skills', SkillsListView.as_view()),
  path('mentorprofiles', MentorProfilesListView.as_view()),
  # path('menteeprofiles', MenteeProfilesListView.as_view()),
  path('roles', RolesListView.as_view()),
  # path('mentorrelationship', MentorsRelationshipListView.as_view()),
  path('topvotes', TopVotesListView),


  # path('clients/<int:pk>/', ClientDetailView.as_view()),
  path('skills/<int:pk>/', SkillDetailView.as_view()),
  path('mentorprofiles/<int:pk>/', MentorProfileDetailView.as_view()),
  # path('menteeprofiles/<int:pk>/', MenteeProfileDetailView.as_view()),
  path('roles/<int:pk>/', RoleDetailView.as_view()),
  # path('mentorrelationship/<int:pk>/', MentorRelationshipDetailView.as_view()),
  
  # path('uploadimage/', FileUploadView.as_view())

  

]