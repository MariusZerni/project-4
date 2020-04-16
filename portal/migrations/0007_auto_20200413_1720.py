# Generated by Django 3.0.5 on 2020-04-13 17:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('portal', '0006_auto_20200413_1703'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='mentor_mentee',
        ),
        migrations.CreateModel(
            name='MentorMentee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mentee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_mentee', to='portal.User')),
                ('mentor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_mentor', to='portal.User')),
            ],
        ),
    ]