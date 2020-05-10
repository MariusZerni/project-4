from django.contrib import admin
from .models import Role, Person, Skill, MentorProfile, User_Role, User_Skill, UserRelationship, Comment, CommentType, CommentThread


admin.site.register(Role)

# admin.site.register(Person)
admin.site.register(Skill)
# admin.site.register(Client)
admin.site.register(MentorProfile)
admin.site.register(Comment)
admin.site.register(CommentType)
admin.site.register(CommentThread)

# admin.site.register(MentorRelationship)

admin.site.register(User_Role)
admin.site.register(User_Skill)
admin.site.register(UserRelationship)

# Register your models here.
