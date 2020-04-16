# Generated by Django 3.0.5 on 2020-04-14 10:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('portal', '0011_auto_20200413_2154'),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mentee_skills', models.ManyToManyField(blank=True, related_name='mentee_skills', to='portal.Skill')),
            ],
        ),
        migrations.RemoveField(
            model_name='user',
            name='mentee_skills',
        ),
        migrations.RemoveField(
            model_name='user',
            name='mentorRelationship',
        ),
        migrations.RemoveField(
            model_name='user',
            name='mentor_skills',
        ),
        migrations.RemoveField(
            model_name='user',
            name='role',
        ),
        migrations.AlterField(
            model_name='menteeprofile',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mentee_profile', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='mentorprofile',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mentor_profile', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='mentorrelationship',
            name='from_mentor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_mentor', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='mentorrelationship',
            name='to_mentee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='to_mentee', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='MentorMentee',
        ),
        migrations.DeleteModel(
            name='User',
        ),
        migrations.AddField(
            model_name='client',
            name='mentor_relationship',
            field=models.ManyToManyField(through='portal.MentorRelationship', to='portal.Client'),
        ),
        migrations.AddField(
            model_name='client',
            name='mentor_skills',
            field=models.ManyToManyField(blank=True, related_name='mentor_skills', to='portal.Skill'),
        ),
        migrations.AddField(
            model_name='client',
            name='role',
            field=models.ManyToManyField(blank=True, related_name='users', to='portal.Role'),
        ),
        migrations.AddField(
            model_name='client',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='clients', to=settings.AUTH_USER_MODEL),
        ),
    ]
