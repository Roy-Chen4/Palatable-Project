# Generated by Django 4.0.5 on 2022-07-16 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('palatable', '0003_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(default='none', max_length=100),
        ),
    ]
