# Generated by Django 4.0.4 on 2022-04-24 21:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Todos',
            new_name='Todo',
        ),
    ]
