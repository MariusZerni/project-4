# Generated by Django 3.0.5 on 2020-04-13 11:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portal', '0002_auto_20200413_1133'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='MenteeProfile',
            new_name='Mentee_Profile',
        ),
        migrations.RenameModel(
            old_name='MentorProfile',
            new_name='Mentor_Profile',
        ),
    ]
