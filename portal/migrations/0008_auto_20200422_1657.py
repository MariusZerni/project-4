# Generated by Django 3.0.5 on 2020-04-22 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portal', '0007_auto_20200421_1831'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mentorprofile',
            name='photo',
            field=models.ImageField(upload_to='profile_photo'),
        ),
    ]