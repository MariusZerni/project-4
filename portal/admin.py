from django.contrib import admin
from .models import Role, Skill, MentorProfile, User_Role, User_Skill, UserRelationship


admin.site.register(Role)
admin.site.register(Skill)
# admin.site.register(Client)
admin.site.register(MentorProfile)

# admin.site.register(MentorRelationship)

admin.site.register(User_Role)
admin.site.register(User_Skill)
admin.site.register(UserRelationship)

# Register your models here.
