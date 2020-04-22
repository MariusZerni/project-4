# Generated by Django 3.0.5 on 2020-04-20 16:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('portal', '0002_auto_20200420_1643'),
    ]

    operations = [
        migrations.AddField(
            model_name='commentthread',
            name='fromUser',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='commentthread_from_user', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='comment',
            name='fromUser',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='comment_from_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='comment',
            name='toUser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_to_user', to=settings.AUTH_USER_MODEL),
        ),
    ]