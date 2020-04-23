# Generated by Django 3.0.5 on 2020-04-22 23:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('portal', '0009_auto_20200422_1706'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mentorprofile',
            name='fullDescription',
        ),
        migrations.AlterField(
            model_name='comment',
            name='commentThread',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='portal.CommentThread'),
        ),
    ]