from django.contrib import admin
from .models import Role, Skill, Client, MentorProfile, MenteeProfile, MentorRelationship


admin.site.register(Role)
admin.site.register(Skill)
admin.site.register(Client)
admin.site.register(MentorProfile)
admin.site.register(MenteeProfile)
admin.site.register(MentorRelationship)

# Register your models here.
