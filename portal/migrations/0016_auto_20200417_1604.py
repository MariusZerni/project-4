# Generated by Django 3.0.5 on 2020-04-17 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portal', '0015_auto_20200417_1527'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mentorprofile',
            name='totalUsersVotes',
        ),
        migrations.RemoveField(
            model_name='mentorprofile',
            name='totalVotes',
        ),
        migrations.AddField(
            model_name='mentorrelationship',
            name='votes',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]