# Generated by Django 2.2.12 on 2020-04-24 12:20

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('auth', '0015_auto_20200418_1102'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommentType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_type', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='MentorProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(upload_to='profile_photo')),
                ('shortDescription', models.CharField(max_length=150)),
                ('fullDescription', models.TextField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_profile', to='portal.Person')),
            ],
        ),
        migrations.CreateModel(
            name='CommentThread',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('initialComment', models.CharField(max_length=300)),
                ('startDate', models.DateTimeField(default=django.utils.timezone.now)),
                ('subject', models.CharField(blank=True, max_length=150)),
                ('commentType', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_commentType', to='portal.CommentType')),
                ('fromUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commentthread_from_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(max_length=3000)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('commentThread', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='portal.CommentThread')),
                ('fromUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_from_user', to=settings.AUTH_USER_MODEL)),
                ('toUser', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comment_to_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserRelationship',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('votes', models.IntegerField(blank=True, default=0, null=True)),
                ('mentee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mentee', to=settings.AUTH_USER_MODEL)),
                ('mentor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mentor', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('mentor', 'mentee')},
            },
        ),
        migrations.CreateModel(
            name='User_Skill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skill', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_skills_skill', to='portal.Skill')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_skills_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'skill')},
            },
        ),
        migrations.CreateModel(
            name='User_Role',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_role_role', to='portal.Role')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_role_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'role')},
            },
        ),
    ]
